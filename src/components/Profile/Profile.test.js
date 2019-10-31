import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Profile/>));

    it('should render a div element', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a title text Login Page', () => {
        expect(wrapper.find('div').text()).toEqual("Profile Page!");
    });

});

