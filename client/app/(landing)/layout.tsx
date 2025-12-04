import { LandingHeader } from "../components/LandingHeader"; 
import { LandingFooter } from "../components/LandingFooter";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <LandingHeader />
      <AnimatedBackground />
      
      <main className="flex-1 star relative z-10">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}