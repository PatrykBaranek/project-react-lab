import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

// styles
import './App.css';

import { LoginForm } from './Routes/LoginForm/LoginForm';
import { Dashboard } from './Routes/Dashboard/Dashboard';
import { Nav } from './Routes/Nav/Nav';
import { ErrorPage } from './Routes/ErrorPage/ErrorPage';
import { Home } from './Routes/Home/home';
import { NotFound } from './Routes/NotFound/NotFound';
import { AlbumPhotos } from './Routes/Photos/AlbumsPhotos';
import { PostDetails } from './Routes/PostDetails/PostDetails';
import { Posts } from './Routes/Posts/posts';
import { Users } from './Routes/Users/Users';

const App: FC = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
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
