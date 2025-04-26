"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Basket icon
import Image from "next/image";

export default function UploadPage() {
  const [uploadedImages, setUploadedImages] = useState([
    // Already saved images (for demo; replace with your database images)
    { id: 1, url: "/sample1.jpg" },
    { id: 2, url: "/sample2.jpg" },
  ]);

  const handleUpload = () => {
    const newUploads = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newUploads]);
    setSelectedFiles([]);
  };

  const handleDelete = (id) => {
    // setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Image Upload Center</h1>

      <div className="bg-white text-black p-6 rounded-2xl shadow-xl w-full max-w-lg flex flex-col gap-4">
        <input
          type="file"
          className="file:bg-black file:text-white file:rounded file:px-4 file:py-2 file:border-none file:cursor-pointer file:mr-4 text-sm"
        />
        <button
          onClick={handleUpload}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload Images
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 w-full max-w-5xl">
        {uploadedImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={image.url}
              alt="Uploaded"
              width={400}
              height={400}
              className="object-cover w-full h-48 transition-transform group-hover:scale-105"
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-lg opacity-80 hover:opacity-100"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
