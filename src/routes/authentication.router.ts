import { Router } from 'express';
import HttpError from '../errors/http-error';
import AccountModel, { AccountData } from '../models/account.model';
import SecurityService from '../services/security.service';

const authenticationRouter = Router();

interface BearerResponseBody {
  bearer: string;
}

type CreateAccountRequestBody = Partial<AccountData>;

authenticationRouter.post<unknown, BearerResponseBody, unknown, unknown>('/login', async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new HttpError('unauthorized', 'invalid credentials');
    }
    const credentials = Buffer
      .from(req.headers.authorization.replace(/^(b|B)asic\s/, ''), 'base64')
      .toString('ascii');
    const [email, password] = credentials.split(':');
    const account = await AccountModel.findOne({ email }).select('+password');
    if (!account) {
      throw new HttpError('unauthorized', 'invalid credentials');
    }
    if (!account.comparePassword(password)) {
      throw new HttpError('unauthorized', 'invalid credentials');
    }

    res.status(200)
      .json({
        bearer: await SecurityService.createJWT(account.getBearerPayload()),
      });
    return;
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post<unknown, BearerResponseBody, CreateAccountRequestBody, unknown>('/signup', async (req, res, next) => {
  try {
    const { email, password, displayName, photo, grants = [] } = req.body;
    if (!email || !password || !displayName) {
      throw new HttpError('bad-request', 'missing credentials');
    }
    const account = await AccountModel.create({
      displayName,
      email,
      password,
      photo,
      grants,
    });
    res.status(201)
      .json({
        bearer: await SecurityService.createJWT(account.getBearerPayload()),
      });
  } catch (error) {
    next(error);
  }
});

export default authenticationRouter;
