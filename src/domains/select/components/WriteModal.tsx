import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toggleModal } from 'app/module/modalSlice';
import {
  StBackground,
  StTitleContainer,
  StTextContainer,
  StButtonContainer,
  StModalContainer,
  StWindow,
} from 'common/modal/modalStyles';

const WriteModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickWrite = () => {
    dispatch(toggleModal({ type: 'write' }));
    navigate('/select/write');
  };

  const handleClick = () => {
    dispatch(toggleModal({ type: 'write' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTitleContainer>고민투표 만들기</StTitleContainer>
        <StTextContainer>
          <span>
            투표는 <span style={{ fontWeight: '700' }}>5분 당 1회</span>만 작성할 수 있습니다.
            <br />
            투표를 작성하시겠습니까?
          </span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleClickWrite}>
            투표 작성
          </button>
          <button type="button" onClick={handleClick}>
            취소
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClick} />
    </StModalContainer>
  );
};

export default WriteModal;
