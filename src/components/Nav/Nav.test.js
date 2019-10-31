import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Nav />));

    it('should render a nav element', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });

    // it('should render a title text Login Page', () => {
    //     expect(wrapper.find('div').text()).toEqual("Login Page!");
    // });

});

