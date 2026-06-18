import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Background from './Background';
import CookieBanner from '@/components/CookieBanner';

const Layout = () => {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
};

export default Layout;
