import { QueryClient } from '@tanstack/react-query';
import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import axios from 'axios';

const useAppQueryClient = () => {
  const dispatch = useAppDispatch();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, retry: 0 },
      mutations: {
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message = (error.response?.data as { errMsg?: string }).errMsg;

            if (message?.includes('로그인')) {
              dispatch(toggleModal({ type: 'signin' }));
              return;
            }
            dispatch(toggleModal({ type: 'basic', message }));
          }
        },
      },
    },
  });

  return queryClient;
};

export default useAppQueryClient;
