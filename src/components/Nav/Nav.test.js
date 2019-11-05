import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';
import { GlobalStateProvider } from '../../helpers/GlobalState';


jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));


describe ('Nav',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GlobalStateProvider><Nav /></GlobalStateProvider>));

    it('should render a nav element', () => {
        expect(wrapper.find('nav').length).toEqual(0);
    });

});

