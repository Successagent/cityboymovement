"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, MoreVertical, Phone, Video, Info, Paperclip, Send, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>("chat1")
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, this would send the message to your backend
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  // This is a simplified version - in a real app, you would fetch this data from your API
  const chats = [
    {
      id: "chat1",
      name: "Lagos Members",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When is the next meeting?",
      time: "10:30 AM",
      unread: 3,
      isGroup: true,
      online: true,
    },
    {
      id: "chat2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'll be there at 3pm",
      time: "Yesterday",
      unread: 0,
      isGroup: false,
      online: true,
    },
    {
      id: "chat3",
      name: "Michael Obi",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the information",
      time: "Yesterday",
      unread: 0,
      isGroup: false,
      online: false,
    },
    {
      id: "chat4",
      name: "Event Coordinators",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Please submit your reports by Friday",
      time: "Monday",
      unread: 0,
      isGroup: true,
      online: true,
    },
    {
      id: "chat5",
      name: "Amina Ibrahim",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Looking forward to the event",
      time: "Monday",
      unread: 0,
      isGroup: false,
      online: false,
    },
  ]

  // Sample messages for the active chat
  const messages = [
    { id: 1, sender: "John Doe", content: "Hello everyone! When is our next meeting?", time: "10:30 AM", isMine: true },
    {
      id: 2,
      sender: "Sarah Johnson",
      content: "Hi John! The next meeting is scheduled for this Saturday at 2 PM.",
      time: "10:32 AM",
      isMine: false,
    },
    { id: 3, sender: "Michael Obi", content: "Will it be at the usual venue?", time: "10:35 AM", isMine: false },
    {
      id: 4,
      sender: "Sarah Johnson",
      content: "Yes, at the community center in Ikeja.",
      time: "10:36 AM",
      isMine: false,
    },
    { id: 5, sender: "John Doe", content: "Great! I'll be there.", time: "10:38 AM", isMine: true },
    { id: 6, sender: "Amina Ibrahim", content: "Should we bring anything specific?", time: "10:40 AM", isMine: false },
    {
      id: 7,
      sender: "Sarah Johnson",
      content: "Just your ideas and enthusiasm! We'll provide refreshments.",
      time: "10:42 AM",
      isMine: false,
    },
  ]

  const activeConversation = chats.find((chat) => chat.id === activeChat)

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Sidebar */}
        <div className="w-80 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search conversations" className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full flex items-center p-3 rounded-lg mb-1 hover:bg-gray-100 ${
                    activeChat === chat.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="relative mr-3">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between">
                      <span className="font-medium">{chat.name}</span>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-[#0F5D0B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="flex-1 overflow-y-auto p-2">
              {chats
                .filter((chat) => chat.unread > 0)
                .map((chat) => (
                  <button
                    key={chat.id}
                    className={`w-full flex items-center p-3 rounded-lg mb-1 hover:bg-gray-100 ${
                      activeChat === chat.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="relative mr-3">
                      <Avatar>
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between">
                        <span className="font-medium">{chat.name}</span>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-[#0F5D0B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                ))}
            </TabsContent>

            <TabsContent value="groups" className="flex-1 overflow-y-auto p-2">
              {chats
                .filter((chat) => chat.isGroup)
                .map((chat) => (
                  <button
                    key={chat.id}
                    className={`w-full flex items-center p-3 rounded-lg mb-1 hover:bg-gray-100 ${
                      activeChat === chat.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="relative mr-3">
                      <Avatar>
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between">
                        <span className="font-medium">{chat.name}</span>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-[#0F5D0B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </button>
                ))}
            </TabsContent>
          </Tabs>

          <div className="p-4 border-t">
            <Button className="w-full bg-[#0F5D0B] hover:bg-[#0A4A08]">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="mr-3">
                  <AvatarImage src={activeConversation?.avatar} alt={activeConversation?.name} />
                  <AvatarFallback>{activeConversation?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation?.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConversation?.isGroup
                      ? "25 members, 15 online"
                      : activeConversation?.online
                        ? "Online"
                        : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                    <DropdownMenuItem>Block user</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete chat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                  {!msg.isMine && (
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`
                    max-w-[70%] rounded-lg p-3 
                    ${
                      msg.isMine
                        ? "bg-[#0F5D0B] text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }
                  `}
                  >
                    {!msg.isMine && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isMine ? "text-green-200" : "text-gray-500"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
                <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

