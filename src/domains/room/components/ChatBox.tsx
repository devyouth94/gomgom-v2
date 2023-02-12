import styled from 'styled-components';

import Main from 'common/components/Main';
import ProfileImg from 'common/elements/ProfileImg';

import useChatScroll from 'domains/room/hooks/useChatScroll';
import type { ChatProps } from 'lib/constants/types';
import { nowTime } from 'lib/utils/timeCalculation';
import { userStorage } from 'lib/utils/storage';
import { IconDropdown } from 'static/Icons/Icons';
import { FONT_M, FONT_S, FONT_XS } from 'styles/textStyles';

interface Props {
  chat: ChatProps[];
}

const ChatBox = ({ chat }: Props) => {
  const userKey = userStorage.getUserKey();
  const { scrollRef, scrollState } = useChatScroll(chat);

  const divideMessageType = (key: number) => {
    if (key === 12) {
      return 'system';
    } else if (key === userKey) {
      return 'right';
    } else {
      return 'left';
    }
  };

  const isSameTime = (idx: number) => {
    return (
      chat[idx]?.userKey === chat[idx - 1]?.userKey &&
      nowTime(String(chat[idx]?.createdAt)) === nowTime(String(chat[idx - 1]?.createdAt))
    );
  };

  return (
    <>
      {!scrollState && (
        <StNewMessage>
          <div onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            <span>마지막 메세지</span>
            <IconDropdown />
          </div>
        </StNewMessage>
      )}

      <StMain>
        {chat.map((item, idx) => (
          <StChat key={idx}>
            <div className={divideMessageType(item.userKey)}>
              {/* 시스템 메세지 */}
              {item.userKey === 12 && <div className="chat">{item.chat}</div>}

              {/* 유저 메세지 */}
              {item.userKey !== 12 && !isSameTime(idx) && (
                <>
                  <ProfileImg className="img" point={item.User.point} size="4rem" />
                  <div>
                    <div className="nickname">
                      {item.userKey === userKey ? '' : item.User?.nickname}
                    </div>
                    <div className="middle">
                      <div className="chat">{item.chat}</div>
                      <span className="time">{nowTime(String(item.createdAt))}</span>
                    </div>
                  </div>
                </>
              )}

              {/* 같은 시간에 온 유저 메세지 */}
              {item.userKey !== 12 && isSameTime(idx) && (
                <div className="sametime">
                  <div className="chat">{item.chat}</div>
                </div>
              )}
            </div>
          </StChat>
        ))}
        <div ref={scrollRef} />
      </StMain>
    </>
  );
};

export default ChatBox;

const StMain = styled(Main)`
  padding-top: 11rem;
  padding-bottom: 8rem;
`;

const StNewMessage = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10rem;

  display: flex;
  justify-content: center;
  width: 100%;

  z-index: 9;

  div {
    display: flex;
    align-items: center;

    height: 3.2rem;
    padding: 0.3rem 0.6rem 0.3rem 1rem;
    background-color: ${({ theme }) => theme.color.WHITE};
    border-radius: 1.6rem;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

    cursor: pointer;

    span {
      ${FONT_S};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.SUB_2};
    }
  }
`;

const StChat = styled.article`
  display: flex;

  width: 100%;
  height: 100%;

  //시스템 메세지 CSS
  .system {
    display: inline-block;

    height: 2.6rem;
    padding: 3px 6px;
    margin: 1.2rem auto;
    background-color: ${({ theme }) => theme.color.SUB_3};

    border-radius: 1.3rem;

    .chat {
      ${FONT_S};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.WHITE};
    }
  }

  //나의 채팅 CSS
  .right {
    display: flex;
    flex-direction: row-reverse;

    width: 100%;
    height: 100%;
    margin: 1.2rem 0;

    .img {
      margin-left: 0.8rem;
    }

    .nickname {
      height: 2rem;
      text-align: end;
      ${FONT_S};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.SUB_2};
    }

    .middle {
      display: flex;
      flex-direction: row-reverse;
    }

    .sametime {
      margin-top: -1.2rem;
      margin-right: 4.8rem;
    }

    .chat {
      display: inline-block;

      max-width: 21.3rem;
      padding: 1rem;
      background-color: ${({ theme }) => theme.color.MAIN_2};

      border-radius: 2rem 0.4rem 2rem 2rem;

      ${FONT_M};
      line-height: 2.1rem;
      color: ${({ theme }) => theme.color.WHITE};

      word-wrap: break-word;
      word-break: break-all;
    }

    .time {
      margin-right: 1rem;
      margin-top: auto;

      ${FONT_XS};
      line-height: 1.8rem;
      color: ${({ theme }) => theme.color.SUB_3};
    }
  }

  //다른 사람의 채팅 CSS
  .left {
    display: flex;

    width: 100%;
    height: 100%;
    margin: 1.2rem 0;

    .img {
      margin-right: 0.8rem;
    }

    .nickname {
      ${FONT_S};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.SUB_2};
    }

    .middle {
      display: flex;
    }

    .sametime {
      margin-top: -1.2rem;
      margin-left: 4.8rem;
    }

    .chat {
      display: inline-block;

      max-width: 21.3rem;
      padding: 1rem;
      background-color: ${({ theme }) => theme.color.WHITE};

      border-radius: 0.4rem 2rem 2rem 2rem;

      ${FONT_M};
      line-height: 2.1rem;

      word-wrap: break-word;
      word-break: break-all;
    }

    .time {
      margin-left: 1rem;
      margin-top: auto;

      ${FONT_XS};
      line-height: 1.8rem;
      color: ${({ theme }) => theme.color.SUB_3};
    }
  }
`;
