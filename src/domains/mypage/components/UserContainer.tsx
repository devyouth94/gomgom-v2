import { useState } from 'react';
import styled from 'styled-components';

import ProfileImg from 'common/elements/ProfileImg';
import Badge from 'domains/mypage/components/Badge';

import usePutMyNickname from 'domains/mypage/hooks/usePutMyNickname';
import { userStorage } from 'lib/utils/storage';
import { IconChange } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_L, FONT_M, FONT_XS } from 'styles/textStyles';

interface Props {
  point?: number;
}

const UserContainer = ({ point = 0 }: Props) => {
  const { mutate: putNickname } = usePutMyNickname();

  const [isEdit, setIsEdit] = useState(false);
  const [editNickname, setEditNickname] = useState('');

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
    setEditNickname(userStorage.getNickname());
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickname(event.target.value);
  };

  const handleSubmitNickname = () => {
    putNickname(editNickname);
    setIsEdit(false);
  };

  return (
    <StUserContainer>
      <ProfileImg point={point} />

      <div>
        <Badge point={point} />

        {isEdit ? (
          <StEdit>
            <input type="text" value={editNickname} onChange={handleOnChange} />
            <span>*한글, 영문, 숫자로만 2~10자로 입력해주세요</span>
            <StButton onClick={handleSubmitNickname}>변경</StButton>
            <StButton onClick={handleEdit}>취소</StButton>
          </StEdit>
        ) : (
          <StBasic>
            <span>{userStorage.getNickname()}</span>
            <span>님</span>
            <StButton onClick={handleEdit}>
              <IconChange />
              <span>변경</span>
            </StButton>
          </StBasic>
        )}
      </div>
    </StUserContainer>
  );
};

export default UserContainer;

const StUserContainer = styled.section`
  display: grid;
  grid-template-columns: 6rem auto;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
`;

const StEdit = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  height: 3.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.SUB_4};

  input {
    width: 100%;

    ${FONT_L};
    ${FONT_EXTRABOLD};

    &:focus {
      outline: none;
    }
  }

  span {
    position: absolute;
    top: 4rem;
    left: 0.4rem;

    ${FONT_XS};
    ${FONT_BOLD};
  }
`;

const StBasic = styled.div`
  display: flex;
  align-items: center;

  height: 3.6rem;

  > span:nth-child(1) {
    ${FONT_L};
    ${FONT_EXTRABOLD};
  }

  > span:nth-child(2) {
    margin-left: 0.3rem;
    ${FONT_L}
  }
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  min-width: 5rem;
  height: 3rem;
  margin-left: 0.8rem;
  background-color: ${({ theme }) => theme.color.SUB_4};

  border-radius: 1.8rem;

  ${FONT_M};
  ${FONT_BOLD};
`;
