import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Posts } from './Routes/Posts/posts';
import { Home } from './Routes/Home/home';
import { Nav } from './Routes/Nav/Nav';
import { Photos } from './Routes/Photos/Photos';
import { GlobalStyles } from './Common/GlobalStyles';

const App: FC = () => {
	return (
		<>
			<GlobalStyles />

			<img src={process.env.PUBLIC_URL} alt="" />
			<Nav />
			<Routes>
				<Route index element={<Home />} />
				<Route path="posts" element={<Posts />} />
				<Route path="photos" element={<Photos />} />
			</Routes>
		</>
	);
};
export default App;
