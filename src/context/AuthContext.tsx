// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { verifyToken, getAuthToken, removeAuthToken, setAuthToken } from '@/lib/auth';
// import { useRouter } from 'next/navigation';
// import {jwtDecode} from "jwt-decode";

// type JwtPayload = {
//   role: string;
//   exp: number;
//   lastName: string;
//   firstName: string;
//   university?: {
//     shortName?: string;
//   }
//   yearsBeforeEnding?: number;
//   universityShortName?: string;
// };
// type AuthContextType = {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   role: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   universityShortName?: string | null;
//   year?: number | null;
//   login: (token: string, rememberMe?: boolean) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {

// const isExpired = (token: string) => {
//   try {
//     const { exp } = jwtDecode<{ exp: number }>(token);
//     return Date.now() >= exp * 1000;
//   } catch {
//     return true;
//   }
// };
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [role, setRole] = useState<string | null>(null);
//   const [firstName, setFirstName] = useState<string | null>(null);
//   const [lastName, setLastName] = useState<string | null>(null);
//   const [universityShortName, setUniversityShortName] = useState<string | undefined>(undefined);
//   const [year,setYear] = useState<number | undefined>(undefined);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token || typeof token !== 'string' || isExpired(token)) {
//           throw new Error('Token is missing or expired');
//         }

//         const isValid = await verifyToken();
//         if (!isValid) {
//           throw new Error('Token verification failed');
//         }

//         const decoded = jwtDecode<JwtPayload>(token);
//         setRole(decoded.role);
//         setFirstName(decoded.firstName)
//         setLastName(decoded.lastName)
//         setUniversityShortName(decoded?.universityShortName)
//         setYear(decoded?.yearsBeforeEnding);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.log(error)
//         setIsAuthenticated(false);
//         setRole(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = (token: string, rememberMe = false) => {
//     setAuthToken(token, {
//       maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined
//     });
//     const decoded = jwtDecode<JwtPayload>(token);
//     setRole(decoded.role);
//     setFirstName(decoded.firstName)
//     setLastName(decoded.lastName)
//     setUniversityShortName(decoded?.universityShortName)
//     setYear(decoded?.yearsBeforeEnding);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     removeAuthToken();
//     setIsAuthenticated(false);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         isLoading,
//         role,
//         firstName,
//         lastName,
//         universityShortName,
//         year,
//         login,
//         logout
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

type UserPayload = {
	role: string;
	lastName: string;
	firstName: string;
	universityShortName?: string;
	yearsBeforeEnding?: number;
	id: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	isLoading: boolean;
	role: string | null;
	id: string | null;
	universityShortName?: string | null;
	year?: number | null;
	logout: () => void;
	login: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [role, setRole] = useState<string | null>(null);
	const [id, setId] = useState<string | null>(null);
	const [universityShortName, setUniversityShortName] = useState<string | null>(null);
	const [year, setYear] = useState<number | null>(null);

	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await fetch('/api/auth/verify', {
					credentials: 'include',
				});

				if (res.status === 401) {
					setIsAuthenticated(false);
					setRole(null);
					return;
				}

				if (!res.ok) throw new Error('Not authenticated');

				const user: UserPayload = await res.json();

				setRole(user.role);
				setId(user.id);

				setUniversityShortName(user.universityShortName || null);
				setYear(user.yearsBeforeEnding ?? null);
				setIsAuthenticated(true);
			} catch (err) {
				console.error('Auth check failed:', err);
				setIsAuthenticated(false);
				setRole(null);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const logout = async () => {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});
		} catch (e) {
			console.error('Logout failed', e);
		} finally {
			setIsAuthenticated(false);
			setRole(null);
			setId(null);
			setUniversityShortName(null);
			setYear(null);
			router.push('/login');
		}
	};

	const login = async () => {
		try {
			const res = await fetch('/api/auth/verify', {
				credentials: 'include',
			});

			if (!res.ok) throw new Error('Not authenticated');

			const user: UserPayload = await res.json();

			setRole(user.role);
			setId(user.id);
			setUniversityShortName(user.universityShortName || null);
			setYear(user.yearsBeforeEnding ?? null);
			setIsAuthenticated(true);
		} catch (err) {
			console.error('Login (verify) failed:', err);
			setIsAuthenticated(false);
		}
	};
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				role,
				id,
				universityShortName,
				year,
				logout,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth: () => AuthContextType = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
