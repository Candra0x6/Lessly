import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Copy,
  Pen,
  Search,
  Settings,
  Share2,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";

// truncate url
function truncateUrl(url: string) {
  const maxLength = 30;
  if (url.length <= maxLength) return url;
  return `${url.slice(0, maxLength)}...`;
}

export function PublishProjectDropdown({
  isPublished,
  handlePublish,
  site,
  handleView,
}: {
  isPublished: boolean;
  handlePublish: () => void;
  site: string;
  handleView: () => void;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(site);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="p-3">
      <AnimatePresence mode="wait">
        {!isPublished ? (
          <motion.div
            key="before-publish"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-xl font-medium text-white">Publish to web</h2>
              <p className="text-zinc-400 text-sm">
                Create a website with Notion
              </p>
            </div>

            <div className="border border-zinc-800 rounded-md overflow-hidden">
              <div className="bg-zinc-900 border-b border-zinc-800 p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
                  <span className="text-zinc-400 text-sm">Project</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <div className="w-4 h-4 text-zinc-400">•••</div>
                  <span className="text-zinc-400 text-xs">Made with N</span>
                </div>
              </div>
              <div className="h-48 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 mb-4">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-8 h-1 bg-zinc-400 mb-1"></div>
                    <div className="w-8 h-1 bg-zinc-400 mb-1"></div>
                    <div className="w-8 h-1 bg-zinc-400"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white">Project</h3>
              </div>
            </div>

            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handlePublish}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Publish to web
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="after-publish"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              className="flex items-center border border-zinc-800 rounded-md p-2 bg-zinc-900"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ChevronDown className="w-4 h-4 text-zinc-400 mr-2" />
              <div className="flex-1 truncate text-zinc-400 text-sm">
                {truncateUrl(site)}
              </div>

              <Button
                onClick={handleCopy}
                variant="ghost"
                size="icon"
                className="ml-2 text-zinc-400"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              className="flex pt-4 border-t border-zinc-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="space-x-2 grid grid-cols-2 w-full">
                <Button
                  onClick={handlePublish}
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  Unpublish
                </Button>
                <Button
                  onClick={handleView}
                  className="bg-blue-500 hover:bg-blue-600 text-white "
                >
                  View site
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectSettingDropdown({
  handleEdit,
  handleDelete,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <div className="p-1 w-72">
      <AnimatePresence mode="wait">
        <motion.div
          key="after-publish"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div
              onClick={handleEdit}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-background/80 p-4 rounded-md"
            >
              <div className="flex items-center">
                <Pen className="w-5 h-5 text-zinc-400 mr-3" />
                <span className="text-white">Edit</span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-background/80 p-4 rounded-md">
                  <div className="flex items-center">
                    <Trash2 className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-red-500">Delete</span>
                  </div>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your project and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
