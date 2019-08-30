import { combineReducers } from 'redux';
import CryptReducer from './CryptReducer';
import HitBTCReducer from './HitBTCReducer';
import OKExReducer from './OKExReducer';
import CoinbeneReducer from './CoinbeneReducer';
import BitMaxReducer from './BitMaxReducer';
export default combineReducers({
  crypt: CryptReducer
});
