'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonMessageItem } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: number
  sender: string
  text: string
  time: string
  isUser: boolean
}

const Messages = () => {
  const { t } = useLanguage()
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [messageInput, setMessageInput] = useState('')
  const [sentMessageCount, setSentMessageCount] = useState<Record<number, number>>({})
  
  // Initialize messages per conversation
  const [messagesByChat, setMessagesByChat] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: 'Travel Support', text: 'Hello! How can I help you today?', time: '10:00 AM', isUser: false },
      { id: 2, sender: 'You', text: 'I have a question about my Paris booking', time: '10:05 AM', isUser: true },
      { id: 3, sender: 'Travel Support', text: 'Sure! What would you like to know?', time: '10:06 AM', isUser: false },
      { id: 4, sender: 'Travel Support', text: 'Your booking has been confirmed!', time: '2 hours ago', isUser: false },
    ],
    2: [
      { id: 1, sender: 'Paris Hotel', text: 'Welcome! Your check-in instructions have been sent.', time: '1 day ago', isUser: false },
    ],
    3: [
      { id: 1, sender: 'Flight Updates', text: 'Your flight is on time. Have a great trip!', time: '2 days ago', isUser: false },
    ],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])


  const chats = [
    { 
      id: 1, 
      name: 'Travel Support', 
      lastMessage: messagesByChat[1]?.[messagesByChat[1].length - 1]?.text || 'Your booking has been confirmed!', 
      time: '2 hours ago', 
      unread: 2, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support' 
    },
    { 
      id: 2, 
      name: 'Paris Hotel', 
      lastMessage: messagesByChat[2]?.[messagesByChat[2].length - 1]?.text || 'Check-in instructions sent', 
      time: '1 day ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hotel' 
    },
    { 
      id: 3, 
      name: 'Flight Updates', 
      lastMessage: messagesByChat[3]?.[messagesByChat[3].length - 1]?.text || 'Your flight is on time', 
      time: '2 days ago', 
      unread: 0, 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Flight' 
    },
  ]

  // Get current chat messages
  const currentMessages = useMemo(() => {
    return selectedChat ? (messagesByChat[selectedChat] || []) : []
  }, [selectedChat, messagesByChat])

  const fakeResponses = [
    "Thank you for your message! I'm here to help.",
    "I understand your concern. Let me check that for you.",
    "That's a great question! Here's what I found...",
    "I'll get back to you with more details shortly.",
    "Is there anything else you'd like to know?",
    "Perfect! I've noted that down for you.",
  ]

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now(),
      sender: 'You',
      text: messageInput.trim(),
      time: getCurrentTime(),
      isUser: true,
    }

    // Add message to the specific chat
    setMessagesByChat(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))
    setMessageInput('')
    
    // Initialize count if not exists, then increment and get new count
    let newCount = 1
    setSentMessageCount(prev => {
      const currentCount = prev[selectedChat] || 0
      newCount = currentCount + 1
      return { ...prev, [selectedChat]: newCount }
    })

    // After 1-2 messages, send a fake response
    if (newCount >= 1 && newCount <= 2) {
      const delay = Math.random() * 2000 + 1500 // 1.5-3.5 seconds delay
      setTimeout(() => {
        const randomResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)]
        const fakeMessage: Message = {
          id: Date.now() + 1,
          sender: selectedChatData?.name || 'Travel Support',
          text: randomResponse,
          time: getCurrentTime(),
          isUser: false,
        }
        setMessagesByChat(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), fakeMessage]
        }))
      }, delay)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when new messages are added
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentMessages])

  if (isLoading) {
    return (
      <div className="flex flex-col h-full min-h-0">
        <div className="mb-6 flex-shrink-0">
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <Card className="flex-1 flex min-h-0 max-h-full">
          <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex-col min-h-0 flex">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <SkeletonMessageItem key={i} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.messages.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.messages.subtitle')}
        </p>
      </div>

      <Card className="flex-1 flex min-h-0 max-h-full overflow-hidden">
        <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex-col min-h-0`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <Input
              type="text"
              placeholder={t('dashboard.messages.searchPlaceholder')}
              className="w-full"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border-b border-gray-200 dark:border-gray-700 ${
                  selectedChat === chat.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      {chat.unread > 0 && (
                        <Badge className="ml-2 bg-emerald-500 text-white">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{chat.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-h-0`}>
          {selectedChatData ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <Avatar>
                    <AvatarImage src={selectedChatData.avatar} alt={selectedChatData.name} />
                    <AvatarFallback>{selectedChatData.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedChatData.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.messages.online')}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isUser ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder={t('dashboard.messages.typeMessage')}
                    className="flex-1"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                    {t('dashboard.messages.send')}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              {t('dashboard.messages.selectConversation')}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Messages
