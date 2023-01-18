import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import BasicModal from 'common/modal/BasicModal';

const SignModalState = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { modalType, message } = useAppSelector((state) => state.modal);

  return (
    <>
      {modalType.signup && (
        <BasicModal handleClick={() => navigate('/signin', { replace: true })}>
          회원가입을 완료했습니다
        </BasicModal>
      )}

      {modalType.basic && (
        <BasicModal handleClick={() => dispatch(toggleModal({ type: 'basic' }))}>
          {message}
        </BasicModal>
      )}
    </>
  );
};
export default SignModalState;
