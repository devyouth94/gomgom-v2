import { useMutation } from '@tanstack/react-query';

import instance from 'app/instance';
import { toggleModal } from 'app/module/modalSlice';
import { useAppDispatch } from 'app/config/hooks';
import {
  StTextContainer,
  StButtonContainer,
  StWindow,
  StBackground,
  StModalContainer,
} from 'common/modal/modalStyles';
import { userStorage } from 'lib/utils/storage';

const UserDeleteModal = () => {
  const dispatch = useAppDispatch();
  const { mutate: deleteUser } = useMutation(() => instance.delete('/user/del'), {
    onSuccess: () => {
      userStorage.clearStorage();
      dispatch(toggleModal({ type: 'delete' }));
      window.location.reload();
      dispatch(toggleModal({ type: 'basic', message: '회원 탈퇴가 완료됐습니다.' }));
    },
  });

  const handleClickDelete = () => {
    deleteUser();
  };

  const handleClick = () => {
    dispatch(toggleModal({ type: 'delete' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>정말 회원 탈퇴를 하시겠습니까?</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleClickDelete}>
            회원 탈퇴
          </button>
          <button type="button" onClick={handleClick}>
            취소
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClick} />
    </StModalContainer>
  );
};

export default UserDeleteModal;
