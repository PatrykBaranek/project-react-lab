import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Posts } from './Routes/Posts/posts';
import { Home } from './Routes/Home/home';
import { Nav } from './Routes/Nav/Nav';
import { Photos } from './Routes/Photos/Photos';

const App: FC = () => {
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json())
			.then((json) => console.log(json));
	});

	return (
		<BrowserRouter>
			<img src={process.env.PUBLIC_URL} alt="" />
			<Nav />
			<Routes>
				<Route path="posts" element={<Posts />} />
				<Route path="/" element={<Home />} />
				<Route path="photos" element={<Photos />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
