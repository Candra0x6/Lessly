"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { Template } from "@/lib/types";

interface TemplateGridProps {
  templates: Template[];
  selectedTemplate: string | null;
  onSelect: (templateId: string) => void;
}

export default function TemplateGrid({
  templates,
  selectedTemplate,
  onSelect,
}: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Blank template option */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
          selectedTemplate === "blank"
            ? "border-blue-500 shadow-md"
            : "border-border"
        }`}
        onClick={() => onSelect("blank")}
      >
        <div className="aspect-video bg-background flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
            <Plus className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground ">Blank Canvas</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Start from scratch with a clean slate
          </p>
        </div>
        {selectedTemplate === "blank" && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-foreground" />
          </div>
        )}
      </motion.div>

      {/* Template options */}
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ y: -5 }}
          className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
            selectedTemplate === template.id
              ? "border-blue-500 shadow-md"
              : "border-border"
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div
            className="aspect-video bg-cover bg-center"
            style={{ backgroundImage: `url(${template.thumbnail})` }}
          ></div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-foreground">{template.name}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {template.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {template.description}
            </p>
          </div>
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
