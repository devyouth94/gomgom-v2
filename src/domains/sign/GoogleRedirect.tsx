import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Main from 'common/components/Main';
import FullLogo from 'common/elements/FullLogo';

import instance from 'app/instance';
import { userStorage } from 'lib/utils/storage';

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const googleLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/google/callback?code=${code}`);
      userStorage.setStorage(data.user);
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    googleLogin();
  }, [googleLogin]);

  return (
    <StMain>
      <FullLogo />
    </StMain>
  );
};

export default GoogleRedirect;

const StMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
