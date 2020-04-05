import { FC, PropsWithChildren, default as React } from 'react';
import { Provider } from 'react-redux';

interface TestComponentContainerProps {
  store: any;
}

type Props = PropsWithChildren<TestComponentContainerProps>

export const TestComponentContainer: FC<Props> = (props: Props) => {
  //if you need to mock you window properties for test
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      origin: 'http://test'
    }
  });

  Object.defineProperty(window, 'alert', {
    writable: true,
    value: jest.fn()
  });

  return (
    <Provider store={props.store}>
      {props.children}
    </Provider>
  )
};
