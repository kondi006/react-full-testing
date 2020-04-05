//for test we need to mock useEffect by useLayoutEffect so changes are happening
// synchronously after updating component
const React = jest.requireActual('react');
module.exports = { ...React, useEffect: React.useLayoutEffect };
