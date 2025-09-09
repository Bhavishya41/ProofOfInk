import React from 'react'

export default function HogImages({ hog1, hog2 }) {
  if (!hog1 && !hog2) return null
  return (
    <div className="text-mono-800">
      <h3 className="font-bold text-sm uppercase tracking-wide mb-4">HOG PROCESSING IMAGES</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hog1 && (
          <div className="bg-mono-100 rounded-xl p-4 shadow-mono border border-mono-200">
            <h4 className="text-xs font-semibold text-mono-600 mb-2 uppercase tracking-wide">Signature 1 - HOG Analysis</h4>
            <img 
              src={hog1} 
              className="w-full h-[160px] rounded-lg shadow-mono object-contain bg-white border border-mono-200" 
              alt="HOG Analysis 1" 
            />
          </div>
        )}
        {hog2 && (
          <div className="bg-mono-100 rounded-xl p-4 shadow-mono border border-mono-200">
            <h4 className="text-xs font-semibold text-mono-600 mb-2 uppercase tracking-wide">Signature 2 - HOG Analysis</h4>
            <img 
              src={hog2} 
              className="w-full h-[160px] rounded-lg shadow-mono object-contain bg-white border border-mono-200" 
              alt="HOG Analysis 2" 
            />
          </div>
        )}
      </div>
    </div>
  )
}
