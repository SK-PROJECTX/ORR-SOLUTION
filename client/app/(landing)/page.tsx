import ApproachCard from '../components/ApproachCard';
import GPMetaphorSection from '../components/GPMetaphorSection';
import Hero from '../components/Hero';
import ServicePillar from '../components/ServicePillars';
import { HeroSection } from './components/HeroSection';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Hero/>
      <ApproachCard/>
      <ServicePillar />
      <GPMetaphorSection />
    </div>
  );
}