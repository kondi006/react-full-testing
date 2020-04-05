import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers/RootReducer';

const testInitialStoreData = {
  //if you have some common settings
};

export const getTestStore = (store: any) => {
  const mockStore = configureStore([thunk]);
  //way to make your dispatched actions are executed by reducers
  const createState = (initialState: any) => (actions: any) =>
    actions.reduce(rootReducer, initialState);

  return mockStore(createState({
    ...store,
    ...testInitialStoreData
  }));
};
