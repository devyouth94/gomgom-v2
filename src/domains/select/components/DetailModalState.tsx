import BasicModal from 'common/modal/BasicModal';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import SignInModal from 'common/modal/SignInModal';

const DetailModalState = () => {
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

export default DetailModalState;
