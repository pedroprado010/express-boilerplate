import R from 'ramda';

import configMiddlewares from './middlewares';
import configRouter  from './router';
import configServer  from './server';

export default R.compose(configServer, configRouter, configMiddlewares);
