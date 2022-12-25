import { ThemeMode, initialState } from './ThemeContext';

type ActionTypes = { type: 'CHANGE_MODE'; payload: ThemeMode };

export const changeThemeReducer = (
	state: typeof initialState,
	action: ActionTypes
) => {
	switch (action.type) {
		case 'CHANGE_MODE':
			return { ...state, state: action.payload };
		default:
			return state;
	}
};
