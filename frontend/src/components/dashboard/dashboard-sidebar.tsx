"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  FolderOpen,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Home,
  PlusCircle,
  Users,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, href, active, collapsed }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
        active
          ? "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/dashboard" },
    {
      icon: <LayoutGrid className="h-5 w-5" />,
      label: "Projects",
      href: "/dashboard",
      active: true,
    },
    {
      icon: <FolderOpen className="h-5 w-5" />,
      label: "Templates",
      href: "/dashboard/templates",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team",
      href: "/dashboard/team",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Billing",
      href: "/dashboard/billing",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/dashboard/settings",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Help",
      href: "/dashboard/help",
    },
  ];

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 flex flex-col",
        collapsed ? "items-center" : ""
      )}
    >
      <div className={cn("p-4", collapsed ? "flex justify-center" : "")}>
        {collapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h.01" />
            <path d="M12 7h.01" />
            <path d="M17 7h.01" />
            <path d="M7 12h.01" />
            <path d="M12 12h.01" />
            <path d="M17 12h.01" />
            <path d="M7 17h.01" />
            <path d="M12 17h.01" />
            <path d="M17 17h.01" />
          </svg>
        ) : (
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500 mr-2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M12 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 12h.01" />
              <path d="M12 12h.01" />
              <path d="M17 12h.01" />
              <path d="M7 17h.01" />
              <path d="M12 17h.01" />
              <path d="M17 17h.01" />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              WebCanister
            </span>
          </Link>
        )}
      </div>

      <div
        className={cn(
          "mt-6 flex-1 px-3 space-y-1",
          collapsed ? "w-full flex flex-col items-center" : ""
        )}
      >
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={item.active}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className={cn("p-4", collapsed ? "w-full flex justify-center" : "")}>
        {!collapsed && (
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 mx-auto flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </motion.aside>
  );
}
