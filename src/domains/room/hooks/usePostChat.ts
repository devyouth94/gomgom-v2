import { useMutation } from '@tanstack/react-query';

import instance from 'app/instance';
import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import type { PostChatItemProps } from 'lib/constants/types';

interface PostChatProps {
  title: string;
  hashTag: string[];
  max: number;
}

const postChat = async (item: PostChatProps) => {
  const { data } = await instance.post<{ result: PostChatItemProps }>('/room', item);

  return data.result;
};

const usePostChat = () => {
  const dispatch = useAppDispatch();

  return useMutation(postChat, {
    onSuccess: () => {
      dispatch(toggleModal({ type: 'upload', message: '고민 상담방 등록 완료!' }));
    },
  });
};

export default usePostChat;
