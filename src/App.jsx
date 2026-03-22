import { useEffect } from 'react';
import IntroSection from './components/intro/IntroSection';
import MainSection from './components/main/MainSection';
import DateSection from './components/date/DateSection';
import MapSection from './components/map/MapSection';
import GallerySection from './components/gallary/GallerySection';
import MessageBoard from './components/message/MessageBoard';
import AccountSection from './components/account/AccountSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ToastProvider, useToastContext } from './contexts/ToastContext';
import { initScrollAnimation } from './utils/scrollAnimation';
import './styles/globals.css';

function AppContent() {
  const { toasts, removeToast } = useToastContext();

  useEffect(() => {
    initScrollAnimation();
  }, []);

  return (
    <div className="App">
      <IntroSection />
      <MainSection />
      <DateSection />
      <MapSection />
      <GallerySection />
      <MessageBoard />
      <AccountSection />
      <Footer />

      {toasts.map((toast) => (
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
