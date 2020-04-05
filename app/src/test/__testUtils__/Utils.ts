import { MockStore } from 'redux-mock-store';
import deepEqual from 'deep-equal';

export const isActionFired =
  (store: MockStore<any>, action: any): boolean => {
    return store.getActions().some((storeAction: any) =>
      deepEqual(storeAction, action)
    );
  };

export const waitForPromises = async () => {
  return new Promise(setImmediate);
};
