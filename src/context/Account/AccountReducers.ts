export type ILogin = {
	username: string;
	password: string;
};

export interface AuthState {
	isAuthenticated: boolean;
	login: ILogin | null;
}

export interface AuthAction {
	type: 'LOGIN' | 'LOGOUT';
	payload: ILogin | null;
}

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				isAuthenticated: true,
				login: action.payload,
			};
		case 'LOGOUT':
			return {
				isAuthenticated: false,
				login: action.payload,
			};
		default:
			return state;
	}
};
