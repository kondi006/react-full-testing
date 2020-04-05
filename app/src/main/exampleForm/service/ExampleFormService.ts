import axios, { AxiosResponse } from "axios"
import { BikeOptionsType, BikeDataType } from "../redux/Actions";

export const getBikeDataRequest = async (selectedBike: BikeDataType): Promise<BikeOptionsType> => {
    const response: AxiosResponse<BikeOptionsType> = 
        await axios.get<BikeOptionsType>('http://nonexistingpage.com/getOptions', {params: selectedBike});
    return response.data;
};
