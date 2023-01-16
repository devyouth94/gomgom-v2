import {
  StBackground,
  StButtonContainer,
  StModalContainer,
  StTextContainer,
  StWindow,
} from 'common/modal/modalStyles';

interface Props {
  children: string | React.ReactNode;
  handleClick: () => void;
}

const BasicModal = ({ children, handleClick }: Props) => {
  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>{children}</span>
        </StTextContainer>
        <StButtonContainer>
          <button onClick={handleClick}>확인</button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClick} />
    </StModalContainer>
  );
};

export default BasicModal;
