import BasicModal from 'common/modal/BasicModal';
import SignInModal from 'common/modal/SignInModal';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';

const RoomModalState = () => {
  const dispatch = useAppDispatch();
  const { modalType, message } = useAppSelector((state) => state.modal);

  return (
    <>
      {modalType.basic && (
        <BasicModal handleClick={() => dispatch(toggleModal({ type: 'basic' }))}>
          {message}
        </BasicModal>
      )}

      {modalType.signin && <SignInModal />}
    </>
  );
};

export default RoomModalState;
