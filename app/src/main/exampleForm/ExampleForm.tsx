import React, { useState, FC, useEffect } from "react"
import { CommonSingleSelect } from "../../components/CommonSingleSelect";
import { CommonRadioGroup } from "../../components/CommonRadioGroup";
import { connect } from "react-redux";
import { BikeDataType, BikeOptionsType, saveExampleData, fetchExampleOptions } from "./redux/Actions";
import { CommonButton } from "../../components/CommonButton";

type Props = DispatchProps & StateProps;

const ExampleForm: FC<Props> = (props: Props) => {
  const [state, setState] = useState(props.selectedBike);
  const [brands, setBrands] = useState(props.bikeData?.brands);
  const [types, setTypes] = useState(props.bikeData?.types);
  const [colors, setColors] = useState(props.bikeData?.colors);

  useEffect(() => {
    props.fetchExampleOptions(state);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  useEffect(() => {
    setState(props.selectedBike);
    props.fetchExampleOptions(state);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [props.selectedBike])

  useEffect(() => {
    setBrands(props.bikeData?.brands);
  }, [props.bikeData?.brands]);

  useEffect(() => {
    setTypes(props.bikeData?.types);
  }, [props.bikeData?.types]);

  useEffect(() => {
    setColors(props.bikeData?.colors);
  }, [props.bikeData?.colors]);

  useEffect(() => {
    props.fetchExampleOptions(state);
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [state.brand, state.color, state.type]);

  const onBikeBrandChange = (): void => {
    setState(prevState => {
      return {
        ...prevState,
        type: '',
        color: ''
      }
    })
  }

  const onBikeTypeChange = (): void => {
    setState(prevState => {
      return {
        ...prevState,
        color: ''
      }
    })
  }

  const nextStep = (): void => {
    props.saveExampleData(state);
    alert(`Save data: ${JSON.stringify(state)}`);
  }
  
  const isNextButtonDisabled = (): boolean => {
    return isStringEmpty(state.brand) || isStringEmpty(state.type) || isStringEmpty(state.color);
  }

  const isStringEmpty = (value: string): boolean => {
    return !value || value.length === 0;
  }

  return (
    <div>
      <CommonSingleSelect
        className='inputField'
        label={'Bike brand'}
        options={brands ?? ['Brand1', 'Brand2']}
        selectedValue={state.brand}
        setSelectedValue={val => setState(prevState => { return { ...prevState, brand: val } })}
        onChange={onBikeBrandChange}
      />
      <CommonSingleSelect
        className='inputField'
        label={'Bike type'}
        options={(types ?? ['Type1', 'Type2'])}
        selectedValue={state.type}
        setSelectedValue={val => setState(prevState => { return { ...prevState, type: val } })}
        onChange={onBikeTypeChange}
      />
      <CommonRadioGroup
        className='inputField'
        options={colors ?? ['Color1', 'Color2']}
        selectedValue={state.color}
        setSelectedValue={val =>
          setState(prevState => { return { ...prevState, color: val } })
        }
        label={'Bike color'}
      />
      <CommonButton
        type={'button'}
        onClick={nextStep}
        disabled={isNextButtonDisabled()}
      >
        NEXT
      </CommonButton>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedBike: state.example.selectedBike as BikeDataType,
    bikeData: state.example.bikeOption as BikeOptionsType,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  saveExampleData: (data: BikeDataType) => dispatch(saveExampleData(data)),
  fetchExampleOptions: (selectedBike: BikeDataType) => dispatch(fetchExampleOptions(selectedBike))
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ExampleForm);
