import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import type { ChatProps } from 'lib/constants/types';

const useChatScroll = (chat: ChatProps[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = debounce((event) => {
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = window.innerHeight;
    const myHeight = event.srcElement.scrollingElement.scrollTop;

    setScrollState(totalHeight <= scrollHeight + myHeight + 200);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  useEffect(() => {
    if (!scrollState) return;
    scrollRef.current?.scrollIntoView();
  }, [chat, scrollState]);

  return { scrollRef, scrollState };
};

export default useChatScroll;
