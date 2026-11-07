import React, { useState, useMemo } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { ScholarshipCard } from './ScholarshipCard'
import { ScholarshipCategory } from '../../types/scholarship'
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  Bookmark,
  X,
  Compass,
  ArrowUpDown,
  Filter
} from 'lucide-react'

export function ScholarshipDiscovery() {
  const {
    scholarships,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    profile,
    getEligibilityFor
  } = useStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [educationLevelFilter, setEducationLevelFilter] = useState<string>('all')
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'amount'>('match')
  const [onlySaved, setOnlySaved] = useState(false)

  const categories: { id: ScholarshipCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'government', label: 'Government' },
    { id: 'merit', label: 'Merit Fellowships' },
    { id: 'need', label: 'Need-Based Aid' },
    { id: 'stem-research', label: 'STEM & Tech' },
    { id: 'international', label: 'International' },
    { id: 'creative', label: 'Arts & Creative' }
  ]

  // Filtered & Sorted list
  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((sch) => {
        // Category filter
        if (selectedCategory && selectedCategory !== 'all' && sch.category !== selectedCategory) {
          return false
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchesTitle = sch.title.toLowerCase().includes(q)
          const matchesProvider = sch.provider.toLowerCase().includes(q)
          const matchesDesc = sch.description.toLowerCase().includes(q)
          const matchesTags = sch.tags.some((t) => t.toLowerCase().includes(q))
          if (!matchesTitle && !matchesProvider && !matchesDesc && !matchesTags) {
            return false
          }
        }

        // Education level filter
        if (educationLevelFilter !== 'all') {
          if (!sch.educationLevels.includes(educationLevelFilter as any)) {
            return false
          }
        }

        // Saved only
        if (onlySaved) {
          if (!profile.savedScholarshipIds.includes(sch.id)) {
            return false
          }
        }

        // Eligibility filter
        if (eligibilityFilter !== 'all') {
          const res = getEligibilityFor(sch.id)
          const score = res ? res.overallMatchScore : 70
          if (eligibilityFilter === 'strong' && score < 80) return false
          if (eligibilityFilter === 'potential' && (score < 60 || score >= 80)) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          const scoreA = getEligibilityFor(a.id)?.overallMatchScore || 0
          const scoreB = getEligibilityFor(b.id)?.overallMatchScore || 0
          return scoreB - scoreA
        }
        if (sortBy === 'deadline') {
          return a.daysRemaining - b.daysRemaining
        }
        if (sortBy === 'amount') {
          return b.amount - a.amount
        }
        return 0
      })
  }, [
    scholarships,
    selectedCategory,
    searchQuery,
    educationLevelFilter,
    onlySaved,
    eligibilityFilter,
    sortBy,
    profile.savedScholarshipIds,
    getEligibilityFor
  ])

  const clearAllFilters = () => {
    setSelectedCategory(null)
    setSearchQuery('')
    setEducationLevelFilter('all')
    setEligibilityFilter('all')
    setOnlySaved(false)
  }

  const hasActiveFilters =
    selectedCategory ||
    searchQuery ||
    educationLevelFilter !== 'all' ||
    eligibilityFilter !== 'all' ||
    onlySaved

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Institutional Directory</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
              Scholarship Discovery Catalog
            </h1>
            <p className="text-sm text-[#475569]">
              Search and filter across {scholarships.length} fully verified grants, fellowship trusts, and ministerial schemes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlySaved
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-white' : ''}`} />
              <span>Saved ({profile.savedScholarshipIds.length})</span>
            </button>

            <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#0A192F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#0A192F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Primary Filter Controls */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scholarship title, host university, or tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Level Filter */}
            <select
              value={educationLevelFilter}
              onChange={(e) => setEducationLevelFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-[#2563EB]"
            >
              <option value="all">All Study Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Doctoral">Doctoral</option>
            </select>

            {/* Match Filter */}
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-[#2563EB]"
            >
              <option value="all">All Match Scores</option>
              <option value="strong">Strong Match (80%+)</option>
              <option value="potential">Potential Fit (60-79%)</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:border-[#2563EB]"
            >
              <option value="match">Sort: Highest Match</option>
              <option value="deadline">Sort: Upcoming Deadline</option>
              <option value="amount">Sort: Grant Amount</option>
            </select>
          </div>

          {/* Category Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = (selectedCategory || 'all') === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#0A192F] text-white shadow-2xs font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 flex items-center gap-1 shrink-0 ml-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
          <span>SHOWING {filteredScholarships.length} OF {scholarships.length} OPPORTUNITIES</span>
          <span>CALCULATED FOR {profile.cgpa.toFixed(2)} CGPA • {profile.educationLevel.toUpperCase()}</span>
        </div>

        {/* Scholarships Content Stream */}
        {filteredScholarships.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((sch) => (
                <ScholarshipCard key={sch.id} scholarship={sch} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScholarships.map((sch) => (
                <ScholarshipCard key={sch.id} scholarship={sch} viewMode="list" />
              ))}
            </div>
          )
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#CBD5E1] space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0A192F]">No Scholarships Match Your Criteria</h3>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
              Try adjusting your search terms, changing the category filter, or broadening the study level selection.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
