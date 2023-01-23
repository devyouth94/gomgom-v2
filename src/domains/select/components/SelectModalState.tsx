import { useAppSelector } from 'app/config/hooks';
import SignInModal from 'common/modal/SignInModal';
import WriteModal from './WriteModal';

const SelectModalState = () => {
  const { modalType } = useAppSelector((state) => state.modal);

  return (
    <>
      {modalType.signin && <SignInModal />}
      {modalType.write && <WriteModal />}
    </>
  );
};

export default SelectModalState;
