# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

# Testing solution

## Overview

My testing solutions runs with full redux state and fully implements functional components hooks. I'm using 2 libraries:

`react-test-renderer`
`redux-mock-store`

## useEffect

UseEffect to be synchronically executed must be replaced by useLayoutEffect. 
We can achieve this by setting this in `__mocks__` folder:

`const React = jest.requireActual('react');`<br/>
`module.exports = { ...React, useEffect: React.useLayoutEffect };`

## Make state is updated

Redux-mock-store doesn't implement reducers at all. It only lets you to call your actions and check if they are in store. We can overcome this, by making our mocked store instead of object, a function of object which at the end call our root reducer (`TestInitialStore.ts`):

`const mockStore = configureStore([thunk]);`<br/>
` //way to make your dispatched actions are executed by reducers`<br/>
`const createState = (initialState: any) => (actions: any) => `
	&nbsp;&nbsp;`actions.reduce(rootReducer, initialState);`<br/>
`return mockStore(createState({
  ...store,
  ...testInitialStoreData
}));`

## Mock your window

If you need you can mock your object window for test, ie if you use window.location.origin or window.alert (as me for example cases) - code available when preparing common test container for whole tests (`TestComponentContainer.ts`):

`Object.defineProperty(window, 'alert', {
  writable: true,
  value: jest.fn()
 });`
 
 ## Make your test wait for your actions
 
 As we're using react-test-rendered, to make any action on our component we're using `act` function. To make it work correctly our test must be `async` and for each use of `act`, we must put `await`, so our code stops until all component updates are executed:
 
 `await TestRenderer.act(async () => {
   component.root.findByProps({ label: testLabel })
   .props.setSelectedValue('test');
 });`
 
 # Sum up
 
 All other solution are quite common and I think can be implemented in any other testing libraries. 
 I tried to put some comments, just to show point which I think are important. Code was prepared to show possibilites of fully testing functional components and to gather all solutions found, when dealing with this issue.