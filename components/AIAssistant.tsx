
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Lux, your luxury style consultant. Looking for a specific scent or piece of jewelry today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(() => {
    const saved = localStorage.getItem('lux_request_count');
    const savedData = saved ? JSON.parse(saved) : { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };
    
    // Reset count if 24 hours have passed
    if (Date.now() > savedData.resetTime) {
      const newData = { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };
      localStorage.setItem('lux_request_count', JSON.stringify(newData));
      return newData;
    }
    
    return savedData;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const RATE_LIMIT = 4; // 4 requests per day

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check rate limit
    if (requestCount.count >= RATE_LIMIT) {
      const resetTime = new Date(requestCount.resetTime);
      const timeUntilReset = Math.ceil((requestCount.resetTime - Date.now()) / (1000 * 60 * 60));
      
      const rateLimitMsg: ChatMessage = { 
        role: 'model', 
        text: `I appreciate your interest! However, I have a daily limit of ${RATE_LIMIT} conversations per user to ensure quality service for everyone. Your limit will reset in ${timeUntilReset} hour${timeUntilReset !== 1 ? 's' : ''}. For immediate assistance, please contact us directly via WhatsApp at ${COMPANY_INFO.phones[0]}.`, 
        timestamp: Date.now() 
      };
      
      setMessages(prev => [...prev, { role: 'user', text: input, timestamp: Date.now() }, rateLimitMsg]);
      setInput('');
      return;
    }

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await getChatResponse(input, history);
      
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: Date.now() }]);
      
      // Update request count
      const newCount = { ...requestCount, count: requestCount.count + 1 };
      setRequestCount(newCount);
      localStorage.setItem('lux_request_count', JSON.stringify(newCount));
      
    } catch (error) {
      const errorMsg: ChatMessage = { 
        role: 'model', 
        text: "I'm having trouble connecting right now. Please try again in a moment or contact us directly via WhatsApp for immediate assistance.", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, errorMsg]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-gradient-to-tr from-blue-600 via-red-500 to-yellow-400'
        } text-white`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-500 border border-slate-100">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-red-500 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold font-serif text-lg">Lux Assistant</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Online & Ready to Help</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">
                {requestCount.count}/{RATE_LIMIT} daily
              </div>
              <div className="flex space-x-1 mt-1">
                {Array.from({ length: RATE_LIMIT }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < requestCount.count ? 'bg-yellow-400' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold">
                    {msg.role === 'user' ? 'You' : 'Lux'}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none">
                  <Loader2 size={20} className="animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={requestCount.count >= RATE_LIMIT ? "Daily limit reached..." : "Ask Lux anything..."}
              disabled={requestCount.count >= RATE_LIMIT}
              className={`flex-1 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 outline-none ${
                requestCount.count >= RATE_LIMIT 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-100'
              }`}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading || requestCount.count >= RATE_LIMIT}
              className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
