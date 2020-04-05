import { Dispatch } from "react";
import { AppActions } from "../../../redux/actions/AppActions.type";
import { getBikeDataRequest } from "../service/ExampleFormService";

export const ExampleFormActions = {
  fetchOptions: 'EXAMPLE/FETCH_OPTIONS',
  saveData: 'EXAMPLE/SAVE_DATA'
}

export interface BikeOptionsType {
  brands: string[];
  types: string[];
  colors: string[];
}

export type FetchExampleOptionsType = {
  type: typeof ExampleFormActions.fetchOptions;
  data: BikeOptionsType;
}

export const fetchExampleOptions = (selectedBike: BikeDataType) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const fetchedOptions: BikeOptionsType = await getBikeDataRequest(selectedBike);
    dispatch(fetchExampleOptionsAction(fetchedOptions));
  };
}

export const fetchExampleOptionsAction =
  (fetchedOptions: BikeOptionsType): FetchExampleOptionsType => {
    return {
      type: ExampleFormActions.fetchOptions,
      data: fetchedOptions
    };
  }

export type SaveExampleDataType = {
  type: typeof ExampleFormActions.saveData;
  data: BikeDataType;
}

export interface BikeDataType {
  brand: string;
  type: string;
  color: string;
}

export const saveExampleData = (exampleData: BikeDataType) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(saveExampleDataAction(exampleData));
  };
};

export const saveExampleDataAction = (exampleData: BikeDataType) => {
  return {
    type: ExampleFormActions.saveData,
      data: exampleData
  };
};

export type ExampleActionsType = SaveExampleDataType | FetchExampleOptionsType;