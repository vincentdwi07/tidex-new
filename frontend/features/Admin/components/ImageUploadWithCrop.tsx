"use client";

import { useState, useCallback, useRef } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Upload, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { getImageUrl } from "@/lib/api/client";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ImageUploadWithCropProps {
  value?: string | null; // existing image URL (relative path from backend)
  onChange: (file: File) => void;
  aspectRatio?: number;
  label?: string;
  hint?: string;
}

async function getCroppedBlob(
  imageSrc: string,
  pixelCrop: Area,
): Promise<Blob> {
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  const image = await createImageBitmap(blob);

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/webp");
  });
}

export default function ImageUploadWithCrop({
  value,
  onChange,
  aspectRatio = 1,
  label = "Gambar",
  hint,
}: ImageUploadWithCropProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSizeError(
        `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB. File ini ${(file.size / 1024 / 1024).toFixed(1)}MB.`,
      );
      e.target.value = "";
      return;
    }

    setSizeError(null);
    const url = URL.createObjectURL(file);
    setRawSrc(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setModalOpen(true);
    e.target.value = "";
  }

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleSave() {
    if (!rawSrc || !croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedBlob(rawSrc, croppedAreaPixels);
      const file = new File([blob], "image.webp", { type: "image/webp" });
      const previewUrl = URL.createObjectURL(blob);
      setPreview(previewUrl);
      onChange(file);
      setModalOpen(false);
      URL.revokeObjectURL(rawSrc);
      setRawSrc(null);
    } catch {
      // silent
    } finally {
      setProcessing(false);
    }
  }

  function handleCancel() {
    setModalOpen(false);
    if (rawSrc) URL.revokeObjectURL(rawSrc);
    setRawSrc(null);
  }

  // Preview from local crop, or existing value from backend
  const displaySrc = preview ?? (value ? getImageUrl(value) : null);

  // Fixed height preview, width computed from aspect ratio
  // e.g. 1:1 → 160×160px, 4:3 → 213×160px, 16:9 → 284×160px
  const PREVIEW_H = 160;
  const previewW = Math.round(PREVIEW_H * aspectRatio);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs text-gray-600 font-medium">{label}</label>
      )}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}

      {/* Preview / Upload trigger — constrained to computed width */}
      <div
        className="group cursor-pointer"
        style={{ width: previewW, maxWidth: "100%" }}
        onClick={() => inputRef.current?.click()}
      >
        {displaySrc ? (
          <div
            className="relative w-full rounded-md overflow-hidden border border-gray-200 bg-gray-50"
            style={{ height: PREVIEW_H }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displaySrc}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-md transition-opacity">
                Ganti Gambar
              </span>
            </div>
          </div>
        ) : (
          <div
            className="relative w-full border-2 border-dashed border-gray-200 rounded-md hover:border-blue-400 hover:bg-blue-50/30 transition-colors flex flex-col items-center justify-center gap-2"
            style={{ height: PREVIEW_H }}
          >
            <Upload className="w-6 h-6 text-gray-300" />
            <p className="text-xs text-gray-400">Klik untuk pilih gambar</p>
            <p className="text-xs text-gray-300">Maks. {MAX_FILE_SIZE_MB}MB</p>
          </div>
        )}
      </div>

      {/* Size error */}
      {sizeError && <p className="text-xs text-red-500">{sizeError}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Crop Modal */}
      {modalOpen && rawSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                Crop Gambar
              </h3>
              <button
                onClick={handleCancel}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Crop area */}
            <div
              className="relative bg-gray-900"
              style={{
                height: aspectRatio >= 1 ? 320 : Math.round(360 / aspectRatio),
              }}
            >
              <Cropper
                image={rawSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom slider */}
            <div className="px-5 py-4 flex items-center gap-3 border-t border-gray-100">
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 h-1.5 accent-blue-600 cursor-pointer"
              />
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                }}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end px-5 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={processing}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {processing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
