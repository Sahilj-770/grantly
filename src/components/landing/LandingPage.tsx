import React from 'react'
import { SplitCurtainHero } from './SplitCurtainHero'
import { FeaturedCurvedCarousel } from './FeaturedCurvedCarousel'
import { FundingPathwaysShelf } from './FundingPathwaysShelf'
import { JourneyRibbonScene } from './JourneyRibbonScene'
import { EligibilityValueProposition } from './EligibilityValueProposition'
import { TrustMetricsSection } from './TrustMetricsSection'
import { FinalCallToAction } from './FinalCallToAction'

export function LandingPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Cinematic Split-Curtain Hero with Constellation Background */}
      <SplitCurtainHero />

      {/* 2. Featured Flagship Opportunities on Cylindrical 3D Arc */}
      <FeaturedCurvedCarousel />

      {/* 3. 3D Archive Shelf: Explore by Funding Pathway */}
      <FundingPathwaysShelf />

      {/* 4. Three.js Curved Ribbon: 4-Stage Student Journey */}
      <JourneyRibbonScene />

      {/* 5. Algorithmic Eligibility Value Proposition */}
      <EligibilityValueProposition />

      {/* 6. Trust, Verification Metrics & FAQ */}
      <TrustMetricsSection />

      {/* 7. Final Call to Action */}
      <FinalCallToAction />
    </div>
  )
}
