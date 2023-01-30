import { useLocation } from 'react-router-dom';

import BasicModal from 'common/modal/BasicModal';
import SignInModal from 'common/modal/SignInModal';
import DeleteModal from 'domains/select/components/DeleteModal';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import type { LocationState } from 'lib/constants/types';

const DetailModalState = () => {
  const dispatch = useAppDispatch();
  const { modalType, message } = useAppSelector((state) => state.modal);

  const { state } = useLocation() as LocationState;

  return (
    <>
      {modalType.basic && (
        <BasicModal handleClick={() => dispatch(toggleModal({ type: 'basic' }))}>
          {message}
        </BasicModal>
      )}

      {modalType.signin && <SignInModal />}

      {modalType.delete && <DeleteModal now={state.now} />}
    </>
  );
};

export default DetailModalState;
