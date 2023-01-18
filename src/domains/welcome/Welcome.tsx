import { useRef, useState } from 'react';
import styled from 'styled-components';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import Navi from 'domains/welcome/components/Navi';
import LastSlide from 'domains/welcome/components/LastSlide';
import { GomGomAnswer, GomGomRoom, GomGomVote } from 'static/images/GomGom';
import { FONT_EXTRABOLD, FONT_XL } from 'styles/textStyles';
import { IconBack, IconOnboarding } from 'static/Icons/Icons';

const Welcome = () => {
  const [pagination, setPagination] = useState(1);
  const prevNavi = useRef<HTMLDivElement>(null);
  const nextNavi = useRef<HTMLDivElement>(null);

  return (
    <StContainer>
      <Navi pagination={pagination} />

      <StSwiper
        navigation={{ prevEl: prevNavi.current, nextEl: nextNavi.current }}
        onBeforeInit={(swiper: SwiperClass) => {
          if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevNavi.current;
            swiper.params.navigation.nextEl = nextNavi.current;
          }
        }}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(event) => setPagination(event.activeIndex + 1)}
        modules={[Navigation]}
      >
        <StNext ref={nextNavi} page={pagination}>
          <IconOnboarding />
        </StNext>

        <StPrev ref={prevNavi} page={pagination}>
          {pagination === 4 ? <IconBack /> : <IconOnboarding />}
        </StPrev>

        <StSwiperSlide>
          <h2>고민투표</h2>
          <span>
            선택에 어려움이 있나요? <br />
            투표를 열어 고민을 해결해보세요!
          </span>
          <GomGomVote />
        </StSwiperSlide>

        <StSwiperSlide>
          <h2>고민상담</h2>
          <span>
            주변에 말하기 어려운 고민이 있나요? <br />
            익명으로 안심하고 고민을 말할 수 있어요!
          </span>
          <GomGomRoom />
        </StSwiperSlide>

        <StSwiperSlide>
          <h2>곰곰해답</h2>
          <span>
            해결하기 힘든 고민이 있나요? <br />
            곰곰의 명쾌한 해답을 들어보세요!
          </span>
          <GomGomAnswer />
        </StSwiperSlide>

        <StSwiperSlide>
          <LastSlide />
        </StSwiperSlide>
      </StSwiper>
    </StContainer>
  );
};

export default Welcome;

interface Arrow {
  page: number;
}

const StContainer = styled.main`
  height: 100vh;
`;

const StSwiper = styled(Swiper)`
  height: 100%;
`;

const StPrev = styled.div<Arrow>`
  position: absolute;
  top: ${(props) => (props.page !== 4 ? '50%' : '4.8%')};
  left: ${(props) => (props.page !== 4 ? '1.2rem' : '2rem')};
  transform: translateY(-50%);

  display: ${(props) => (props.page !== 1 ? 'block' : 'none')};

  width: 3.2rem;
  height: 3.2rem;

  z-index: 9;
  cursor: pointer;
`;

const StNext = styled(StPrev)<Arrow>`
  top: 50%;
  left: auto;
  right: 1.2rem;

  display: ${(props) => (props.page !== 4 ? 'block' : 'none')};

  svg {
    transform: rotate(180deg);
  }
`;

const StSwiperSlide = styled(SwiperSlide)`
  background-color: transparent;

  > h2 {
    position: absolute;
    top: 8rem;
    left: 4rem;

    ${FONT_XL};
    ${FONT_EXTRABOLD};
  }

  > span {
    position: absolute;
    top: 14rem;
    left: 4rem;

    line-height: 2.4rem;
  }

  > svg {
    position: absolute;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;
