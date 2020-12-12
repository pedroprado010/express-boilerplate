import { Schema, model, Model, Document } from 'mongoose';
import { hash, genSalt, compare } from 'bcrypt';

export interface AccountData {
  grants: string[];
  displayName: string;
  email: string;
  password: string;
  photo?: string;
}

export interface AccountDoc extends AccountData, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getBearerPayload: () => Omit<AccountData, 'password'>;
}

export interface AccountModel extends Model<AccountDoc> {}

export interface TokenPayload {
  grants: string[];
  uid: string;
  claims: {
    displayName: string;
    email: string;
    photo?: string;
  };
}

const accountSchema = new Schema<AccountData>({
  grants: [{
    type: String,
    trim: true,
  }],
  displayName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    index: { unique: true },
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  photo: {
    type: String,
    trim: true,
  },
});

accountSchema.pre<AccountDoc>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

accountSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return compare(password, this.password);
};
accountSchema.methods.getBearerPayload = function (): TokenPayload {
  const payload = this.toObject();
  return {
    grants: payload.grants,
    uid: payload._id,
    claims: {
      displayName: payload.displayName,
      email: payload.email,
      photo: payload.photo,
    },
  };
};

const AccountModel = model<AccountDoc, AccountModel>('Account', accountSchema);
export default AccountModel;
