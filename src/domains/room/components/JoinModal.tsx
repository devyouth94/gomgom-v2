import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import ProfileImg from 'common/elements/ProfileImg';
import GlobalButton from 'common/elements/GlobalButton';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import type { RoomInfoProps } from 'lib/constants/types';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_L, FONT_M } from 'styles/textStyles';
import { IconCloseWhite } from 'static/Icons/Icons';

interface Props {
  roomInfo: RoomInfoProps;
  entered: (number | undefined)[];
}

const JoinModal = ({ roomInfo, entered }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StBackground>
      <StHeader>
        <IconCloseWhite handleClick={() => dispatch(toggleModal({ type: 'join' }))} />
      </StHeader>

      <StBody>
        <StSubTitle>고민상담방</StSubTitle>
        <StTitle>{roomInfo.title}</StTitle>
        <StHashTag>
          {roomInfo.hashTag?.map((item) => (
            <div key={item}>#{item}</div>
          ))}
        </StHashTag>

        <StFooter>
          <ProfileImg point={roomInfo.point} />
          <div>
            <span>{roomInfo.host}</span>
            <span>
              참여자 {roomInfo.currentPeople}/{roomInfo.max} 명
            </span>
          </div>
        </StFooter>
      </StBody>

      <StGlobalButton
        onClick={() => {
          navigate(`/room/${roomInfo.roomKey}`, { state: { now: pathname } });
        }}
      >
        {entered.includes(roomInfo.roomKey) ? '참여중인 상담방' : '상담방 참여하기'}
      </StGlobalButton>
    </StBackground>
  );
};

export default JoinModal;

const StHeader = styled(Header)`
  background-color: transparent;
`;

const StBackground = styled.section`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #575553;

  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;

  z-index: 99;
`;

const StBody = styled.article`
  position: absolute;
  bottom: 13.6rem;

  width: 100%;

  ${FONT_M};
  color: ${({ theme }) => theme.color.WHITE};
`;

const StSubTitle = styled.div`
  line-height: 2.1rem;
`;

const StTitle = styled.div`
  ${FONT_L};
  ${FONT_EXTRABOLD};
  line-height: 3rem;
`;

const StHashTag = styled.div`
  display: flex;
  gap: 0.8rem;

  margin-top: 1.6rem;

  ${FONT_BOLD};
  line-height: 2.1rem;
`;

const StFooter = styled.div`
  display: grid;
  grid-template-columns: 4rem auto;
  align-items: center;
  gap: 1rem;

  margin-top: 4rem;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;

    line-height: 2.1rem;

    span:nth-child(1) {
      ${FONT_BOLD};
    }
  }
`;

const StGlobalButton = styled(GlobalButton)`
  position: absolute;
  bottom: 9.6rem;
`;
