import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons';

import './Comments.css';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';
import { CreateNewCommentForm } from '../../components/CreateNewCommentForm/CreateNewCommentForm';
import {
  useDeleteCommentByIdMutation,
  useGetAllComentsQuery,
} from '../../app/api/jsonPlaceholderApi';

export interface ICommentsProps {
  postId: number;
}

export const Comments: React.FC<ICommentsProps> = ({ postId }: ICommentsProps) => {
  const mode = useAppSelector(selectThemeMode);
  const user = useAppSelector(selectAuth);

  const { data: comments } = useGetAllComentsQuery(Number(postId));

  const [deleteComment] = useDeleteCommentByIdMutation();

  const [openCreateNewCommentForm, setOpenCreateNewCommentForm] = useState(false);

  const handleCloseForm = () => {
    setOpenCreateNewCommentForm(false);
  };

  return (
    <div className={`comments-container ${mode}`}>
      <div className="comments-count">
        <b>{comments?.length} </b>
        <FontAwesomeIcon icon={faComments} />
      </div>
      <CreateNewCommentForm
        postId={postId}
        open={openCreateNewCommentForm}
        handleOnClose={handleCloseForm}
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
                onClick={() => deleteComment(comment.id)}
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
  );
};
