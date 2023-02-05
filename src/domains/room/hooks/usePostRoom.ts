import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import instance from 'app/instance';
import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { RoomInfoProps } from 'lib/constants/types';

const getRoomInfo = async (roomKey: number) => {
  const { data } = await instance.post<{ result: RoomInfoProps }>(`/room/${roomKey}`);

  return data.result;
};

const usePostRoom = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useMutation(getRoomInfo, {
    onSuccess: (data) => {
      if (pathname === '/room') {
        dispatch(toggleModal({ type: 'join' }));
      } else {
        navigate(`/room/${data.roomKey}`, { state: { now: pathname }, replace: true });
      }
    },
  });
};

export default usePostRoom;
