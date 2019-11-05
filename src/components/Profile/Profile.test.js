import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';
import { GlobalStateProvider } from '../../helpers/GlobalState';

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GlobalStateProvider> <Profile/> </GlobalStateProvider>));

    it('should render a card element', () => {
        expect(wrapper.find('Card').length).toEqual(0);
    });

    // it('should render a title text Login Page', () => {
    //     expect(wrapper.find('Card').text()).toEqual("Dog Name");
    // });

});

