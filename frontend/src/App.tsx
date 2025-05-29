import { useAuth, AuthProvider } from "./utility/use-auth-client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Others
import { RegistrationProvider } from "./utility/RegistrationContext";
import EditorPage from "./pages/editor/[id]/page";
import PreviewPage from "./pages/preview/[id]/page";
import DashboardPage from "./pages/dashboard/page";

import { backend } from "@declarations/backend";
import LandingPage from "./pages/page";
import AuthPage from "./pages/auth/page";
import RegisterPage from "./pages/auth/register/page";
import { Toaster } from "react-hot-toast";
import CreateProjectPage from "./pages/dashboard/create-project/page";
import SitePage from "./pages/site/[id]/page";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-white z-50"
    ></motion.div>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Toaster />

      <AnimatePresence mode="wait">
        {/* <Navbar /> */}
        {!loading && (
          <Routes location={location} key={location.pathname}>
            {/* DEFAULT PAGES SECTION */}

            <Route path="/" element={<LandingPage />} />

            <Route
              path="/auth"
              element={
                <div className="">
                  <AuthPage />
                </div>
              }
            />

            <Route
              path="/auth/register"
              element={
                <div className="">
                  <RegisterPage />
                </div>
              }
            />
            <Route
              path="/dashboard/create-project"
              element={
                <div className="">
                  <CreateProjectPage />
                </div>
              }
            />

            {/* DASHBOARD SECTION */}
            <Route
              path="/dashboard"
              element={
                <div className="">
                  <DashboardPage />
                </div>
              }
            />

            {/* EDITOR SECTION */}
            <Route
              path="/editor/:id"
              element={
                <div className="">
                  <EditorPage />
                </div>
              }
            />

            {/* PREVIEW SECTION */}
            <Route
              path="/preview/:id"
              element={
                <div className="">
                  <PreviewPage />
                </div>
              }
            />

            <Route
              path="/site/:id"
              element={
                <div className="">
                  <SitePage />
                </div>
              }
            />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  const auth = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  if (!auth) return null;

  const { isAuthenticated, principal } = auth;
  console.log("isAuthenticated ", isAuthenticated);

  useEffect(() => {
    const checkIfRegistered = async () => {
      if (isAuthenticated && principal) {
        try {
          // @ts-ignore
          const result = await backend.getUserByPrincipal(principal);
          result ? setIsRegistered(true) : setIsRegistered(false);
        } catch (error) {
          console.error("Error checking registration:", error);
        }
      }
      setLoading(false);
    };

    if (isAuthenticated && principal) {
      checkIfRegistered();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, principal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main id="pageContent">
      <BrowserRouter>
        {/* @ts-ignore */}
        <AnimatedRoutes />
      </BrowserRouter>
    </main>
  );
};

export default () => (
  <AuthProvider>
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  </AuthProvider>
);
