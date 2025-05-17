'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken, getAuthToken, removeAuthToken, setAuthToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {jwtDecode} from "jwt-decode";

type JwtPayload = {
  role: string;
  exp: number;
  lastName: string;
  firstName: string;
  university?: {
    shortName?: string;
  }
  yearsBeforeEnding?: number;
  universityShortName?: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  firstName: string | null;
  lastName: string | null;
  universityShortName?: string | null;
  year?: number | null;
  login: (token: string, rememberMe?: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [universityShortName, setUniversityShortName] = useState<string | undefined>(undefined);
  const [year,setYear] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        if (!token || typeof token !== 'string') {
          throw new Error('No valid token');
        }

        const isValid = await verifyToken();
        if (!isValid) throw new Error("Invalid token");

        const decoded = jwtDecode<JwtPayload>(token);
        setRole(decoded.role);
        setFirstName(decoded.firstName)
        setLastName(decoded.lastName)    
        setUniversityShortName(decoded?.universityShortName)    
        setYear(decoded?.yearsBeforeEnding);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, rememberMe = false) => {
    setAuthToken(token, {
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined
    });
    const decoded = jwtDecode<JwtPayload>(token);
    setRole(decoded.role);
    setFirstName(decoded.firstName)
    setLastName(decoded.lastName)
    setUniversityShortName(decoded?.universityShortName)    
    setYear(decoded?.yearsBeforeEnding);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        role, 
        firstName,
        lastName,
        universityShortName,
        year,
        login, 
        logout 
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};