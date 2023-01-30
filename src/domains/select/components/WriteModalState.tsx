import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import BasicModal from 'common/modal/BasicModal';

const WriteModalState = () => {
  const dispatch = useAppDispatch();
  const naviagate = useNavigate();
  const { modalType, message } = useAppSelector((state) => state.modal);

  const handleClickUpload = () => {
    dispatch(toggleModal({ type: 'upload' }));
    naviagate('/select', { replace: true });
  };

  return (
    <>
      {modalType.basic && (
        <BasicModal handleClick={() => dispatch(toggleModal({ type: 'basic' }))}>
          {message}
        </BasicModal>
      )}

      {modalType.upload && <BasicModal handleClick={handleClickUpload}>{message}</BasicModal>}
    </>
  );
};

export default WriteModalState;
