import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Login />));

    it('should render a div element', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a title text Login Page', () => {
      expect(wrapper.find('div').text()).toEqual("Sign inSign InRegister");
    });

});

