import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
    currentUser: {
        jsonWebToken: null,
        userIsLoggedIn: false,
        userId: null
    }
};

export const { GlobalStateProvider, useGlobalState } = createGlobalState(initialState);
