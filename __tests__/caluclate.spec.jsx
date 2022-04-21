import React from 'react';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

import { CaluclateAmount } from '../src/caluclate';

test('renders caluclate comp', () => {
  const snap = shallow(<CaluclateAmount />);
  expect(snap).toMatchSnapshot();
});
