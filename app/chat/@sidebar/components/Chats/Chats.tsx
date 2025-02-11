'use client'
import { useState, useEffect } from 'react'
import { SearchBar } from '..'
import { ChatList } from '..'
import { firestore } from '@/app/lib/firebase'
import { Timestamp } from 'firebase/firestore';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

// You might want to move this interface to a types file
interface Chatroom {
  id: string
  name: string
  lastUpdated?: Timestamp
  lastMessage?: string
  createdAt: Date
  participants: string[]
}


export default function Chats() {
  const [searchQuery, setSearchQuery] = useState('')
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])

  // Fetch chatrooms
  useEffect(() => {
    const q = query(
      collection(firestore, 'chatrooms'),
      orderBy('lastUpdated', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChatrooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Chatroom[]

      setChatrooms(fetchedChatrooms)
    })

    return () => unsubscribe()
  }, [])

  const filteredChatrooms = searchQuery.trim() === '' 
    ? chatrooms 
    : chatrooms.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div className="flex flex-col h-full bg-zinc-850">
      {/* Header */}
      <header className="border-b border-zinc-800/80 p-3.5 bg-zinc-850 sticky top-0 z-60">
        <h1 className="text-2xl font-semibold text-zinc-100 px-2 py-1">Chats</h1>
      </header>

      {/* Search bar */}
      <div className="p-2 pt-0 bg-zinc-850/95">
        <SearchBar 
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
        />
      </div>
    
      {/* Chat list */}
      <div className="flex-1 overflow-y-auto bg-zinc-850/95 
                      scrollbar-thin scrollbar-track-zinc-900/20 
                      scrollbar-thumb-zinc-700/50 hover:scrollbar-thumb-zinc-700">
        <ChatList chats={filteredChatrooms} />
      </div>
    </div>
  )
}