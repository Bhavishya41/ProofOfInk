import React, { useMemo, useState } from 'react'
import SignatureUpload from './components/SignatureUpload'
import ResultCard from './components/ResultCard'
import HogImages from './components/HogImages'
import { verifySignatures } from './lib/api'

function classNames(...parts) {
  return parts.filter(Boolean).join(' ')
}

export default function App() {
  const [sig1, setSig1] = useState(null)
  const [sig2, setSig2] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [score, setScore] = useState(null)
  const [hog1, setHog1] = useState(null)
  const [hog2, setHog2] = useState(null)

  const canVerify = useMemo(() => !!sig1 && !!sig2 && !loading, [sig1, sig2, loading])

  const onVerify = async () => {
    if (!sig1 || !sig2) return
    setLoading(true)
    setError(null)
    try {
      const res = await verifySignatures(sig1, sig2)
      setScore(res.similarity)
      setHog1(res.hog1)
      setHog2(res.hog2)
    } catch (e) {
      setError(e?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[92vw] max-w-[1100px] h-[92vh] bg-mono-50 rounded-3xl shadow-mono-lg p-8 sm:p-10 overflow-y-auto flex flex-col border border-mono-200">
      {/* Header with monochrome styling */}
      <div className="mb-2">
        <h1 className="text-mono-950 text-3xl sm:text-4xl font-bold text-center tracking-tight">Proof Of Ink</h1>
        <div className="mt-3 w-24 h-0.5 bg-accent-gradient mx-auto rounded-full"></div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SignatureUpload label="Choose Signature :" onFile={setSig1} />
        <SignatureUpload label="Choose Signature :" onFile={setSig2} />
      </div>

      <div className="mt-6 flex items-center justify-end">
        <button
          onClick={onVerify}
          disabled={!canVerify}
          className={classNames(
            'px-8 py-3 rounded-xl text-white font-semibold shadow-mono transition-all duration-200',
            canVerify 
              ? 'bg-accent-gradient hover:scale-[1.02] hover:shadow-mono-lg cursor-pointer' 
              : 'bg-mono-400 opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying…
            </span>
          ) : 'Verify'}
        </button>
      </div>

      <div className="mt-6 space-y-6 flex-1">
        <ResultCard score={score} error={error} />
        <HogImages hog1={hog1} hog2={hog2} />
      </div>

      <footer className="mt-8 text-center text-mono-500 text-xs flex items-center justify-center gap-1 font-medium">
        Built by bhavishya with
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline w-4 h-4 text-accent-500 mx-1">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </footer>
    </div>
  )
}
