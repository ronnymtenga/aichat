'use client';

import { useState } from 'react';
import { useSidebarStore } from '../stores/useSidebarStore';
import Link from 'next/link';

export default function Navigation() {
  const setView = useSidebarStore((state) => state.setView);
  const [activeSection, setActiveSection] = useState<string|null>('chats');

  const navigationItems = [
    { 
      id: 'chats', 
      href: '/chat', 
      icon: '💬',
      sidebarView: 'chats' as const
    },
    { 
      id: 'network', 
      href: '/network', 
      icon: '🌐',
      sidebarView: 'network' as const
    },
    { 
      id: 'settings', 
      href: '/settings', 
      icon: '⚙️',
      sidebarView: 'settings' as const
    }
  ];

  return (
    <div className="h-full flex flex-col bg-zinc-900 py-4">
      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`
              w-12 h-12 
              flex items-center justify-center 
              rounded-lg
              transition-all duration-200 ease-in-out
              hover:bg-zinc-800/80 
              hover:text-white
              hover:scale-105
              active:bg-zinc-700
              active:text-white
              active:shadow-lg
              text-zinc-400
            `}
            onClick={() => {
              setActiveSection(item.id); // Set active state instead of nulling it
              setView(item.sidebarView);
            }}
          >
            <span className="text-xl">{item.icon}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section - Profile/Settings */}
      <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-center">
        <Link
          href="/profile"
          className={`
            w-12 h-12 
            flex items-center justify-center 
            rounded-lg
            transition-all duration-200 ease-in-out
            hover:bg-zinc-800/80 
            hover:text-white
            hover:scale-105
            text-zinc-400
            mb-2
          `}
        >
          <span className="text-xl">👤</span>
        </Link>
      </div>
    </div>
  );
}
