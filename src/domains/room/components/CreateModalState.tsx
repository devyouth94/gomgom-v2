import { useNavigate } from 'react-router-dom';

import BasicModal from 'common/modal/BasicModal';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';

const CreateModalState = ({ roomKey }: { roomKey: number | undefined }) => {
  const dispatch = useAppDispatch();
  const naviagate = useNavigate();
  const { modalType, message } = useAppSelector((state) => state.modal);

  const handleClickUpload = () => {
    dispatch(toggleModal({ type: 'upload' }));
    naviagate(`/room/${roomKey}`, { replace: true, state: { now: '/room/create' } });
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

export default CreateModalState;
