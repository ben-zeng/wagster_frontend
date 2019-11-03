import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';


jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));


describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Nav />));

    it('should render a nav element', () => {
        expect(wrapper.find('nav').length).toEqual(1);
    });

});

