import React from "react";

export default function loading() {
  return (
    <div className="min-h-[90vh] bg-black/90 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-gray-400 font-medium">Loading product...</p>
      </div>
    </div>
  );
}
