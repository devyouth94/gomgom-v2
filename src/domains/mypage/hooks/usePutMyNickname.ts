import { useMutation } from '@tanstack/react-query';
import instance from 'app/instance';
import { userStorage } from 'lib/utils/storage';

interface Data {
  nickname: string;
}

const putNickname = async (editNickname: string) => {
  const { data } = await instance.put<Data>('/user/nickname', { nickname: editNickname });

  return data;
};

const usePutMyNickname = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  return useMutation(putNickname, {
    onSuccess: (data) => {
      userStorage.setNickname(data.nickname);
      setState(false);
    },
  });
};

export default usePutMyNickname;
