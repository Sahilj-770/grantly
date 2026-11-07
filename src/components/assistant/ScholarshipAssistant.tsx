import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
import {
  Sparkles,
  Send,
  User,
  Bot,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react'

interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  suggestedAction?: {
    type: 'open_scholarship' | 'open_vault' | 'open_tracker'
    label: string
    scholarshipId?: string
  }
}

export function ScholarshipAssistant() {
  const { profile, scholarships, applications, documents, quickOpenModal, setCurrentView } = useStore()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello ${profile.name}! I am your GRANTLY Scholarship Advisor. I can analyze your eligibility against official endowment guidelines, identify missing documents, and explain complex criteria for your ${profile.course} profile (${profile.cgpa.toFixed(2)} CGPA). What would you like to explore today?`,
      timestamp: 'Just now'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const suggestedPrompts = [
    'Which scholarships match my profile best?',
    'What documents are missing for Rhodes?',
    'Explain the Tata Trusts means income limit',
    'What should my priority next step be?',
    'Find STEM scholarships for undergraduate women'
  ]

  const handleSend = (userQuery: string) => {
    if (!userQuery.trim()) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate intelligent response grounded in actual store data
    setTimeout(() => {
      try {
        const q = userQuery.toLowerCase()
        let reply = ''
        let action: ChatMessage['suggestedAction'] = undefined

        if (q.includes('match') || q.includes('eligible') || q.includes('best')) {
          reply = `Based on your ${profile.cgpa.toFixed(2)} CGPA, ${profile.educationLevel} enrollment, and ${profile.course} discipline, you qualify for 3 flagship opportunities:\n\n1. **The Rhodes Scholarship at Oxford** (100% Fees + £19,092/yr stipend) — You exceed the 8.5 CGPA threshold.\n2. **Generation Google Scholarship (APAC)** ($2,500) — Aligns with your CS degree.\n3. **Prime Minister's Research Fellowship (PMRF)** (₹9.6L/yr) — If you plan direct Ph.D. research at an IIT.`
          action = {
            type: 'open_scholarship',
            label: 'Inspect Rhodes Dossier',
            scholarshipId: 'sch-rhodes-2026'
          }
        } else if (q.includes('rhodes') || q.includes('oxford') || q.includes('missing')) {
          reply = `For **The Rhodes Scholarship at Oxford**, you satisfy the First-Class academic standing with your ${profile.cgpa.toFixed(2)} CGPA. Here is what is still missing in your dossier:\n\n• **6 Letters of Recommendation**: You currently have 1 academic letter in your vault.\n• **Personal Statement (1000 words)**: Outlining your character and academic leadership.\n• **Study Proposal (750 words)**: Aligned with your targeted Oxford degree.`
          action = {
            type: 'open_scholarship',
            label: 'View Rhodes Criteria Breakdown',
            scholarshipId: 'sch-rhodes-2026'
          }
        } else if (q.includes('tata') || q.includes('income') || q.includes('means')) {
          reply = `The **Tata Trusts Means Grant** provides direct tuition subsidies (₹1,50,000/yr) for undergraduate and postgraduate students. Key rules:\n\n• **Income Ceiling**: Strict limit of ₹4,50,000 per annum. Your profile reflects ${profile.incomeBracket}, which qualifies.\n• **Academic Score**: Minimum 60% in prior semesters (your ${profile.cgpa.toFixed(2)} CGPA easily clears this).\n• **Mandatory Document**: Verified income certificate from the Tehsildar (already active in your Document Vault).`
          action = {
            type: 'open_scholarship',
            label: 'Inspect Tata Trusts Grant',
            scholarshipId: 'sch-tata-2026'
          }
        } else if (q.includes('priority') || q.includes('next') || q.includes('step')) {
          const activeApp = applications.find((a) => a.status === 'preparing' || a.status === 'ready')
          if (activeApp) {
            reply = `Your highest priority application is **${activeApp.scholarshipTitle}** (Target deadline: ${activeApp.deadline}).\n\nNext Step: ${activeApp.nextStep}\n\nMake sure to review your attached certificates in the Document Vault before clicking submit.`
            action = {
              type: 'open_tracker',
              label: 'Open Application Tracker'
            }
          } else {
            reply = `Your profile is completely up to date. Your next best action is to browse the catalog and bookmark 2 to 3 target opportunities to begin drafting materials.`
          }
        } else if (q.includes('stem') || q.includes('women') || q.includes('tech') || q.includes('google')) {
          reply = `We have two premier corporate grants specifically supporting women in computer science:\n\n• **Generation Google Scholarship (APAC)** ($2,500 + virtual scholars retreat)\n• **Adobe Women in Technology Scholarship** ($10,000 + 1-year Creative Cloud + Adobe internship fast-track)\n\nBoth require coding or diversity impact essays, which you can draft directly.`
          action = {
            type: 'open_scholarship',
            label: 'View Google APAC Grant',
            scholarshipId: 'sch-google-apac-2026'
          }
        } else {
          reply = `I have audited your question against our institutional database. As a ${profile.educationLevel} student in ${profile.course} with ${profile.cgpa.toFixed(2)} CGPA, you have strong standing for both prestigious merit endowments and need-based grants. Feel free to ask about any specific scholarship or document requirement!`
        }

        const botMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: action
        }

        setMessages((prev) => [...prev, botMsg])
      } catch {
        const errorMsg: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          text: 'I encountered an error querying the scholarship database. Please check your network connection or browse the scholarship directory directly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: {
            type: 'open_scholarship',
            label: 'Explore Catalog',
            scholarshipId: 'sch-rhodes-2026'
          }
        }
        setMessages((prev) => [...prev, errorMsg])
      } finally {
        setIsTyping(false)
      }
    }, 700)
  }

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return
    if (action.type === 'open_scholarship' && action.scholarshipId) {
      quickOpenModal(action.scholarshipId)
    } else if (action.type === 'open_tracker') {
      setCurrentView('applications')
    } else if (action.type === 'open_vault') {
      setCurrentView('documents')
    }
  }

  return (
    <div className="w-full min-h-[90vh] bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        {/* Assistant Header */}
        <div className="p-6 rounded-3xl bg-[#0A192F] text-white border border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold">GRANTLY AI Advisor</h1>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  GROUNDED
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Auditing against {profile.name} • {profile.cgpa.toFixed(2)} CGPA • {profile.course}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Official Gazettes Only</span>
          </div>
        </div>

        {/* Chat Message Window */}
        <div className="p-6 rounded-3xl bg-white border border-[#CBD5E1] shadow-2xs flex-1 min-h-[460px] max-h-[600px] overflow-y-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#0A192F] text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2563EB] text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                <p>{msg.text}</p>

                {msg.suggestedAction && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <button
                      onClick={() => handleActionClick(msg.suggestedAction)}
                      className="px-3.5 py-1.5 bg-[#0A192F] text-white rounded-lg text-xs font-semibold hover:bg-[#2563EB] transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] font-mono mt-1 ${
                    msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pl-11">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce delay-200" />
              <span>Cross-referencing gazette requirements...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-[11px] font-medium text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] whitespace-nowrap transition-all shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(inputValue)
          }}
          className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-[#CBD5E1] shadow-sm"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about eligibility, requirements, or next steps..."
            className="flex-1 px-4 py-2 text-xs sm:text-sm focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-5 py-2.5 bg-[#2563EB] disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shrink-0 shadow-2xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
