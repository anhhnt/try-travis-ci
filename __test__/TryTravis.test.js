import React from 'react'
import renderer from 'react-test-renderer'
import TryTravis from '../../try-travis-ci'

it('renders correctly', () => {
  const tree = renderer.create(
    <TryTravis />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
