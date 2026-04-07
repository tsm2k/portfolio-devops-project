"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filePath: string;
  fileType: "pdf" | "image";
}

export default function CertificationModal({
  isOpen,
  onClose,
  title,
  filePath,
  fileType,
}: CertificationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
            aria-label="Close modal"
          >
            <X size={24} className="text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {fileType === "pdf" ? (
            <iframe
              src={filePath}
              className="w-full h-[70vh] border-0 rounded"
              title={title}
            />
          ) : (
            <img
              src={filePath}
              alt={title}
              className="w-full h-auto rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
}
