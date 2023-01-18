import styled from 'styled-components';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from 'lib/constants/oAuth';
import { FONT_M } from 'styles/textStyles';
import { IconGoogle, IconKakao } from 'static/Icons/SocialIcons';

const SocialLoginButton = () => {
  return (
    <StContainer>
      <StButton href={KAKAO_AUTH_URL} bgc="#FEE500">
        <IconKakao />
        <span>카카오</span>
      </StButton>

      <StButton href={GOOGLE_AUTH_URL} bgc="#FFF">
        <IconGoogle />
        <span>구글</span>
      </StButton>
    </StContainer>
  );
};

export default SocialLoginButton;

const StContainer = styled.section`
  display: flex;
  gap: 1.6rem;
`;

const StButton = styled.a<{ bgc: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  width: 100%;
  height: 4.8rem;
  background-color: ${(props) => props.bgc};

  border-radius: 2rem;

  span {
    ${FONT_M};
  }
`;
