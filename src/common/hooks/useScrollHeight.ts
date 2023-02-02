import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const useScrollHeight = () => {
  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = debounce((event) => {
    const myHeight = event.srcElement.scrollingElement.scrollTop;
    setIsScroll(myHeight > 200);
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScroll;
};

export default useScrollHeight;
