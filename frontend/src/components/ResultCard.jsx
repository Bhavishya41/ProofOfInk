import React from 'react'

export default function ResultCard({ score, error }) {
  if (error) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h3 className="text-mono-800 font-bold text-sm uppercase tracking-wide">RESULT :</h3>
        <div className="flex-1 min-h-[44px] bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 font-semibold shadow-mono flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-3 flex-shrink-0"></div>
          {error}
        </div>
      </div>
    )
  }
  if (score == null) return null

  const pct = Math.round(score * 100)
  const match = score > 0.9
  const message = match ? `Signatures MATCH, Similarity score ${pct}%` : `Signatures DO NOT MATCH, Similarity score ${pct}%`
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <h3 className="text-mono-800 font-bold text-sm uppercase tracking-wide">RESULT :</h3>
      <div className={`flex-1 min-h-[44px] rounded-xl px-4 py-3 font-semibold shadow-mono flex items-center ${
        match 
          ? 'bg-green-50 border border-green-200 text-green-700'
          : 'bg-red-50 border border-red-200 text-red-700'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
          match ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        {message}
      </div>
    </div>
  )
}
