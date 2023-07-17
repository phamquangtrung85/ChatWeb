"use client";

import useConversation from '@/app/hook/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useState, useRef, useEffect } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';

interface IBodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<IBodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div
        ref={bottomRef} 
        className="pt-24"/>
    </div>
  )
}

export default Body