import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe ('App',() => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('should render a nav element', () => {
    expect(wrapper.find('nav').length).toEqual(1);
  });

  it('should render a profile page in a div element', () => {
    expect(wrapper.find('div').text()).toEqual("Profile Page!");
  });

});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
