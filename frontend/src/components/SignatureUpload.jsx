import React, { useCallback, useRef, useState, useEffect } from 'react'

export default function SignatureUpload({ label, onFile, file = null }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  // Update preview when file prop changes (e.g., when loading samples)
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }, [file])

  const onChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onFile(file)
    } else {
      setPreview(null)
      onFile(null)
    }
  }

  const openPicker = () => inputRef.current?.click()

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onFile(file)
    }
  }, [onFile])

  return (
    <div className="flex flex-col gap-3 bg-mono-100 rounded-2xl p-5 shadow-mono border border-mono-200">
      <label className="text-mono-800 font-semibold text-sm uppercase tracking-wide">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={[
          'border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center min-h-[160px]',
          'bg-white text-mono-700 transition-all duration-200',
          dragOver ? 'border-accent-500 bg-accent-50' : 'border-mono-300 hover:border-mono-400'
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
        {preview ? (
          <div className="relative group">
            <img src={preview} alt="preview" className="max-h-40 object-contain rounded-lg shadow-mono" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button 
                onClick={openPicker} 
                className="px-3 py-1.5 bg-white text-mono-700 text-sm font-medium rounded-md shadow-mono"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mono-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-mono-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="font-semibold text-mono-800 mb-1">Drag & drop signature here</p>
            <p className="text-sm text-mono-500 mb-3">PNG, JPG up to 10MB</p>
            <button 
              type="button" 
              onClick={openPicker} 
              className="px-4 py-2 rounded-lg text-white bg-accent-gradient hover:scale-[1.02] transition-transform font-medium shadow-mono"
            >
              Choose File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
