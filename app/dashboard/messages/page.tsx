'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SkeletonMessageItem } from '@/components/dashboard/SkeletonLoader'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type MessageType = 'text' | 'image' | 'video' | 'file' | 'gif' | 'sticker'

interface Message {
  id: number
  sender: string
  text?: string
  time: string
  isUser: boolean
  type: MessageType
  content?: string // URL for image/gif/sticker, file name for file
  fileName?: string // For file messages
  fileSize?: string // For file messages
}

const Messages = () => {
  const { t } = useLanguage()
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [messageInput, setMessageInput] = useState('')
  const [sentMessageCount, setSentMessageCount] = useState<Record<number, number>>({})
  const [showGifPicker, setShowGifPicker] = useState(false)
  const [showStickerPicker, setShowStickerPicker] = useState(false)
  const [fullScreenMedia, setFullScreenMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  
  // Initialize messages per conversation
  const [messagesByChat, setMessagesByChat] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: 'Travel Support', text: 'Hello! How can I help you today?', time: '10:00 AM', isUser: false, type: 'text' },
      { id: 2, sender: 'You', text: 'I have a question about my Paris booking', time: '10:05 AM', isUser: true, type: 'text' },
      { id: 3, sender: 'Travel Support', text: 'Sure! What would you like to know?', time: '10:06 AM', isUser: false, type: 'text' },
      { id: 4, sender: 'Travel Support', text: 'Your booking has been confirmed!', time: '2 hours ago', isUser: false, type: 'text' },
    ],
    2: [
      { id: 1, sender: 'Paris Hotel', text: 'Welcome! Your check-in instructions have been sent.', time: '1 day ago', isUser: false, type: 'text' },
    ],
    3: [
      { id: 1, sender: 'Flight Updates', text: 'Your flight is on time. Have a great trip!', time: '2 days ago', isUser: false, type: 'text' },
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

  const handleSendMessage = (messageType: MessageType = 'text', content?: string, fileName?: string, fileSize?: string) => {
    if (!selectedChat) return
    
    // For text messages, require text input
    if (messageType === 'text' && !messageInput.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      sender: 'You',
      text: messageType === 'text' ? messageInput.trim() : undefined,
      time: getCurrentTime(),
      isUser: true,
      type: messageType,
      content,
      fileName,
      fileSize,
    }

    // Add message to the specific chat
    setMessagesByChat(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))
    
    if (messageType === 'text') {
      setMessageInput('')
    }
    
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
          type: 'text',
        }
        setMessagesByChat(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), fakeMessage]
        }))
      }, delay)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedChat) return

    const fileSize = (file.size / 1024).toFixed(1) + ' KB'
    const fileUrl = URL.createObjectURL(file)
    
    handleSendMessage('file', fileUrl, file.name, fileSize)
    e.target.value = ''
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedChat) return

    if (!file.type.startsWith('image/')) {
      alert(t('dashboard.messages.errors.invalidImage'))
      return
    }

    const imageUrl = URL.createObjectURL(file)
    handleSendMessage('image', imageUrl)
    e.target.value = ''
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedChat) return

    if (!file.type.startsWith('video/')) {
      alert(t('dashboard.messages.errors.invalidVideo'))
      return
    }

    const videoUrl = URL.createObjectURL(file)
    handleSendMessage('video', videoUrl)
    e.target.value = ''
  }

  const handleGifSelect = (gifUrl: string) => {
    handleSendMessage('gif', gifUrl)
    setShowGifPicker(false)
  }

  const handleStickerSelect = (stickerUrl: string) => {
    handleSendMessage('sticker', stickerUrl)
    setShowStickerPicker(false)
  }

  // Popular GIFs (using placeholder URLs - in production, use a GIF API like Giphy)
  const popularGifs = [
    'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif',
    'https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif',
    'https://media.giphy.com/media/3o7abld0FJzbrMDLHi/giphy.gif',
    'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    'https://media.giphy.com/media/3o7aD2saW8lXlzXqG4/giphy.gif',
    'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',
    'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
    'https://media.giphy.com/media/l0HlPystfFABXJYzK/giphy.gif',
  ]

  // Popular stickers (using emoji or image URLs)
  const popularStickers = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
    '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩',
    '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
    '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
  ]

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
                      className={`max-w-xs lg:max-w-md rounded-lg overflow-hidden ${
                        message.isUser
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {message.type === 'text' && (
                        <div className="px-4 py-2">
                          <p className="text-sm">{message.text}</p>
                        </div>
                      )}
                      {message.type === 'image' && message.content && (
                        <div className="p-2">
                          <img 
                            src={message.content} 
                            alt="Shared image" 
                            className="max-w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setFullScreenMedia({ url: message.content!, type: 'image' })}
                          />
                          {message.text && (
                            <p className="text-sm mt-2 px-2">{message.text}</p>
                          )}
                        </div>
                      )}
                      {message.type === 'video' && message.content && (
                        <div className="p-2 relative">
                          <video 
                            src={message.content} 
                            controls
                            className="max-w-full h-auto rounded"
                          />
                          <button
                            onClick={() => setFullScreenMedia({ url: message.content!, type: 'video' })}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
                            title={t('dashboard.messages.viewFullScreen')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </button>
                          {message.text && (
                            <p className="text-sm mt-2 px-2">{message.text}</p>
                          )}
                        </div>
                      )}
                      {message.type === 'gif' && message.content && (
                        <div className="p-2">
                          <img 
                            src={message.content} 
                            alt="GIF" 
                            className="max-w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setFullScreenMedia({ url: message.content!, type: 'image' })}
                          />
                          {message.text && (
                            <p className="text-sm mt-2 px-2">{message.text}</p>
                          )}
                        </div>
                      )}
                      {message.type === 'sticker' && message.content && (
                        <div className="p-4 text-center">
                          <span className="text-6xl">{message.content}</span>
                        </div>
                      )}
                      {message.type === 'file' && message.content && (
                        <div className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 dark:bg-gray-600 rounded flex items-center justify-center">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{message.fileName}</p>
                              {message.fileSize && (
                                <p className="text-xs opacity-80">{message.fileSize}</p>
                              )}
                            </div>
                            <a 
                              href={message.content} 
                              download={message.fileName}
                              className="p-2 hover:bg-white/20 rounded"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                      <p
                        className={`text-xs px-4 pb-2 ${
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
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                {/* GIF Picker */}
                {showGifPicker && (
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {t('dashboard.messages.selectGif')}
                      </h4>
                      <button
                        onClick={() => setShowGifPicker(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {popularGifs.map((gif, index) => (
                        <button
                          key={index}
                          onClick={() => handleGifSelect(gif)}
                          className="aspect-square rounded overflow-hidden hover:ring-2 ring-emerald-500 transition-all touch-manipulation"
                        >
                          <img src={gif} alt={`GIF ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sticker Picker */}
                {showStickerPicker && (
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {t('dashboard.messages.selectSticker')}
                      </h4>
                      <button
                        onClick={() => setShowStickerPicker(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 touch-manipulation"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2 max-h-48 overflow-y-auto">
                      {popularStickers.map((sticker, index) => (
                        <button
                          key={index}
                          onClick={() => handleStickerSelect(sticker)}
                          className="text-2xl sm:text-3xl hover:scale-125 transition-transform p-1 sm:p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 touch-manipulation"
                        >
                          {sticker}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 w-full">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {/* Mobile: Dropdown menu for attachments */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="md:hidden flex-shrink-0 p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
                        title={t('dashboard.messages.attach')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem
                        onClick={() => imageInputRef.current?.click()}
                        className="cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t('dashboard.messages.attachImage')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => videoInputRef.current?.click()}
                        className="cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {t('dashboard.messages.attachVideo')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {t('dashboard.messages.attachFile')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setShowGifPicker(!showGifPicker)
                          setShowStickerPicker(false)
                        }}
                        className="cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('dashboard.messages.attachGif')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setShowStickerPicker(!showStickerPicker)
                          setShowGifPicker(false)
                        }}
                        className="cursor-pointer"
                      >
                        <span className="mr-2">😀</span>
                        {t('dashboard.messages.attachSticker')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Desktop: Individual buttons */}
                  <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={t('dashboard.messages.attachImage')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={t('dashboard.messages.attachVideo')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={t('dashboard.messages.attachFile')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowGifPicker(!showGifPicker)
                        setShowStickerPicker(false)
                      }}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={t('dashboard.messages.attachGif')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowStickerPicker(!showStickerPicker)
                        setShowGifPicker(false)
                      }}
                      className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={t('dashboard.messages.attachSticker')}
                    >
                      <span className="text-xl">😀</span>
                    </button>
                  </div>

                  <div className="flex-1 min-w-0 flex items-center">
                    <Input
                      type="text"
                      placeholder={t('dashboard.messages.typeMessage')}
                      className="w-full text-sm sm:text-base"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <Button 
                    onClick={() => handleSendMessage('text')} 
                    disabled={!messageInput.trim()}
                    className="flex-shrink-0 p-2.5 h-10 aspect-square"
                    size="sm"
                    title={t('dashboard.messages.send')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
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

      {/* Full-Screen Media Viewer */}
      <Dialog open={!!fullScreenMedia} onOpenChange={(open) => {
        // Only close when explicitly set to false (via close button), not on outside click
        if (!open) {
          setFullScreenMedia(null)
        }
      }}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="sr-only">
            {fullScreenMedia?.type === 'image' 
              ? t('dashboard.messages.fullScreenImage')
              : t('dashboard.messages.fullScreenVideo')}
          </DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            {fullScreenMedia?.type === 'image' && (
              <img
                src={fullScreenMedia.url}
                alt="Full screen"
                className="max-w-full max-h-full object-contain"
              />
            )}
            {fullScreenMedia?.type === 'video' && (
              <video
                src={fullScreenMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            )}
            <button
              onClick={() => setFullScreenMedia(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              aria-label={t('dashboard.messages.closeFullScreen')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Messages
