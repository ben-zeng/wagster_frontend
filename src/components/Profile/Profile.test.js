import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Profile/>));

    it('should render a card element', () => {
        expect(wrapper.find('Card').length).toEqual(1);
    });

    // it('should render a title text Login Page', () => {
    //     expect(wrapper.find('Card').text()).toEqual("Dog Name");
    // });

});

