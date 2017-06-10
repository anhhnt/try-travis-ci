import React from 'react'
import renderer from 'react-test-renderer'
import TryTravis from '../lib/TryTravis'

it('renders correctly', () => {
  const tree = renderer.create(
    <TryTravis />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
