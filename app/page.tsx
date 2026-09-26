import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickFacts from '@/components/QuickFacts';
import About from '@/components/About';
import Programs from '@/components/Programs';
import WhyChooseUs from '@/components/WhyChooseUs';
import Amenities from '@/components/Amenities';
import Membership from '@/components/Membership';
import Trainers from '@/components/Trainers';
import Athletes from '@/components/Athletes';
import Gallery from '@/components/Gallery';
import BmiCalculator from '@/components/BmiCalculator';
import Nutrition from '@/components/Nutrition';
import Testimonials from '@/components/Testimonials';
import Timings from '@/components/Timings';
import Locator from '@/components/Locator';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Athletes />
        <About />
        <Programs />
        <WhyChooseUs />
        <Amenities />
        <Membership />
        <Trainers />
        <Gallery />
        <BmiCalculator />
        <Nutrition />
        <Testimonials />
        <Timings />
        <Locator />
        <Contact />
        <QuickFacts />
      </main>
      <Footer />
      <FloatingActions />
      <ChatBot />
    </>
  );
}
