'use client'

import { createContext, useContext, useState, ReactNode } from "react"

interface AuthContextType {
    grobalEmail: string;
    setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [grobalEmail, setEmail] = useState<string>('');

    return (
        <AuthContext.Provider value={{grobalEmail, setEmail}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context ===undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}