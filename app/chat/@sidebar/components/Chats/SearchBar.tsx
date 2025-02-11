'use client'
import { useRouter } from 'next/navigation'
import { firestore } from '@/app/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { Plus } from "lucide-react"; // Import the Plus icon
import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const createNewChatroom = async () => {
    if (isCreating) return
    
    setIsCreating(true)
    const createPromise = new Promise(async (resolve, reject) => {
      try {
        const chatroomRef = await addDoc(collection(firestore, 'chatrooms'), {
          name: "New Chat",
          participants: ["user_id"], // Replace with actual user ID when auth is implemented
          createdAt: serverTimestamp(),
        });
        
        // Navigate to the new chatroom
        router.push(`/chat/${chatroomRef.id}`);
        resolve("Chat created successfully!")
      } catch (error) {
        console.error('Error creating chatroom:', error);
        reject(error)
      } finally {
        setIsCreating(false)
      }
    })

    toast.promise(createPromise, {
      loading: 'Creating new chat...',
      success: 'Chat created!',
      error: 'Failed to create chat'
    })
  }

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search chats..."
          className="w-full bg-zinc-700 
                   text-zinc-100 rounded-lg px-4 py-2 pl-10 
                   focus:outline-none focus:ring-1 focus:ring-emerald-600
                   placeholder:text-zinc-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          🔍
        </span>
      </div>
      <button
          className={`p-2 mx-auto bg-emerald-700 
                    hover:bg-emerald-600
                    text-zinc-100 rounded-lg 
                    transition-colors duration-200
                    ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={createNewChatroom}
          disabled={isCreating}
        >
          {isCreating ? (
            <span className="text-xl">...</span>
          ) : (
            <Plus size={24} strokeWidth={2} />
          )}
        </button>
    </div>
  )
}