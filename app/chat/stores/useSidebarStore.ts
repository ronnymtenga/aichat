// This is a simple state store that manages the sidebar view.

import { create } from 'zustand'

// A type is a set of values and a set of operations that 
// can be performed on those values. A type can be a primitive
// type like a string or number, or a composite type like an
// object or an array. TypeScript is a statically typed language,
// which means that the type of a variable is known at compile time.
// The type of a variable determines what kind of data it can hold.
// The type alias is used to give a type a name. This is used for
// the type annotations of the parameters of the function.


// Define the sidebar view type as union of string literal types
// The sidebar can have 4 views: chats, settings, profile, network
// This is an example of a union type in TypeScript
type SidebarView = 'chats' | 'settings' | 'profile' | 'network'

// This the structure of the SidebarStore. It stores one state variable,
// view of type SidebarView, and one function, setView, that takes the next
// view of type SidebarView, and sets the state variable view to that value.
interface SidebarStore {
  //The view field is a string literal union type defined above
  view: SidebarView 
  // set function : (parameter: type annotation) => return type annotation
  setView: (view: SidebarView) => void
}

// Creates a Zustand state store for managing sidebar state
// - Uses SidebarStore interface to enforce type safety
// - Maintains current view state ('chats', 'settings', 'profile', 'network')
// - Provides setView function to update the current view
// Usage: const { view, setView } = useSidebarStore()
export const useSidebarStore = create<SidebarStore>((set) => ({
  view: 'chats',
  setView: (view) => set({ view })
}))