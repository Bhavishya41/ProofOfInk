import React from 'react'

export default function SampleSelector({ 
  label, 
  sampleImages, 
  selectedSample, 
  onSampleChange, 
  file, 
  onFile, 
  preview 
}) {
  return (
    <div className="flex flex-col gap-3 bg-mono-100 rounded-2xl p-5 shadow-mono border border-mono-200">
      <label className="text-mono-800 font-semibold text-sm uppercase tracking-wide">{label}</label>
      
      {/* Sample Selection Dropdown */}
      <div className="relative">
        <select 
          value={selectedSample}
          onChange={(e) => onSampleChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-mono-300 bg-white text-mono-700 font-medium focus:border-accent-500 focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          {sampleImages.map((sample) => (
            <option key={sample.id} value={sample.id}>
              {sample.name} - {sample.description}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-mono-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Image Preview */}
      {preview ? (
        <div className="border-2 border-dashed border-mono-300 rounded-xl p-6 flex flex-col items-center justify-center min-h-[160px] bg-white">
          <div className="relative">
            <img src={preview} alt="Selected sample" className="max-h-40 object-contain rounded-lg shadow-mono" />
          </div>
        </div>
      ) : selectedSample === 'none' ? (
        <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center min-h-[160px] bg-white text-mono-700 border-mono-300">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-mono-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-mono-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="font-semibold text-mono-800 mb-1">Select a sample image</p>
            <p className="text-sm text-mono-500">Choose from the dropdown above</p>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center min-h-[160px] bg-white text-mono-700 border-mono-300">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-semibold text-mono-800 mb-1">Loading sample...</p>
          </div>
        </div>
      )}
    </div>
  )
}
