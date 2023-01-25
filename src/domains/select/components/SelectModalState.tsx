import SignInModal from 'common/modal/SignInModal';
import WriteModal from 'domains/select/components/WriteModal';

import { useAppSelector } from 'app/config/hooks';

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
