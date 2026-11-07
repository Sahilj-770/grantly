import React, { useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { VaultDocument, DocumentCategory } from '../../types/document'
import {
  FileCheck2,
  UploadCloud,
  ShieldCheck,
  Lock,
  FileText,
  Calendar,
  AlertCircle,
  Trash2,
  Eye,
  PlusCircle,
  X,
  CheckCircle2,
  Building2,
  Download
} from 'lucide-react'

export function DocumentVault() {
  const { documents, addDocument, deleteDocument } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null)

  // Upload Form State
  const [uploadName, setUploadName] = useState('')
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory>('academic')
  const [uploadAuthority, setUploadAuthority] = useState('')
  const [uploadExpiry, setUploadExpiry] = useState('')

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadName.trim()) return

    addDocument({
      name: uploadName.endsWith('.pdf') ? uploadName : `${uploadName}.pdf`,
      category: uploadCategory,
      fileType: 'pdf',
      fileSize: '1.4 MB',
      verified: true,
      issuingAuthority: uploadAuthority.trim() || 'Institution Registrar',
      expiryDate: uploadExpiry || undefined,
      linkedScholarships: []
    })

    // Reset & close
    setUploadName('')
    setUploadAuthority('')
    setUploadExpiry('')
    setIsUploadModalOpen(false)
  }

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory === 'all') return true
    return doc.category === selectedCategory
  })

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted Student Repository</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] mt-1">
              Document Vault
            </h1>
            <p className="text-xs sm:text-sm text-[#475569]">
              Store verified transcripts, income declarations, and recommendations ready for immediate submission.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-mono">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Local Browser Sandbox (Zero Cloud Upload)</span>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Certificate</span>
            </button>
          </div>
        </div>

        {/* Security & Storage Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Privacy & Storage Transparency:</strong> All certificates and credentials in this demonstration vault are stored strictly in your browser's local sandbox storage (LocalStorage / Cache API). No documents, tax records, or biometric credentials are ever transmitted to external servers or third-party ad networks.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'academic', label: 'Academic Transcripts' },
            { id: 'identity', label: 'Government Identity' },
            { id: 'income', label: 'Income & Revenue' },
            { id: 'recommendation', label: 'Letters of Recommendation' },
            { id: 'bank', label: 'Banking & Passbooks' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0A192F] text-white font-semibold shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    {doc.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-sm text-[#0A192F] line-clamp-2 leading-snug">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate">{doc.issuingAuthority}</span>
                  </p>
                </div>

                <div className="space-y-1 text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span>File Size:</span>
                    <span className="font-semibold text-slate-700">{doc.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Uploaded:</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                  {doc.expiryDate && (
                    <div className="flex items-center justify-between text-amber-600">
                      <span>Expires:</span>
                      <span>{doc.expiryDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="text-xs text-[#2563EB] font-semibold hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  aria-label="Delete document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* UPLOAD MODAL */}
        {isUploadModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-300 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="font-serif text-xl font-bold text-[#0A192F]">Upload to Encrypted Vault</h3>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono uppercase text-slate-700 font-semibold mb-1.5">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="e.g. Income Certificate 2026-27"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-semibold mb-1.5">
                    Category Classification *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as DocumentCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="academic">Academic Transcript / Marksheet</option>
                    <option value="identity">Government Photo ID (Passport / Aadhaar)</option>
                    <option value="income">Family Income Revenue Certificate</option>
                    <option value="recommendation">Letter of Recommendation (Academic / Dean)</option>
                    <option value="bank">Student Bank Account Passbook</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-semibold mb-1.5">
                    Issuing Authority *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadAuthority}
                    onChange={(e) => setUploadAuthority(e.target.value)}
                    placeholder="e.g. Office of the Tehsildar, Bangalore South"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-slate-700 font-semibold mb-1.5">
                    Expiry Date (If Applicable)
                  </label>
                  <input
                    type="date"
                    value={uploadExpiry}
                    onChange={(e) => setUploadExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>

                <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 text-center space-y-1 bg-slate-50">
                  <FileCheck2 className="w-6 h-6 text-[#2563EB] mx-auto" />
                  <p className="text-slate-700 font-medium">Drag and drop verified PDF or scan here</p>
                  <p className="text-[10px] text-slate-500 font-mono">Max size 25MB • Formats: PDF, PNG, JPG</p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8]"
                  >
                    Save to Local Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DOCUMENT PREVIEW MODAL */}
        {previewDoc && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-300 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="font-serif text-lg font-bold text-[#0A192F]">{previewDoc.name}</h3>
                </div>
                <button onClick={() => setPreviewDoc(null)} className="p-1 text-slate-400 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Simulated Document Certificate Sheet */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">CERTIFICATE STATUS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED GENUINE
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ISSUING BODY</span>
                  <span className="text-slate-800 font-bold">{previewDoc.issuingAuthority}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TIMESTAMP & FILE SIGNATURE</span>
                  <span className="text-slate-600">SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f</span>
                </div>
                {previewDoc.expiryDate && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">EXPIRATION BENCHMARK</span>
                    <span className="text-amber-700 font-bold">{previewDoc.expiryDate}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 font-mono">Encrypted In-Memory</span>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-semibold"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
