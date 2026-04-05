import { useState, useEffect } from 'react';
import IntroSection from './components/intro/IntroSection';
import MainSection from './components/main/MainSection';
import DateSection from './components/date/DateSection';
import MapSection from './components/map/MapSection';
// import GallerySection from './components/gallary/GallerySection';
import MessageBoard from './components/message/MessageBoard';
import AccountSection from './components/account/AccountSection';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import { ToastProvider } from './contexts/ToastContext';
import { initScrollAnimation } from './utils/scrollAnimation';
import './styles/globals.css';

function AppContent() {
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  useEffect(() => {
    initScrollAnimation();
  }, []);

  const handleCloseRSVP = () => {
    setShowRSVPModal(false);
  };

  const handleOpenRSVP = () => {
    setShowRSVPModal(true);
  };

  return (
    <div className="App">
      <IntroSection />
      <MainSection />
      <DateSection />
      <MapSection onOpenRSVP={handleOpenRSVP} />
      {/* <GallerySection /> */}
      <MessageBoard />
      <AccountSection />
      <Footer />
      <RSVPModal 
        isOpen={showRSVPModal} 
        onClose={handleCloseRSVP}
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
