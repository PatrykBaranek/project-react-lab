import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { IComment } from '../../types';
import './CreateNewCommentForm.css';
import React from 'react';

export interface ICreateNewCommentFormProps {
  postId: number;
  open: boolean;
  handleOnClose: () => void;
  handleAddNewComment: (newComment: IComment) => void;
  username: string | undefined;
}

export const CreateNewCommentForm: React.FC<ICreateNewCommentFormProps> = ({
  postId,
  open,
  handleOnClose,
  handleAddNewComment,
  username,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
        email: username,
        title: titleRef.current?.value,
        body: bodyRef.current?.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newComment: IComment = {
          ...data,
        };

        handleAddNewComment(newComment);
      })
      .catch((err) => console.error(err));

    handleOnClose();
  };

  if (!open) return null;
  return createPortal(
    <div className="create-new-comment-container">
      <form className="create-new-comment-form" onSubmit={handleSubmit}>
        <FontAwesomeIcon className="close-form-btn" icon={faXmark} onClick={handleOnClose} />
        <div className="title-comment">
          <input type="text" placeholder="title" name="title" ref={titleRef} required />
        </div>
        <div className="body-comment">
          <input type="text" placeholder="body" ref={bodyRef} name="body" required />
        </div>
        <button type="submit">Create Comment</button>
      </form>
    </div>,
    document.body
  );
};
