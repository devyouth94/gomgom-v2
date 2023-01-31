import styled from 'styled-components';

import { RoomItemProps } from 'lib/constants/types';
import { IconAnnounce, IconAnnounced, IconPerson } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_M, FONT_S } from 'styles/textStyles';

interface Props {
  room: RoomItemProps;
  entered?: (number | undefined)[];
  handleJoin: any;
}

const RoomItem = ({ room, entered, handleJoin }: Props) => {
  return (
    <StContainer onClick={() => handleJoin(room.roomKey)} cur={room.currentPeople} max={room.max}>
      <StHeader cur={room.currentPeople} max={room.max}>
        {room.currentPeople === room.max ? <IconAnnounced /> : <IconAnnounce />}
        <span>{room.title}</span>
      </StHeader>

      <StBody cur={room.currentPeople} max={room.max}>
        {room.hashTag?.map((item) => (
          <span key={item}>#{item}</span>
        ))}
      </StBody>

      <StFooter>
        <div>
          <IconPerson />
          <span>
            {room.currentPeople}/{room.max} 명
          </span>
          {entered?.includes(room.roomKey) && <span>상담 참여중</span>}
        </div>

        <div>
          작성자 <span>{room.host}</span>
        </div>
      </StFooter>
    </StContainer>
  );
};

export default RoomItem;

interface StyledProps {
  cur: number;
  max: number;
}

const StContainer = styled.article<StyledProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 11.4rem;
  padding: 1.6rem;
  background-color: ${(props) =>
    props.cur === props.max ? props.theme.color.SUB_4 : props.theme.color.WHITE};
  border-radius: 2rem;

  cursor: pointer;
`;

const StHeader = styled.div<StyledProps>`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;

  display: flex;
  align-items: center;
  gap: 0.2rem;

  span {
    ${FONT_BOLD};
    line-height: 2.1rem;
    color: ${(props) =>
      props.cur === props.max ? props.theme.color.SUB_2 : props.theme.color.BLACK};
  }
`;

const StBody = styled.div<StyledProps>`
  position: absolute;
  top: 4.1rem;
  left: 1.6rem;

  display: flex;
  gap: 0.6rem;

  span {
    height: 100%;
    padding: 0 0.5rem;
    background-color: ${(props) => (props.cur === props.max ? '#D8D0C5' : props.theme.color.SUB_4)};

    border-radius: 1rem;

    ${FONT_S};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.SUB_2};
  }
`;

const StFooter = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;

  > div:nth-child(1) {
    position: absolute;
    bottom: 1.6rem;
    left: 1.6rem;

    display: flex;
    align-items: center;
    gap: 0.25rem;

    ${FONT_M};
    line-height: 2.1rem;
    color: ${({ theme }) => theme.color.SUB_2};

    > span:nth-child(3) {
      height: 100%;
      padding: 0 0.5rem;
      background-color: ${({ theme }) => theme.color.SUB_2};

      border-radius: 1rem;

      ${FONT_S};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.WHITE};
    }
  }

  > div:nth-child(2) {
    position: absolute;
    bottom: 1.6rem;
    right: 1.6rem;

    ${FONT_S};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.SUB_2};

    span {
      ${FONT_BOLD};
    }
  }
`;
