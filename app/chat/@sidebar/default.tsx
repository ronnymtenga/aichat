'use client'
import { useSidebarStore } from '../stores/useSidebarStore'
import { Chats } from './components/index';
//import { NetworkManager } from '../components/index';
//import { Profile } from '../components/index';
//import { Settings } from '../components/index';



export default function Sidebar() {
  const view = useSidebarStore((state) => state.view)
  
  return (
    <div className="h-full border-l border-zinc-800 bg-zinc-900">
      {view === 'chats' && <Chats />}
      {/*view === 'network' && <NetworkManager />*/}
      {/*view === 'profile' && <Profile />*/}
      {/*view === 'settings' && <Settings />*/}
    </div>

  )
}