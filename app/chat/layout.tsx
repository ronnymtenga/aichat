// will house the left most navigation column component

import { Toaster } from 'react-hot-toast'

interface DashboardLayoutProps {
  children: React.ReactNode,
  navigation: React.ReactNode,
  sidebar: React.ReactNode
}

const DashboardLayout = function({
  // parameter destructuring of DashboardLayoutProps
  children, 
  navigation,
  sidebar,
}: DashboardLayoutProps) {

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-800/60">

        <div className="flex w-[clamp(600px,100vw,1440px)] h-[clamp(400px,100vh,900px)] 
                    rounded-xl border border-zinc-800 overflow-hidden
                    bg-zinc-900 shadow-2xl shadow-zinc-950/50">

            {/* Toaster - for displaying notifications */}
            <Toaster position="top-center" />
          
            {/* Navigation - fixed width */}
            <div className="w-[60px] flex-shrink-0 border-r border-zinc-800">
              {navigation}
            </div>
            
            {/* Sidebar - fixed width */}
            <div className="w-[320px] flex-shrink-0 border-r border-zinc-800">
              {sidebar}
            </div>

            {/* Main content - takes remaining space */}
            <div className="flex-1">
              {children}
            </div>

        </div>

    </div>
  );
}

export default DashboardLayout