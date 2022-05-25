import React, { useState, createContext } from 'react';

const UserContext = createContext({
    user: { accessToken: null, refreshToken: null, id: null, location: null, latitude: null, longitude: null },
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const dispatch = ({ accessToken, refreshToken, id, location, latitude, longitude }) => {
        setUser({ accessToken, refreshToken, id, location, latitude, longitude });
    };
    const value = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };