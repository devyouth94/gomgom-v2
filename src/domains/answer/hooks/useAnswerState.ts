import { useState } from 'react';

import instance from 'app/instance';

const useAnswerState = () => {
  const [think, setThink] = useState(false);
  const [answer, setAnswer] = useState('');

  const clickAnswerHandler = async () => {
    if (think) return;

    setThink(true);
    setAnswer('');

    const { data } = await instance.get('/advice');
    setTimeout(() => {
      setAnswer(data.msg);
      setThink(false);
    }, 1000);
  };

  return { think, answer, clickAnswerHandler };
};

export default useAnswerState;
