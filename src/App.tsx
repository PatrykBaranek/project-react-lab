import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Posts } from './Routes/Posts/posts';
import { Home } from './Routes/Home/home';
import { Nav } from './Routes/Nav/Nav';
import { Photos } from './Routes/Photos/Photos';
import { GlobalStyles } from './Common/GlobalStyles';
import { useFetch } from './Hooks/useFetch';

const App: FC = () => {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<img src={process.env.PUBLIC_URL} alt="" />
				<Nav />
				<Routes>
					<Route path="posts" element={<Posts />} />
					<Route path="photos" element={<Photos />} />
					<Route index element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
export default App;
