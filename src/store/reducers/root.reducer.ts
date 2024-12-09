import { combineReducers } from 'redux';
import userReducer from 'store/reducers/user.reducer';

export default combineReducers({
  user: userReducer
});
