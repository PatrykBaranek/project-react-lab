import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/Account/AccountContext';
import { ILogin } from '../../context/Account/AccountReducers';

import './LoginForm.css';

export const LoginForm: React.FC = () => {
	const { handleLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const payload: ILogin = {
			username: usernameRef.current?.value as string,
			password: usernameRef.current?.value as string,
		};

		handleLogin(payload);
		navigate('/');
	};

	return (
		<div className="login-form-background">
			<form className="login-form-container" onSubmit={handleSubmit}>
				<div className="login-title">
					<h3>Login</h3>
				</div>
				<div className="login-username">
					<input
						type="text"
						name="username"
						ref={usernameRef}
						required
						placeholder="username"
					/>
				</div>
				<div className="login-password">
					<input
						type="password"
						name="password"
						ref={passwordRef}
						required
						placeholder="password"
					/>
				</div>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};
