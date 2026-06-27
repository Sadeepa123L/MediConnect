import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '../services/chatService';
import type { ChatMessage, RecommendedDoctor } from '../types/chat';

export default function ChatWidget() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content:
                "Hi! I'm MediCare's assistant. Tell me what symptoms you're experiencing, and I'll help you find the right doctor.",
        },
    ]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [recommendedDoctor, setRecommendedDoctor] = useState<RecommendedDoctor | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || sending) return;

        const updatedMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
        setMessages(updatedMessages);
        setInput('');
        setSending(true);
        setRecommendedDoctor(null);

        try {
            const response = await sendChatMessage(updatedMessages);
            setMessages([...updatedMessages, { role: 'assistant', content: response.reply }]);
            if (response.recommendedDoctor) {
                setRecommendedDoctor(response.recommendedDoctor);
            }
        } catch (error) {
            console.error('Chat failed:', error);
            setMessages([
                ...updatedMessages,
                {
                    role: 'assistant',
                    content: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
                },
            ]);
        } finally {
            setSending(false);
        }
    };

    const handleBookWithDoctor = () => {
        if (recommendedDoctor) {
            navigate(`/book?doctorId=${recommendedDoctor._id}`);
            setIsOpen(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#2A6B63] text-white shadow-[0_8px_24px_-4px_rgba(42,107,99,0.5)] hover:bg-[#235953] hover:scale-105 transition-all flex items-center justify-center z-[200]"
                    aria-label="Open symptom assistant"
                >
                    <i className="ti ti-message-chatbot text-2xl" aria-hidden="true"></i>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-3rem))] bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.3)] z-[200] flex flex-col overflow-hidden">
                    <div className="bg-[#2A6B63] px-5 py-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                                <i className="ti ti-message-chatbot text-lg text-white" aria-hidden="true"></i>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">MediCare Assistant</p>
                                <p className="text-[11px] text-white/70">Symptom checker & doctor finder</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-1 transition-colors"
                            aria-label="Close chat"
                        >
                            <i className="ti ti-x text-xl" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div className="bg-[#FAEEDA] px-4 py-2 shrink-0">
                        <p className="text-[11px] text-[#854F0B] leading-relaxed">
                            <i className="ti ti-info-circle mr-1" aria-hidden="true"></i>
                            This is not a medical diagnosis. For emergencies, contact a doctor or hospital directly.
                        </p>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FBF6EF]">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#2A6B63] text-white rounded-br-md'
                                            : 'bg-white text-[#332B25] rounded-bl-md shadow-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {sending && (
                            <div className="flex justify-start">
                                <div className="bg-white text-[#A39A8C] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm shadow-sm flex items-center gap-1">
                                    <i className="ti ti-loader-2 animate-spin" aria-hidden="true"></i>
                                    Thinking...
                                </div>
                            </div>
                        )}

                        {recommendedDoctor && (
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#A8C4B0]/40">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-[#A8C4B0]/30 flex items-center justify-center shrink-0">
                                        <i className="ti ti-stethoscope text-lg text-[#2A6B63]" aria-hidden="true"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-[#332B25] truncate">{recommendedDoctor.name}</p>
                                        <p className="text-xs text-[#5C5249]">{recommendedDoctor.specialty}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleBookWithDoctor}
                                    className="w-full bg-[#EF8354] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#DD6E3D] transition-all"
                                >
                                    Book with {recommendedDoctor.name.split(' ')[0]} {recommendedDoctor.name.split(' ')[1] || ''}
                                </button>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#F4EDE1] flex gap-2 shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your symptoms..."
                            disabled={sending}
                            className="flex-1 p-2.5 px-3.5 border border-[#E8DFD0] rounded-full outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] text-sm text-[#332B25] placeholder:text-[#A39A8C] transition-all disabled:bg-[#F4EDE1]"
                        />
                        <button
                            type="submit"
                            disabled={sending || !input.trim()}
                            className="bg-[#2A6B63] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#235953] transition-all disabled:opacity-50 shrink-0"
                            aria-label="Send message"
                        >
                            <i className="ti ti-send text-base" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}