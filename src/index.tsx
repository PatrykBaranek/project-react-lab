import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './context/Theme/ThemeContext';

import App from './App';

import './index.css';
import { LoginProvider } from './context/Account/AccountContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<LoginProvider>
			<ThemeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</LoginProvider>
	</React.StrictMode>
);
