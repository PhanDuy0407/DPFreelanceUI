import { useState, useEffect, createContext, useContext, } from 'react';
import rootApi from '../rootAPi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await rootApi.get('/auth/me');
            setUser(response.data);
            setLoadingUser(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            setLoadingUser(false);
        }
        else fetchUser();
    }, []); // Empty dependency array ensures useEffect runs only once

    const refetchUser = () => {
        if (!localStorage.getItem("access_token")) {
            setLoadingUser(false);
            setUser(null)
        }
        else {
            setLoadingUser(true);
            fetchUser();
        }
    }

    return (
        <AuthContext.Provider value={{ user, loadingUser, refetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};