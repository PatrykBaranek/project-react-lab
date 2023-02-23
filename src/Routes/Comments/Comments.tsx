import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Loading } from '../../Common/components/Loading/Loading';
import { IComment } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';

import './Comments.css';
import { CreateNewCommentForm } from '../../Common/components/CreateNewCommentForm/CreateNewCommentForm';
import { AuthContext } from '../../context/Account/AccountContext';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';

export interface ICommentsProps {
  postId: number;
}

export const Comments: React.FC<ICommentsProps> = ({ postId }: ICommentsProps) => {
  const mode = useAppSelector(selectThemeMode);
  const { state: user } = useContext(AuthContext);
  const [openCreateNewCommentForm, setOpenCreateNewCommentForm] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const { data: commentsFetch, isLoading } = useFetch<IComment[]>(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  useEffect(() => {
    commentsFetch && setComments(commentsFetch);
  }, [commentsFetch]);

  const handleCloseForm = () => {
    setOpenCreateNewCommentForm(false);
  };

  const handleAddComment = (newComment: IComment) => {
    newComment.id = comments[comments.length - 1].id + 1;
    setComments([...comments, newComment]);
  };

  const handleDelete = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={'comments-container ' + mode}>
        <div className="comments-count">
          <b>{comments?.length} </b>
          <FontAwesomeIcon icon={faComments} />
        </div>
        <CreateNewCommentForm
          postId={postId}
          open={openCreateNewCommentForm}
          handleOnClose={handleCloseForm}
          handleAddNewComment={handleAddComment}
          username={user.login?.username}
        />
        {!openCreateNewCommentForm && (
          <button className="create-comment-btn" onClick={() => setOpenCreateNewCommentForm(true)}>
            Create New Comment
          </button>
        )}
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              {user.login?.username === comment.email && (
                <button
                  className="delete-comment-btn"
                  title="delete comment"
                  onClick={() => handleDelete(comment.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
              <div className="comment-author">
                <p>{comment.email}</p>
              </div>
              <div className="comment-name">
                {comment.name ? <p>{comment.name}</p> : <p>{comment.title}</p>}
              </div>
              <div className="comment-body">
                <p>{comment.body}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
