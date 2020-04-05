import { combineReducers } from 'redux';
import { exampleReducer } from '../../main/exampleForm/redux/Reducer';

const rootReducer = combineReducers({
  example: exampleReducer
});

export default rootReducer;
