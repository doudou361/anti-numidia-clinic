import { Toaster } from "sonner";
import { LazyMotion, domAnimation } from "framer-motion";
import { BookingProvider, useBooking } from "./components/booking/BookingContext";
import { BookingModal } from "./components/booking/BookingModal";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { Services } from "./components/sections/Services";
import { Whitening } from "./components/sections/Whitening";
import { Results } from "./components/sections/Results";
import { Training } from "./components/sections/Training";
import { Practical } from "./components/sections/Practical";
import { Faq } from "./components/sections/Faq";

function AppContent() {
  const { open } = useBooking();

  return (
    <div className="min-h-screen bg-porcelain text-ink selection:bg-rose-deep/20">
      <Header onBook={() => open()} />
      <main>
        <Hero onBook={() => open()} />
        <TrustBar />
        <Services onBookService={(id) => open(id)} />
        <Whitening />
        <Results />
        <Training onBookTraining={() => open("formations")} />
        <Practical />
        <Faq />
      </main>
      <Footer onBook={() => open()} />
      
      <BookingModal />
      <Toaster position="top-left" toastOptions={{ className: "font-sans text-sm bg-ink text-porcelain border-none" }} />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <LazyMotion features={domAnimation}>
        <AppContent />
      </LazyMotion>
    </BookingProvider>
  );
}
