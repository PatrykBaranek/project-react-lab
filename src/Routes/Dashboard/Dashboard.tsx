import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Account/AccountContext';
import { useFetch } from '../../Hooks/useFetch';
import { IAlbum, IPost, IUser } from '../../Common/types';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Common/Loading/Loading';

export const Dashboard: FC = () => {
	const { state: userContext } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userContext.isAuthenticated) {
			navigate('/login');
		}
	}, []);

	const {
		data: user,
		error: userFetchError,
		isLoading: userIsLoadingFetch,
	} = useFetch<IUser>(
		'https://jsonplaceholder.typicode.com/users?username=' +
			userContext.login?.username
	);

	const {
		data: albums,
		error: albumFetchError,
		isLoading: albumIsLoadingFetch,
	} = useFetch<IAlbum[]>(
		'https://jsonplaceholder.typicode.com/albums?userId=' + user?.id
	);

	const {
		data: posts,
		error: postsFetchError,
		isLoading: postsIsLoadingFetch,
	} = useFetch<IPost[]>(
		'https://jsonplaceholder.typicode.com/posts?userId=' + user?.id
	);

	return (
		<div className="dashboard-container">
			<div className="user-info-container">
				<h3 className="user-name">{user?.name}</h3>
			</div>
			<div className="user-posts-container">
				<h4>{user?.name} Posts</h4>
				{postsIsLoadingFetch && <Loading />}
				{postsFetchError && <p>{postsFetchError}</p>}
				<div className="user-posts">
					{posts?.map((post) => (
						<p>{post.body}</p>
					))}
				</div>
			</div>
			<div className="user-albums-conatiner">
				<h4>{user?.name} Albums</h4>
				{albumIsLoadingFetch && <Loading />}
				{albumFetchError && <p>{albumFetchError}</p>}
				<div className="user-albums">
					{albums?.map((album) => (
						<p>{album.title}</p>
					))}
				</div>
			</div>
		</div>
	);
};
