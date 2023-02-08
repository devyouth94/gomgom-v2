import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { userStorage } from 'lib/utils/storage';
import { IconChatting, IconEdit, IconNext, IconPerson, IconVoteTab } from 'static/Icons/Icons';
import { FONT_BOLD } from 'styles/textStyles';

export const QNA_LINK = 'https://forms.gle/daCzxS5nhRZXzrUr9';

const MyService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickService = (path: string) => {
    if (!userStorage.getToken('access')) {
      dispatch(toggleModal({ type: 'signin' }));
    } else {
      navigate(`/mypage/${path}`);
    }
  };

  const handleClickUserDelete = () => {
    if (!userStorage.getToken('access')) {
      dispatch(toggleModal({ type: 'signin' }));
    } else {
      dispatch(toggleModal({ type: 'delete' }));
    }
  };

  return (
    <>
      <StTitle>고민투표</StTitle>
      <StItemContainer>
        <div onClick={() => handleClickService('postvoted')}>
          <IconEdit />
          <span>내가 등록한 고민 투표</span>
          <IconNext />
        </div>

        <div onClick={() => handleClickService('voted')}>
          <IconVoteTab />
          <span>내가 투표한 고민 투표</span>
          <IconNext />
        </div>
      </StItemContainer>

      <StTitle>고민상담</StTitle>
      <StItemContainer>
        <div onClick={() => handleClickService('maderoom')}>
          <IconEdit />
          <span>내가 만든 고민 상담방</span>
          <IconNext />
        </div>

        <div onClick={() => handleClickService('operatingroom')}>
          <IconChatting />
          <span>대화중인 고민 상담방</span>
          <IconNext />
        </div>
      </StItemContainer>

      <StTitle>고객센터</StTitle>
      <StItemContainer>
        <a href={QNA_LINK} target="_blank" rel="noreferrer">
          <IconEdit />
          <span>1 : 1 문의</span>
          <IconNext />
        </a>

        <div onClick={handleClickUserDelete}>
          <IconPerson />
          <span>회원 탈퇴</span>
          <IconNext />
        </div>
      </StItemContainer>
    </>
  );
};

export default MyService;

const StTitle = styled.span`
  display: block;
  margin-top: 3.2rem;

  ${FONT_BOLD};
  color: ${({ theme }) => theme.color.SUB_2};
`;

const StItemContainer = styled.article`
  margin-top: 1.6rem;
  background-color: ${({ theme }) => theme.color.WHITE};

  border-radius: 2rem;

  div,
  a {
    display: grid;
    grid-template-columns: 3.25rem auto 2.4rem;
    align-items: center;

    height: 5.2rem;
    padding: 0 0.8rem 0 1.6rem;

    cursor: pointer;

    span {
      margin-left: 1rem;
    }
  }
`;
