import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { userStorage } from 'lib/utils/storage';
import FooterInput from 'common/elements/FooterInput';
import { IconSend } from 'static/Icons/Icons';

interface Props {
  socket: any;
}

const ChatInput = ({ socket }: Props) => {
  const { roomKey } = useParams();
  const userKey = userStorage.getUserKey();

  const [chatInput, setChatInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chatInput.trim().length) return;

    socket.current.emit('chat_message', { message: chatInput, roomKey, userKey });
    setChatInput('');
  };

  return (
    <FooterInput>
      <form onSubmit={handleSendMessage}>
        <input value={chatInput} onChange={handleChange} placeholder="메세지를 입력하세요" />
        <button type="submit">
          <IconSend />
        </button>
      </form>
    </FooterInput>
  );
};

export default ChatInput;
