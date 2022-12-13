import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Routes/Home/home';
import Nav from './Routes/Nav/Nav';
import Photos from './Routes/Photos/Photos';
import PostDetails from './Routes/PostDetails/PostDetails';
import Posts from './Routes/Posts/posts';

// styles
import { GlobalStyles } from './Common/GlobalStyles';
import './App.css';
import NotFound from './Common/NotFound/NotFound';

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
				<Route path="posts/:id" element={<PostDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};
export default App;
