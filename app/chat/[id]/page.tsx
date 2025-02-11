'use client';

import { useState, useEffect, useRef } from 'react';
import { use } from 'react';
import { Timestamp } from 'firebase/firestore';
import Chat from '@/app/components/main/Chat';
import ChatInput from '@/app/components/main/ChatInput';
import { firestore } from '@/app/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';


type Message = {
  timestamp: Timestamp;
  sender: string;
  content: string;
  id: string;
};

interface ChatPageProps {
  params: Promise<{ id: string }>
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const [messages, setMessages] = useState<Message[]>([]);  
  const [input, setInput] = useState('');
  const [apiType, setApiType] = useState('huggingface');
  const [loading, setLoading] = useState(false);

  // Firebase listener effect
  useEffect(() => {

    const messagesRef = collection(firestore, 'chatrooms', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          content: data.text || '',
          sender: data.sender,
          timestamp: data.timestamp?.toDate() || new Date(),
        };
      });
      setMessages(fetchedMessages);
      //messagesCache.current = fetchedMessages;
    });  

    return () => unsubscribe();
  }, [id]); // Added id to dependency array

  // Message sending handler
  const handleSendMessage = async () => {
    if (!input || !input.trim()) return;
    
    const message = input.trim();
    setInput('');
    setLoading(true);
    
    try {
      // Add user message to Firestore
      await addDoc(collection(firestore, 'chatrooms', id, 'messages'), {
        text: message,
        timestamp: serverTimestamp(),
        sender: 'user',
      });

      // Update the chatroom document
      await updateDoc(doc(firestore, 'chatrooms', id), {
        lastUpdated: serverTimestamp(),
        lastMessage: "You: " + message,
      });

      // Get bot response
      const response = await fetch('/api/inference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: [{ role: 'user', content: message }],
          apiType 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get bot response');
      }

      const data = await response.json();

      // Add bot message to Firestore
      await addDoc(collection(firestore, 'chatrooms', id, 'messages'), {
        text: data.message,
        timestamp: serverTimestamp(),
        sender: 'bot',
      });

      // Update the chatroom document
      await updateDoc(doc(firestore, 'chatrooms', id), {
        lastUpdated: serverTimestamp(),
        lastMessage: "Bot: " + data.message,
      });

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <div>Loading chatroom...</div>;
  }

  return (
    <div className="flex flex-col h-full z-100">
      <div className="flex-1 overflow-hidden z-90">
        <Chat loading={loading} id={id} messages={messages}/>
      </div>
      <div className="bg-zinc-900/90 backdrop-blur-sm pt-2 pb-2 z-90">
        <ChatInput 
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          apiType={apiType}
          setApiType={setApiType}
        />
      </div>
    </div>
  );
}
