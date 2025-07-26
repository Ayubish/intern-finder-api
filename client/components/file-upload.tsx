"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
    onFileChange: (file: File | null) => void
    accept?: string
    maxSize?: number // in MB
    currentFile?: File | null
}

export function FileUpload({ onFileChange, accept = "image/*", maxSize = 5, currentFile }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = (file: File) => {
        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`)
            return
        }

        onFileChange(file)

        // Create preview for images
        if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => setPreview(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const removeFile = () => {
        onFileChange(null)
        setPreview(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-2">
            {preview || currentFile ? (
                <div className="relative">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                        {preview && (
                            <img src={preview || "/placeholder.svg"} alt="Logo preview" className="w-16 h-16 object-cover rounded" />
                        )}
                        <div className="flex-1">
                            <p className="text-sm font-medium">{currentFile?.name || "Logo uploaded"}</p>
                            <p className="text-xs text-gray-500">
                                {currentFile ? `${(currentFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
                            </p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={removeFile}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Drop your file here, or click to browse</p>
                            <p className="text-xs text-gray-500">PNG, JPG up to {maxSize}MB</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
