import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from 'app/config/hooks';
import instance from 'app/instance';
import { toggleModal } from 'app/module/modalSlice';

interface PostSelectProps {
  title: string;
  category: string;
  optionArr: string[];
  imageArr: string[];
  time: number;
}

const postSelect = async (item: PostSelectProps) => {
  const formData = new FormData();

  formData.append('title', item.title);
  formData.append('category', item.category);
  // @ts-ignore
  formData.append('options', item.optionArr);
  formData.append('time', String(item.time));

  if (item.imageArr[0]) {
    for (let i = 0; i < item.imageArr.length; i++) {
      formData.append('image', item.imageArr[i]);
    }
  }

  const { data } = await instance.post('/select', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.result;
};

const usePostSelect = () => {
  const dispatch = useAppDispatch();

  return useMutation(postSelect, {
    onSuccess: () => {
      dispatch(toggleModal({ type: 'upload', message: '게시글 등록 완료!' }));
    },
  });
};

export default usePostSelect;
