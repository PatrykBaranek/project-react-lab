import React, { FC, createContext, useReducer } from 'react';
import { changeThemeReducer } from './ThemeReducers';

export enum ThemeMode {
	dark = 'dark',
	light = 'light',
}

export interface IThemeProviderProps {
	children: React.ReactNode;
}

type ThemeContextValue = {
	state: ThemeMode;
	changeTheme: (mode: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
	state: ThemeMode.dark,
	changeTheme: () => {},
});

export const initialState = {
	state: ThemeMode.light,
};

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(changeThemeReducer, initialState);

	const changeTheme = (mode: ThemeMode) => {
		dispatch({
			type: 'CHANGE_MODE',
			payload: mode,
		});
	};

	return (
		<ThemeContext.Provider value={{ ...state, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
