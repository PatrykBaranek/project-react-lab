import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import './CreateNewCommentForm.css';
import React from 'react';

export interface ICreateNewCommentFormProps {
  postId: string;
  open: boolean;
  handleOnClose: () => void;
}

export const CreateNewCommentForm: React.FC<ICreateNewCommentFormProps> = ({
  postId,
  open,
  handleOnClose,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
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
