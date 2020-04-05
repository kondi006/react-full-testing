import { ExampleFormActions } from "./Actions";

const initialState = {
  bikeOptions: {},
  selectedBike: {
    brand: '',
    type: '',
    color: ''
  }
}

export const exampleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ExampleFormActions.saveData:
      return { ...state, selectedBike: action.data };
    case ExampleFormActions.fetchOptions:
      return { ...state, bikeOption: action.data };
    default:
      return state;
  }
}
