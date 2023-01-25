import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

const useScrollHeight = () => {
  const [isScroll, setIsScroll] = useState(false);

  const scrollEvent = useDebounce(() => {
    const myHeight = 0;
    setIsScroll(myHeight > 200);
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => window.removeEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  return isScroll;
};

export default useScrollHeight;
