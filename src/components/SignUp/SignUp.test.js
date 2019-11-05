import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp';
import { GlobalStateProvider } from '../../helpers/GlobalState';


jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

describe ('Login',() => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GlobalStateProvider><SignUp /></GlobalStateProvider>));

    it('should render a div element', () => {
        expect(wrapper.find('div').length).toEqual(0);
    });



});

