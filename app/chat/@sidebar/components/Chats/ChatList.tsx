'use client'
import { useRouter } from 'next/navigation'
import { Timestamp } from 'firebase/firestore';

interface Chat {
  id: string
  name: string
  lastMessage?: string
  lastUpdated?: Timestamp  // Change this from Date to Timestamp
  createdAt: Date
  participants: string[]
}

interface ChatListProps {
  chats: Chat[]
}

export default function ChatList({ chats }: ChatListProps) {
  const router = useRouter()

  const handleChatSelect = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

  if (chats.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 p-4">
        No chats found
      </div>
    )
  }

  return (
    <div className="space-y-1 scrollbar-hidden">

      {chats.map((chat) => (
        <button 
          key={chat.id}
          onClick={() => handleChatSelect(chat.id)}
          className="flex w-full h-[72px] px-4 py-3 text-left hover:bg-zinc-800 transition-colors items-center border-b border-zinc-700"
        >
          {/* Avatar - Fixed size */}
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-zinc-700 flex items-center justify-center text-lg mr-3">
            👤
          </div>

          {/* Chat Details - Flexible width with min/max constraints */}
          <div className="flex-1 min-w-0 max-w-full mr-3">
            <p className="text-white font-medium truncate">{chat.name}</p>
            <p className="text-sm text-gray-400 truncate">
              {chat.lastMessage}
            </p>
          </div>

          {/* Timestamp - Fixed width */}
          <div className="w-[48px] text-xs text-gray-500 flex-shrink-0">
            {chat.lastUpdated 
              ? chat.lastUpdated.toDate().toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })
              : new Date().toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })
            }
          </div>
        </button>
      ))}

    </div>
  )
}