"use client";

import React, { useState } from "react";

export default function UploadButton({ onBase64Upload }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log("Base64 String:", base64String);
      onBase64Upload(base64String); // Pass to parent component
      setIsUploading(false);
    };
    reader.onerror = (err) => {
      console.error("Base64 conversion error:", err);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded inline-block">
        {isUploading ? "Processing..." : "Upload Image"}
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isUploading}
        />
      </label>
    </div>
  );
}