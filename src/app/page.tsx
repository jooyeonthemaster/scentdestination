import Hero from '@/components/Hero';
import MoodSpaceFragrances from '@/components/MoodSpaceFragrances';
import RegionalCollections from '@/components/RegionalCollections';
import ScentSpaceStory from '@/components/ScentSpaceStory';
import ScentJourneyMagazine from '@/components/ExpertCuration';
import AiScentRecommendation from '@/components/AiScentRecommendation';

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <AiScentRecommendation />
      <MoodSpaceFragrances />
      <RegionalCollections />
      <ScentSpaceStory />
      <ScentJourneyMagazine />
    </main>
  );
}
