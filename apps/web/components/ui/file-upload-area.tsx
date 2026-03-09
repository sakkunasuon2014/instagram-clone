"use client";

import React, { useRef } from "react";

import { ImageIcon, Upload, X } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadArea({ onFileSelect }: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrag={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef?.current?.click()}
      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-lg font-medium mb-2">Drag photos here</p>
      <p className="text-sm text-muted-foreground mb-4">
        or click to select from your computer
      </p>
      <Button variant="outline">
        <ImageIcon className="w-4 h-4 mr-2" />
        Select from your computer
      </Button>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
