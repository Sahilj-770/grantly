import React, { useState } from 'react'
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Building,
  GraduationCap,
  Sparkles
} from 'lucide-react'

const FAQS = [
  {
    q: 'How does GRANTLY calculate my match percentage?',
    a: 'We evaluate four weighted factors: Academic Performance (30%), Education Level Match (25%), Course & Field Alignment (15%), and Financial / Income Eligibility (20%), plus 10% for Document Readiness. We never invent percentages; every score is accompanied by an itemized list of met and unmet criteria.'
  },
  {
    q: 'Does GRANTLY submit applications on my behalf?',
    a: 'No scholarship aggregator can legally submit official government or university applications without direct power of attorney. Instead, GRANTLY prepares your dossier, audits missing documents, verifies criteria, and links you directly to the official government or foundation submission portal.'
  },
  {
    q: 'Is my financial and identity information safe in the Document Vault?',
    a: 'Absolutely. We do not sell student data, share dossiers with third-party advertisers, or store sensitive documents in public cloud buckets. All documents are encrypted in private storage and accessible only by you.'
  },
  {
    q: 'Are government and private scholarships kept up to date?',
    a: 'Yes. Our catalog records the exact timestamp of its last institutional verification, linking directly to official gazettes from the Ministry of Education, DST, and allied trusts.'
  }
]

export function TrustMetricsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#FBFBFA] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-2">
            <div className="text-3xl font-bold font-mono text-[#0A192F]">100%</div>
            <div className="text-xs text-[#64748B] font-medium">Verified Sources</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-2">
            <div className="text-3xl font-bold font-mono text-[#0D9488]">₹18.4 Cr</div>
            <div className="text-xs text-[#64748B] font-medium">Total Aid Mapped</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-2">
            <div className="text-3xl font-bold font-mono text-[#2563EB]">Zero</div>
            <div className="text-xs text-[#64748B] font-medium">Paywalled Listings</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-2">
            <div className="text-3xl font-bold font-mono text-[#D97706]">WCAG AA</div>
            <div className="text-xs text-[#64748B] font-medium">Accessibility Standard</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Clarity & Answers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-[#CBD5E1] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0A192F] hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#2563EB] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
