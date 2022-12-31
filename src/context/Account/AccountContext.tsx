import { createContext, useReducer } from 'react';
import { AuthState, ILogin, authReducer } from './AccountReducers';

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

export const AuthContext = createContext<{
	state: AuthState;
	handleLogin: (login: ILogin) => void;
	handleLogout: () => void;
}>({ state: initialState, handleLogin: () => {}, handleLogout: () => {} });

interface ILoginProviderProps {
	children: React.ReactNode;
}

export const LoginProvider: React.FC<ILoginProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const handleLogin = (login: ILogin) => {
		dispatch({ type: 'LOGIN', payload: { login } });
	};

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
