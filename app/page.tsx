import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhatIDoSection from '@/components/WhatIDoSection';
import ClientsSection from '@/components/ClientsSection';
import ImageCarousel from '@/components/ImageCarousel';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import CrystalsOverlay from '@/components/CrystalsOverlay';
import BackgroundWaves from '@/components/BackgroundWaves';
import Preloader from '@/components/Preloader';
import GsapAnimations from '@/components/GsapAnimations';

export default function Home() {
  return (
    <>
      <GsapAnimations />
      <div className="page-wrapper">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="main-wrapper">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <WhatIDoSection />
          <ImageCarousel />
          <div className="diag-wrapper opposite">
            <div className="diag--div opposite"></div>
          </div>
          <ClientsSection />
          <div className="diag-wrapper">
            <div className="diag--div"></div>
          </div>
          <BlogSection />
        </main>
        <Footer />
        <CrystalsOverlay />
      </div>
      <BackgroundWaves />
      <Preloader />
    </>
  );
}
