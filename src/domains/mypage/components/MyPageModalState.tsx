import BasicModal from 'common/modal/BasicModal';
import SignInModal from 'common/modal/SignInModal';

import UserDeleteModal from 'domains/mypage/components/UserDeleteModal';
import LogoutModal from 'domains/mypage/components/LogoutModal';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';

const MypageModalState = () => {
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

      {modalType.delete && <UserDeleteModal />}

      {modalType.logout && <LogoutModal />}
    </>
  );
};

export default MypageModalState;
