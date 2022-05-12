import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: { accessToken: null, refreshToken: null },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ accessToken, refreshToken }) => {
        setUser({ accessToken, refreshToken });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };