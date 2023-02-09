import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import FooterInput from 'common/elements/FooterInput';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { IconSend } from 'static/Icons/Icons';
import { userStorage } from 'lib/utils/storage';
import usePostComment from '../hooks/usePostComment';

const CommentInput = () => {
  const dispatch = useAppDispatch();
  const { selectKey } = useParams();

  const { mutate: postComment } = usePostComment();
  const [comment, setComment] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handlePostComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userStorage.getToken('access')) {
      dispatch(toggleModal({ type: 'signin' }));
      return;
    }

    if (!comment.trim().length) {
      dispatch(toggleModal({ type: 'basic', message: '내용을 입력해주세요.' }));
    } else {
      postComment({ selectKey: Number(selectKey), comment });
    }

    setComment('');
  };

  return (
    <FooterInput>
      <form onSubmit={handlePostComment}>
        <input value={comment} onChange={handleChange} placeholder="더 좋은 의견을 남겨주세요." />
        <button type="submit">
          <IconSend />
        </button>
      </form>
    </FooterInput>
  );
};

export default CommentInput;
