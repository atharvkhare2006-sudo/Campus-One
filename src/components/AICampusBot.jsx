import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Calendar,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AICampusBot() {
  const { currentCollege, wardData } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `नमस्ते! मैं Campus One का 24/7 AI कैंपस असिस्टेंट हूँ।\n\nआप मुझसे कॉलेज टाइमटेबल, एग्जाम डेट्स, अटेंडेंस रूल्स, फीस पेमेंट या अपने प्रोजेक्ट के बारे में कुछ भी पूछ सकते हैं!`
    }
  ]);

  const quickPrompts = [
    { text: 'अगला एग्जाम कब है?', key: 'exam' },
    { text: '75% अटेंडेंस नियम क्या है?', key: 'attendance' },
    { text: 'फीस रसीद कैसे डाउनलोड करें?', key: 'fees' },
    { text: 'BCA 3rd Sem के मुख्य विषय?', key: 'syllabus' },
    { text: 'एक्सटर्नल को प्रोजेक्ट कैसे समझाएं?', key: 'viva' }
  ];

  const getAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('exam') || q.includes('एग्जाम') || q.includes('परीक्षा')) {
      return `📅 **परीक्षा सूचना (Exam Update):**\nBCA 3rd Semester के मिड-टर्म थ्योरी एग्जाम्स **10 दिसंबर 2026** से शुरू हो रहे हैं।\nडिटेल्ड डेटशीट और एडमिट कार्ड स्टूडेंट पोर्टल के 'Notices' सेक्शन में उपलब्ध हैं।`;
    }

    if (q.includes('attendance') || q.includes('अटेंडेंस') || q.includes('हाजिरी') || q.includes('75%')) {
      return `⚠️ **अटेंडेंस गाइडलाइन्स (Attendance Rules):**\nयूनिवर्सिटी के नियमानुसार सेमेस्टर एग्जाम में बैठने के लिए न्यूनतम **75% अटेंडेंस अनिवार्य** है।\n- रोहन की वर्तमान ओवरऑल अटेंडेंस: **${wardData.overallAttendance}% (Safe)**\n- ऑपरेटिंग सिस्टम्स में 70.9% है, इसलिए अगली 4 क्लासेज अटेंड करना ज़रूरी है।`;
    }

    if (q.includes('fee') || q.includes('फीस') || q.includes('रसीद') || q.includes('receipt')) {
      return `💰 **फीस विवरण (Fee Ledger):**\nवार्षिक कुल फीस: ₹65,000 (100% Paid).\nरोहन के खाते में **₹0 बकाया** है।\nमाता-पिता 'Parent Portal' में जाकर 'Fees & Dues' टैब से दोनों ऑफिशियल रसीदें (RCP-2026-8831 & RCP-2026-4412) 1-क्लिक में डाउनलोड कर सकते हैं।`;
    }

    if (q.includes('syllabus') || q.includes('विषय') || q.includes('subject') || q.includes('bca')) {
      return `📚 **BCA 3rd Semester Core Subjects:**\n1. Database Management Systems (BCA-301) - Dr. Ananya Pandey\n2. Data Structures & Algorithms in C++ (BCA-302) - Prof. Rajesh Joshi\n3. Web Technologies & Full-Stack (BCA-303) - Dr. Ananya Pandey\n4. Operating Systems Principles (BCA-304) - Prof. Rajesh Joshi\nसभी यूनिट-वाइज़ नोट्स 'Student Portal' पर उपलब्ध हैं।`;
    }

    if (q.includes('viva') || q.includes('प्रोजेक्ट') || q.includes('एक्सटर्नल') || q.includes('external')) {
      return `🎓 **वाइवा प्रजेंटेशन टिप (Viva Quick Pitch):**\nएक्सटर्नल को ऐसे बताएं:\n"Sir, Campus One एक Multi-Tenant College Management SaaS प्लेटफॉर्म है जो कॉलेज के वॉट्सऐप ग्रुप क्लटर को खत्म करता है। इसमें 5 रोल्स हैं: Super Admin, College Admin, Faculty, Student और Parent।\n- Frontend: React + Tailwind CSS\n- Backend: Python Flask REST API\n- Database: MySQL (Bcrypt Passwords & Anti-SQL Injection Protected)\n- Smart Feature: Dynamic 60-Sec Anti-Proxy Classroom Attendance & AI Study Summarizer!"`;
    }

    return `मैंने आपका सवाल दर्ज कर लिया है: "${query}"।\n\nCampus One AI सिस्टम कॉलेज डेटाबेस से जुड़ा है। आपके कॉलेज (${currentCollege?.name || 'AITM Bhopal'}) के रिकॉर्ड के अनुसार सभी सर्विसेज सामान्य रूप से संचालित हैं। किसी विशेष सहायता के लिए आप अपने मेंटर से संपर्क कर सकते हैं।`;
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIResponse(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all animate-bounce duration-1000"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin duration-3000" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white"></span>
          </div>
          <span className="hidden sm:inline">24/7 Campus AI Assistant</span>
          <span className="sm:hidden">AI Bot</span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[82vh] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                  Campus One AI <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">Active</span>
                </h4>
                <p className="text-[11px] text-purple-200">
                  Intelligent College Helpdesk & Viva Advisor
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-none shadow-sm whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs italic">
                <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span>Campus AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Smart Chips */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 text-[11px] font-semibold transition-all shadow-2xs"
              >
                {chip.text}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything in Hindi or English..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
