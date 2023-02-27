import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons';

import { IComment } from '../../types/types';

import './Comments.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';
import { CreateNewCommentForm } from '../../components/CreateNewCommentForm/CreateNewCommentForm';
import {
  fetchCommentsForPostId,
  selectComments,
  selectCommentsError,
  selectCommentsStatus,
} from '../../app/Comments/commentsSlice';

export interface ICommentsProps {
  postId: string;
}

export const Comments: React.FC<ICommentsProps> = ({ postId }: ICommentsProps) => {
  const mode = useAppSelector(selectThemeMode);
  const user = useAppSelector(selectAuth);

  const comments = useAppSelector(selectComments);
  const commentsStatus = useAppSelector(selectCommentsStatus);
  const commentsError = useAppSelector(selectCommentsError);

  const dispatch = useAppDispatch();

  const [openCreateNewCommentForm, setOpenCreateNewCommentForm] = useState(false);

  const handleCloseForm = () => {
    setOpenCreateNewCommentForm(false);
  };

  useEffect(() => {
    dispatch(fetchCommentsForPostId(postId));
  }, []);

  return (
    <>
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
