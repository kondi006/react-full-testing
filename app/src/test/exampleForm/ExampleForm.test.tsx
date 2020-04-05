import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';
import * as React from 'react';
import { TestComponentContainer } from '../__testUtils__/TestComponentContainer';
import { getTestStore } from '../__testUtils__/TestInitialStore';
import { MockStore } from 'redux-mock-store';
import { isActionFired, waitForPromises } from '../__testUtils__/Utils';
import { getBikeDataRequest } from '../../main/exampleForm/service/ExampleFormService';
import ExampleForm from '../../main/exampleForm/ExampleForm';
import { CommonButton } from '../../components/CommonButton';
import { CommonSingleSelect } from '../../components/CommonSingleSelect';
import { fetchExampleOptionsAction, BikeOptionsType, BikeDataType, saveExampleDataAction } from '../../main/exampleForm/redux/Actions';

const response = {
  brands: ['Kross'],
  types: ['MTB'],
  colors: ['red']
};

jest.mock(
  '../../main/exampleForm/service/ExampleFormService',
  () => {
    return {
      getBikeDataRequest: jest.fn()
    }
  });

describe('Example form', () => {
  let store: MockStore<any>;
  let component: ReactTestRenderer;

  beforeEach(async () => {
    const localStore = {
      example: {
        bikeOptions: {
          brands: [],
          colors: [],
          types: []
        },
        selectedBike: {
          brand: '',
          type: '',
          color: ''
        }
      }
    };

    store = getTestStore(localStore);
    //mock return function to return anything we need for all tests
    (getBikeDataRequest as jest.Mock).mockReturnValue(response);

    await TestRenderer.act(async () => {
      component = TestRenderer.create(
        <TestComponentContainer store={store}>
          <ExampleForm />
        </TestComponentContainer>
      );
    })

  });

  afterEach(() => {
    store.clearActions();
    component.unmount();
  });

  //check if there are our common component rendered and useEffect works on mounting
  it('should be rendered', () => {
    //GIVEN

    //WHEN
    const buttonCount = component.root.findAllByType(CommonButton).length;
    const inputCount = component.root.findAllByType(CommonSingleSelect).length;

    //THEN
    expect(component.root).toBeDefined();
    expect(buttonCount).toBeGreaterThan(0);
    expect(inputCount).toBeGreaterThan(0);
    expect(isActionFired(store,
      fetchExampleOptionsAction(response as BikeOptionsType))).toBeTruthy();
  });

  //check when none value is provided, flag isDisabled is true - we check there if property on our site
  // is set correctly, working of disabling for this button should be tested in CommonButton 
  // component, not here. That test can be also extended to combine more cases like 2 provided, 1 not.
  it('should not be able to click button', () => {
    //GIVEN

    //WHEN
    const isDisabled: boolean = component.root.findByType(CommonButton)
      .props.disabled;

    //THEN
    expect(isDisabled).toBeTruthy();
  });

  const selectedBikeMock: BikeDataType = {
    brand: 'Kross',
    type: 'MTB',
    color: 'red'
  };

  // we check if probided data are saved here to redux
  it('should save provided data', async () => {
    //GIVEN
    const selectedBike = selectedBikeMock;

    //WHEN
    await fillBikeData(selectedBike);
    await TestRenderer.act(async () => {
      component.root.findByType(CommonButton).props.onClick();
    });

    const actualReduxSelectedBike = store.getState().example.selectedBike;

    //THEN
    expect(isActionFired(store, saveExampleDataAction(selectedBike))).toBeTruthy();
    expect(isActionFired(store, fetchExampleOptionsAction(response))).toBeTruthy();
    expect(actualReduxSelectedBike).toStrictEqual(selectedBike);
  });

  //check if for each change of field fetching options with proper response works
  const updateOptionsCases = [
    ['Bike brand', 'Giant'],
    ['Bike type', 'Specialized'],
    ['Bike color', 'Trek']
  ];

  it.each(updateOptionsCases)
    ('should update select field options after change on field with label: %s',
      async (testLabel: string, testBrand: string) => {
        //GIVEN
        const expectedBrands = [testBrand];
        const expectedTypes = ['MTB', 'road', 'gravel'];
        const expectedColors = ['red', 'blue'];

        const fetchData: BikeOptionsType = {
          brands: expectedBrands,
          types: expectedTypes,
          colors: expectedColors
        };
        //mock response for current test
        (getBikeDataRequest as jest.Mock).mockReturnValue(fetchData);

        //WHEN
        await TestRenderer.act(async () => {
          component.root.findByProps({ label: testLabel })
            .props.setSelectedValue('test');
        });
        await waitForPromises();

        const actualBrandOptions = component.root
          .findByProps({ label: 'Bike brand' }).props.options;
        const actualTypesOptions = component.root
          .findByProps({ label: 'Bike type' }).props.options;
        const actualColorsOptions = component.root
          .findByProps({ label: 'Bike color' }).props.options;

        //THEN
        expect(isActionFired(store,
          fetchExampleOptionsAction(fetchData))).toBeTruthy();
        expect(actualBrandOptions).toStrictEqual(expectedBrands);
        expect(actualTypesOptions).toStrictEqual(expectedTypes);
        expect(actualColorsOptions).toStrictEqual(expectedColors);
      });

  //check if clearing of data below works when setting fields
  const valueChangeCases = [
    ['Bike brand', 'Marin', 'Marin', '', ''],
    ['Bike type', 'electric', selectedBikeMock.brand, 'electric', '']
  ];

  it.each(valueChangeCases)('should clear lower provided data after change ' +
    'field with label: %s to value: %s',
    async (newValueLabel: string, newValue: string, expectedBrand: string,
      expectedType: string, expectedColor: string) => {
      //GIVEN

      //WHEN
      await fillBikeData(selectedBikeMock);
      await TestRenderer.act(async () => {
        component.root.findByProps({ label: newValueLabel })
          .props.setSelectedValue(newValue);
      });
      await TestRenderer.act(async () => {
        component.root.findByProps({ label: newValueLabel }).props.onChange();
      });

      const actualBrand = component.root
        .findByProps({ label: 'Bike brand' }).props.selectedValue;
      const actualType = component.root
        .findByProps({ label: 'Bike type' }).props.selectedValue;
      const actualColor = component.root
        .findByProps({ label: 'Bike color' }).props.selectedValue;

      //THEN
      expect(actualBrand).toBe(expectedBrand);
      expect(actualType).toBe(expectedType);
      expect(actualColor).toBe(expectedColor);
    });

  //normally we should have there constants so when label is changed test is still passing 
  // or provide test-id
  const fillBikeData = async (selectedBike: BikeDataType) => {
    await TestRenderer.act(async () => {
      component.root.findByProps({ label: 'Bike brand' })
        .props.setSelectedValue(selectedBike.brand);
    });
    await TestRenderer.act(async () => {
      component.root.findByProps({ label: 'Bike type' })
        .props.setSelectedValue(selectedBike.type);
    });
    await TestRenderer.act(async () => {
      component.root.findByProps({ label: 'Bike color' })
        .props.setSelectedValue(selectedBike.color);
    });
  }
});
