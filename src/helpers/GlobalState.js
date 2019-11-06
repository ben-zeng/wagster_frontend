import React from 'react';

const LOCAL_STORAGE_KEY = "wagster_frontend_global_state";

const initialState = {
    currentUser: {
        jsonWebToken: null,
        isLoggedIn: false,
        userId: null
    }
};

const persistedGlobalState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");

// Note: This isn't a deep clone, so whole objects e.g. `currentUser`
// are being overwritten when `persistedGlobalState` is spread
const globalState = {
    ...initialState,
    ...persistedGlobalState
};

/**
 * These functions are a workaround for persisting
 * application global state between new browser
 * page loads - without it, the global state (e.g.
 * your logged in state) are lost when you refresh
 * the page in your browser.
 */
export function GlobalStateProvider(props) {
    return (
        <>{props.children}</>
    )
}

export function useGlobalState(key) {
    const value = globalState[key];

    const setter = (newValue) => {
        globalState[key] = newValue;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(globalState));
    };
    
    return [value, setter];
}
