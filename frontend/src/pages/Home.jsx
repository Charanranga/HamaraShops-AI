import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import SolutionsSection from '../components/home/SolutionsSection';
import LifecycleSection from '../components/home/LifecycleSection';
import InsightsSection from '../components/home/InsightsSection';
import ConsultationSection from '../components/home/ConsultationSection';
import MissionSection from '../components/home/MissionSection';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#0c0e12]">
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <LifecycleSection />
      <InsightsSection />
      <ConsultationSection />
      <MissionSection />
    </div>
  );
}
