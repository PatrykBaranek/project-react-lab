import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LoginForm } from './Routes/LoginForm/LoginForm';

// styles
import './App.css';
import Nav from './Routes/Nav/Nav';
import Home from './Routes/Home/home';
import Posts from './Routes/Posts/posts';
import PostDetails from './Routes/PostDetails/PostDetails';
import AlbumPhotos from './Routes/Photos/AlbumsPhotos';
import Users from './Routes/Users/Users';
import ErrorPage from './Routes/ErrorPage/ErrorPage';
import NotFound from './Routes/NotFound/NotFound';

const App: FC = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="posts" element={<Posts />} />
				<Route path="posts/:id" element={<PostDetails />} />
				<Route path="photos" element={<AlbumPhotos />} />
				<Route path="users" element={<Users />} />
				<Route path="login" element={<LoginForm />} />
				<Route path="error" element={<ErrorPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};
export default App;
