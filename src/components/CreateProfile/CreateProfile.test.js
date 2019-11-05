import React from 'react';
import { shallow } from 'enzyme';
import CreateProfile from './CreateProfile';
import { GlobalStateProvider } from '../../helpers/GlobalState';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe ('CreateProfile',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GlobalStateProvider><CreateProfile /></GlobalStateProvider>));

    it('should render a div element', () => {
        expect(wrapper.find('div').length).toEqual(0);
    });

});
