import Header from 'common/components/Header';
import { userStorage } from 'lib/utils/storage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconBack, IconDelete } from 'static/Icons/Icons';

import DetailInfo from './components/DetailInfo';
import useGetDetail from './hooks/useGetDetail';

const Detail = () => {
  const navigate = useNavigate();
  const { selectKey } = useParams();
  const { state } = useLocation();

  const { data: info, status: infoStatus } = useGetDetail(Number(selectKey));

  return (
    <div>
      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <div />
        {userStorage.getUserKey() === info?.result.userKey && <IconDelete />}
      </Header>

      {infoStatus === 'success' && <DetailInfo info={info.result} />}
    </div>
  );
};

export default Detail;
