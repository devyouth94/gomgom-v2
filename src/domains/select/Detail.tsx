import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import DetailInfo from 'domains/select/components/DetailInfo';
import DetailVote from 'domains/select/components/DetailVote';
import DetailModalState from 'domains/select/components/DetailModalState';

import useGetDetail from 'domains/select/hooks/useGetDetail';
import { userStorage } from 'lib/utils/storage';
import { IconBack, IconDelete } from 'static/Icons/Icons';

const Detail = () => {
  const navigate = useNavigate();
  const { selectKey } = useParams();
  const { state } = useLocation();

  const { data: info, status: infoStatus } = useGetDetail(Number(selectKey));

  return (
    <>
      <DetailModalState />

      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <div />
        {userStorage.getUserKey() === info?.result.userKey && <IconDelete />}
      </Header>

      <StMain>
        {infoStatus === 'success' && (
          <>
            <DetailInfo info={info.result} />
            <DetailVote options={info.result.options} image={info.result.image} />
          </>
        )}
      </StMain>
    </>
  );
};

export default Detail;

const StMain = styled(Main)`
  padding-top: 6.4rem;
  padding-bottom: 6.4rem;
`;
