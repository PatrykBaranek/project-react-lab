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

///
// const Login: FC<LoginProps> = ({ onLogin }) => {
// 	const usernameInputRef = useRef<HTMLInputElement | null>(null);
// 	const passwordInputRef = useRef<HTMLInputElement | null>(null);

// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();

// 		const user: ILogin = {
// 			username: usernameInputRef.current?.value,
// 			password: passwordInputRef.current?.value,
// 		};

// 		dispatch({ type: 'LOGIN', payload: user });
// 	};

// 	return (
// 		<form className="login-form-container" onSubmit={handleSubmit}>
// 			<div className="login-username">
// 				<label>
// 					username:
// 					<input type="text" name="username" ref={usernameInputRef} required />
// 				</label>
// 			</div>
// 			<div className="login-password">
// 				<label>
// 					password:
// 					<input type="text" name="password" ref={passwordInputRef} required />
// 				</label>
// 			</div>
// 			<button type="submit">login</button>
// 		</form>
// 	);
// };
