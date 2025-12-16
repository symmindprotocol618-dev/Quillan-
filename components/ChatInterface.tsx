import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Quillan v4.2 Neural Interface initialized. Awaiting input for meta-learning calibration or general inquiry.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: ChatMessage = {
      id: modelMsgId,
      role: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, modelMsg]);

    try {
      const stream = await sendMessageStream(userMsg.text);
      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            fullText += c.text;
            setMessages(prev => prev.map(msg => 
                msg.id === modelMsgId ? { ...msg, text: fullText } : msg
            ));
        }
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, text: "Error: Connection to Neural Fabric interrupted.", isStreaming: false } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm flex justify-between items-center">
            <h2 className="text-lg font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles size={16} />
                NEURAL_LINK STATUS: ACTIVE
            </h2>
            <span className="text-xs text-slate-500 font-mono">LATENCY: 12ms</span>
        </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 max-w-4xl mx-auto ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              msg.role === 'model' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-slate-700 text-slate-200'
            }`}>
              {msg.role === 'model' ? <Bot size={18} /> : <User size={18} />}
            </div>
            
            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3 rounded-2xl max-w-lg md:max-w-xl text-sm leading-relaxed ${
                msg.role === 'user' 
                    ? 'bg-slate-700 text-slate-100 rounded-tr-sm' 
                    : 'bg-slate-800/80 border border-slate-700/50 text-slate-300 rounded-tl-sm shadow-sm'
                }`}>
                {msg.text}
                {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-cyan-400 animate-pulse"/>}
                </div>
                <span className="text-[10px] text-slate-600 mt-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-slate-700 bg-slate-900">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Input directive or query..."
            className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 font-mono text-sm shadow-inner transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2 font-mono">
           AUTHORIZED PERSONNEL ONLY. ALL INTERACTIONS ARE LOGGED IN THE GLOBAL MEMORY FABRIC.
        </p>
      </div>
    </div>
  );
};