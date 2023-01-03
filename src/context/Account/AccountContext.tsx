import { createContext, useReducer } from 'react';
import { AuthState, ILogin, authReducer } from './AccountReducers';

const initialLoginState: AuthState = {
	isAuthenticated: false,
	login: null,
};
const initialRegisterState = {};

export const AuthContext = createContext<{
	state: AuthState;
	handleLogin: (login: ILogin) => void;
	handleLogout: () => void;
}>({
	state: initialLoginState,
	handleLogin: () => {},
	handleLogout: () => {},
});

interface ILoginProviderProps {
	children: React.ReactNode;
}

export const LoginProvider: React.FC<ILoginProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialLoginState);

	const handleLogin = (login: ILogin) => {
		dispatch({ type: 'LOGIN', payload: login });
	};

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT', payload: null });
	};

	return (
		<AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
