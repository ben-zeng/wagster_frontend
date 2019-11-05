import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
    currentUser: {
        jsonWebToken: null,
        isLoggedIn: false,
        userId: null
    }
};

export const { GlobalStateProvider, useGlobalState } = createGlobalState(initialState);
