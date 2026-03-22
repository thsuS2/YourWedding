import { useState, useEffect } from 'react';
import IntroSection from './components/intro/IntroSection';
import MainSection from './components/main/MainSection';
import DateSection from './components/date/DateSection';
import MapSection from './components/map/MapSection';
import GallerySection from './components/gallary/GallerySection';
import MessageBoard from './components/message/MessageBoard';
import AccountSection from './components/account/AccountSection';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import Toast from './components/Toast';
import { ToastProvider, useToastContext } from './contexts/ToastContext';
import { initScrollAnimation } from './utils/scrollAnimation';
import './styles/globals.css';

function AppContent() {
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const { toasts, removeToast } = useToastContext();

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
      <GallerySection />
      <MessageBoard />
      <AccountSection />
      <Footer />
      <RSVPModal 
        isOpen={showRSVPModal} 
        onClose={handleCloseRSVP}
      />
      
      {/* Toast 메시지 */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
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
