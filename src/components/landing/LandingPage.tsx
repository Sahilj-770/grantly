import React from 'react'
import { CurvedTileHero } from './CurvedTileHero'
import { FundingPathwaysShelf } from './FundingPathwaysShelf'
import { JourneyRibbonScene } from './JourneyRibbonScene'
import { EligibilityValueProposition } from './EligibilityValueProposition'
import { TrustMetricsSection } from './TrustMetricsSection'
import { FinalCallToAction } from './FinalCallToAction'

export function LandingPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Flagship Cylindrical Curved Tile Reel Hero */}
      <CurvedTileHero />

      {/* 2. 3D Archive Shelf: Explore by Funding Pathway */}
      <FundingPathwaysShelf />

      {/* 3. Three.js Curved Ribbon: 4-Stage Student Journey */}
      <JourneyRibbonScene />

      {/* 4. Algorithmic Eligibility Value Proposition */}
      <EligibilityValueProposition />

      {/* 5. Trust, Verification Metrics & FAQ */}
      <TrustMetricsSection />

      {/* 6. Final Call to Action */}
      <FinalCallToAction />
    </div>
  )
}
