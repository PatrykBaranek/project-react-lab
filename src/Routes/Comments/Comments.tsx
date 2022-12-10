import { FC } from 'react';
import { MethodType } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';

export interface ICommentsProps {
	postId: number;
}

// "postId": 1,
//     "id": 1,
//     "name": "id labore ex et quam laborum",
//     "email": "Eliseo@gardner.biz",
//     "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"

export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

const Comments: FC<ICommentsProps> = (props: ICommentsProps) => {
	const { data, error, isLoading } = useFetch<IComment>(
		`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`,
		MethodType.GET
	);

	return <div>comments {props.postId}</div>;
};

export default Comments;
