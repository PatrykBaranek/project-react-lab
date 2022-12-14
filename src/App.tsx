import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Routes/Home/home';
import Nav from './Routes/Nav/Nav';
import PostDetails from './Routes/PostDetails/PostDetails';
import Posts from './Routes/Posts/posts';
import AlbumPhotos from './Routes/Photos/AlbumsPhotos';
import NotFound from './Common/NotFound/NotFound';
import Users from './Routes/Users/Users';

// styles
import { GlobalStyles } from './Common/GlobalStyles';
import './App.css';
import ErrorPage from './Common/ErrorPage/ErrorPage';

const App: FC = () => {
	return (
		<>
			<GlobalStyles />

			<img src={process.env.PUBLIC_URL} alt="" />
			<Nav />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="posts" element={<Posts />} />
				<Route path="posts/:id" element={<PostDetails />} />
				<Route path="photos" element={<AlbumPhotos />} />
				<Route path="users" element={<Users />} />
				<Route path="error" element={<ErrorPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};
export default App;
