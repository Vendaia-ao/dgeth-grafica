import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import SobreNos from "./pages/SobreNos";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { SiteDataProvider } from "./context/SiteDataContext";

const queryClient = new QueryClient();

// Componente interno que usa useLocation para forçar remontagem das páginas
const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home key={location.pathname} />} />
        <Route path="/servicos" element={<Services key={location.pathname} />} />
        <Route path="/portfolio" element={<Portfolio key={location.pathname} />} />
        <Route path="/sobre-nos" element={<SobreNos key={location.pathname} />} />
        <Route path="/contacto" element={<Contact key={location.pathname} />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy key={location.pathname} />} />
      </Route>
      {/* Admin Routes — outside Layout to have its own full-screen design */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </SiteDataProvider>
  </QueryClientProvider>
);

export default App;

