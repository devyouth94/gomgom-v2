import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from 'app/config/hooks';
import instance from 'app/instance';
import { toggleModal } from 'app/module/modalSlice';
import { userStorage } from 'lib/utils/storage';

interface Data {
  nickname: string;
}

const putNickname = async (nickname: string) => {
  const { data } = await instance.put<Data>('/user/nickname', { nickname });

  return data;
};

const usePutKakaoNickname = () => {
  const dispatch = useAppDispatch();

  return useMutation(putNickname, {
    onSuccess: (data) => {
      userStorage.setNickname(data.nickname);
      dispatch(toggleModal({ type: 'success' }));
    },
  });
};

export default usePutKakaoNickname;
