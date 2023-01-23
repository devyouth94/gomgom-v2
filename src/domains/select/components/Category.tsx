import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { changeSelected } from 'app/module/selectSlice';
import useDropdown from 'domains/select/hooks/useDropdown';
import { CATEGORY_ARR, FILTER_ARR } from 'lib/constants/arr';
import { IconDropdown } from 'static/Icons/Icons';
import styled from 'styled-components';
import { FONT_M } from 'styles/textStyles';

interface Props {
  length: number;
}

const Category = ({ length }: Props) => {
  const dispatch = useAppDispatch();
  const { filter, category, proceeding } = useAppSelector((state) => state.select.selected);

  const [isOpenFilter, dropFilterRef, handleClickFilter] = useDropdown();
  const [isOpenCategory, dropCategoryRef, handleClickCategory] = useDropdown();
  const [isOpenProceeding, dropProceedingRef, handleClickProceeding] = useDropdown();

  const handleClickSelected = (value: string, item: string) => {
    dispatch(changeSelected({ value, item }));
  };

  return (
    <StContainer length={length}>
      <StMenu onClick={handleClickFilter} ref={dropFilterRef}>
        <span>{filter}</span>
        <IconDropdown />
        <StDown isOpen={isOpenFilter}>
          {FILTER_ARR.map((item) => (
            <span key={item} onClick={() => handleClickSelected('filter', item)}>
              {item}
            </span>
          ))}
        </StDown>
      </StMenu>

      <StMenu onClick={handleClickCategory} ref={dropCategoryRef}>
        <span>{category}</span>
        <IconDropdown />
        <StDown isOpen={isOpenCategory}>
          {CATEGORY_ARR.map((item) => (
            <span key={item} onClick={() => handleClickSelected('category', item)}>
              {item}
            </span>
          ))}
        </StDown>
      </StMenu>

      <StMenu onClick={handleClickProceeding} ref={dropProceedingRef}>
        <span>{proceeding}</span>
        <IconDropdown />
        <StDown isOpen={isOpenProceeding}>
          {['모든 투표', '진행중인 투표'].map((item) => (
            <span key={item} onClick={() => handleClickSelected('proceeding', item)}>
              {item}
            </span>
          ))}
        </StDown>
      </StMenu>
    </StContainer>
  );
};

export default Category;

const StContainer = styled.section<{ length: number }>`
  position: sticky;
  top: 6.4rem;

  display: flex;
  align-items: flex-start;
  gap: 2.5rem;

  width: 100%;
  height: 4.2rem;
  padding: 0.4rem 2rem 0 2rem;
  background-color: ${({ theme }) => theme.color.BG};

  border-bottom: ${(props) => (props.length ? null : `1px solid ${props.theme.color.SUB_4}`)};

  z-index: 9;
`;

const StMenu = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  span {
    ${FONT_M};
    color: ${({ theme }) => theme.color.SUB_2};
  }
`;

const StDown = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 9rem;

  display: flex;
  flex-direction: column;

  background-color: #fff;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 1rem;

  transform-origin: center top;
  transition-duration: 0.1s;
  transform: scaleY(${(props) => (props.isOpen ? 1 : 0)});

  span {
    display: block;

    height: 3rem;
    padding: 0 1.5rem;

    line-height: 3rem;

    &:hover,
    &:active {
      color: ${({ theme }) => theme.color.MAIN_2};
    }
  }
`;
