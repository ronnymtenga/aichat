import { create } from 'zustand'

// Define the type of the ChatStore
 type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed"

 type Message = {
    content: string,
    status: MessageStatus,
    sender: string,
    timestamp: Date,
    id: string
 } 

 interface ChatStore {
    // meesages in the chat
    messages: Message[],
    // function to add a message to the chat
    addMessage: (message: Message) => void,
    // function to add a batch of messages to the chat
    addMessages: (messages: Message[]) => void,
    // function to update the status of a message
    updateMessageStatus: (status: MessageStatus, id?: string) => void
    // function to update the messages in the chat
    updateMessages: (updater: (prev: Message[]) => Message[]) => void,
 }

 // Now I need to create and export a zustand state store
 // object that mearges with the ChatStore interface defined 
 // above. The object will have methods for probing and managing 
 // its state properties (the state of the chat)

 // We use the create function from zustand to create the state store.
 // The create function takes a function as an argument, that can
 // receive a set, get and/or storeApi function as an argument and 
 // returns a state store object (usually with initial state values)
 // that we export and use in our components

 export const useChatStore = 
        create<ChatStore>((set) => ({

                        messages: [],

                        addMessage: (msg: Message) => {
                            // The set function is used to update a state of the store 
                            // in this case the messages array. It takes a function as an
                            // argument that receives the current state and returns the
                            // new state. The new state is merged with the current state
                            // thus updating the store. (state) is the current state of the store
                            set((state) => ({ messages : [...state.messages, msg] }))
                        },

                        addMessages: (msgs: Message[]) => {
                            set((state) => ({ messages : [...state.messages, ...msgs] }))
                        },

                        updateMessages: (updater) => {
                            set((state) => ({ messages : updater(state.messages) }))
                        },

                        updateMessageStatus: (sts,id) => {
                            if (id) {
                                switch (sts) {
                                    case "sent": 
                                        set((state) => ({
                                            messages: state.messages.map((msg) => 
                                                msg.id === id && msg.status === "sending" ? { ...msg, status: sts } : msg
                                            )
                                        }));
                                        break;
                                    case "delivered":
                                        set((state) => ({
                                            messages: state.messages.map((msg) => 
                                                msg.id === id && msg.status === "sent" ? { ...msg, status: sts } : msg
                                            )
                                        }));
                                        break;
                                    case "read":
                                        set((state) => ({
                                            messages: state.messages.map((msg) => 
                                                msg.id === id && msg.status === "delivered" ? { ...msg, status: sts } : msg
                                            )
                                        }));
                                        break;
                                    case "sending":
                                        set((state) => ({
                                            messages: state.messages.map((msg) => 
                                                msg.id === id && !msg.status ? { ...msg, status: sts } : msg
                                            )
                                        }));
                                        break;
                                    case "failed":
                                        set((state) => ({
                                            messages: state.messages.map((msg) => 
                                                msg.id === id && msg.status === "sending" ? { ...msg, status: sts } : msg
                                            )
                                        }));
                                        break;
                                }
                                return;
                            }
                            switch (sts) {

                                case("sent"):{  
                                            set((state) => {
                                            // map over the messages array and update the status of the
                                            // message that is being sent
                                            return {
                                                messages: state.messages.map((msg) => {
                                                    if (msg.status === "sending") {
                                                        return { ...msg, status: sts }
                                                    }
                                                    return msg
                                                })
                                            }
                                        }); break;
                                }

                                case("delivered"):{  
                                            set((state) => {
                                            // map over the messages array and update the status of the
                                            // message that is being sent
                                            return {
                                                messages: state.messages.map((msg) => {
                                                    if (msg.status === "sent") {
                                                        return { ...msg, status: sts }
                                                    }
                                                    return msg
                                                })
                                            }
                                        }); break;
                                }

                                case("read"):{  
                                            set((state) => {
                                            // map over the messages array and update the status of the
                                            // message that is being sent
                                            return {
                                                messages: state.messages.map((msg) => {
                                                    if (msg.status === "delivered") {
                                                        return { ...msg, status: sts }
                                                    }
                                                    return msg
                                                })
                                            }
                                        }); break;
                                }

                                case("sending"):{  
                                        set((state) => {
                                        // map over the messages array and update the status of the
                                        // message that is being sent
                                        return {
                                            messages: state.messages.map((msg) => {
                                                if (!msg.status) {
                                                    return { ...msg, status: sts }
                                                }
                                                return msg
                                            })
                                        }
                                    }); break;
                                }

                                case("failed"):{  
                                        set((state) => {
                                        // map over the messages array and update the status of the
                                        // message that is being sent
                                        return {
                                            messages: state.messages.map((msg) => {
                                                if (msg.status === "sending") {
                                                    return { ...msg, status: sts }
                                                }
                                                return msg
                                            })
                                        }
                                    }); break;
                                }

                                default:
                                    return
                            }
                        }

        }))