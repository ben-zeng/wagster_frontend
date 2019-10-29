import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe ('App',() => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('should render a div element', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render a hello world in a div element', () => {
    expect(wrapper.find('div').text()).toEqual("Hello World!");
  });

});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
