import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

import './CreateNewPostForm.css';
import { IPost } from '../../types/types';
import { FormEvent, useRef } from 'react';

export interface ICreateNewPostFormProps {
  isOpen: boolean;
  handleCloseForm: () => void;
  handleAddNewPost: (newPost: IPost) => void;
}

export const CreateNewPostForm: React.FC<ICreateNewPostFormProps> = ({
  isOpen,
  handleCloseForm,
  handleAddNewPost,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newPost: IPost = {
      id: 0,
      title: titleRef.current?.value as string,
      body: bodyRef.current?.value as string,
      userId: 11,
    };
    handleAddNewPost(newPost);
    handleCloseForm();
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="create-new-post-container">
      <form className="create-new-post-form" onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faXmark} onClick={handleCloseForm} className="close-form-btn" />
        <div className="post-title">
          <input type="text" name="title" ref={titleRef} placeholder="title" required />
        </div>
        <div className="post-body">
          <input type="text" name="body" ref={bodyRef} placeholder="body" required />
        </div>
        <button>Create New Post</button>
      </form>
    </div>,
    document.body
  );
};
