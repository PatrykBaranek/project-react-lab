export interface ILogin {
	username: string;
	password: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: ILogin | null;
}

export interface AuthAction {
	type: 'LOGIN' | 'LOGOUT';
	payload?: any;
}

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				isAuthenticated: true,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};
