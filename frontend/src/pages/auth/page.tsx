"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/utility/use-auth-client";
import Navbar from "@/components/layout/navbar";

export default function AuthPage() {
  const router = useNavigate();
  const [authStatus, setAuthStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const handleAuth = async () => {
    setAuthStatus("loading");

    // Simulate authentication process
    try {
      await login();
      // Simulate successful authentication
      setAuthStatus("success");
    } catch (error) {
      setAuthStatus("error");
      setErrorMessage("Authentication failed. Please try again.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary opacity-20"></div>
              <div className="relative p-6 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                >
                  <Lock className="h-8 w-8 text-blue-500" />
                </motion.div>
              </div>
            </div>

            <div className="p-6">
              <motion.div variants={item} className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Authenticate with Internet Identity
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Securely sign in using Internet Computer's decentralized
                  authentication
                </p>
              </motion.div>

              <motion.div variants={item} className="space-y-4">
                {authStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Authentication Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Secure Authentication
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Internet Identity provides secure, anonymous
                        authentication without passwords or tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAuth}
                  disabled={authStatus === "loading"}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
                >
                  {authStatus === "loading" ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </div>
                  ) : authStatus === "success" ? (
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Authenticated
                    </div>
                  ) : (
                    "Connect with Internet Identity"
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Don't have an Internet Identity?{" "}
                    <a
                      href="https://identity.ic0.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Create one
                    </a>
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Need help?</span>
                <Link to="/help" className="text-blue-500 hover:text-blue-600">
                  Contact support
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By authenticating, you agree to our{" "}
              <Link to="/terms" className="text-blue-500 hover:text-blue-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
