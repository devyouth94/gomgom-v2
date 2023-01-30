import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import instance from 'app/instance';
import { toggleModal } from 'app/module/modalSlice';
import {
  StBackground,
  StTextContainer,
  StButtonContainer,
  StModalContainer,
  StWindow,
} from 'common/modal/modalStyles';
import { useMutation } from '@tanstack/react-query';

const DeleteModal = ({ now }: { now: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectKey } = useParams();

  const { mutate: deleteSelect } = useMutation(
    () => {
      return instance.delete(`/select/${selectKey}`);
    },
    {
      onSuccess: () => {
        dispatch(toggleModal({ type: 'delete' }));
        navigate(`${now}`, { replace: true });
      },
    },
  );

  const handleClick = () => {
    dispatch(toggleModal({ type: 'delete' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>정말 투표를 삭제할까요?</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={() => deleteSelect()}>
            삭제
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

export default DeleteModal;
