const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || ''

export async function verifySignatures(signature1, signature2) {
  const form = new FormData()
  form.append('signature1', signature1)
  form.append('signature2', signature2)

  const res = await fetch(`${BASE_URL}/verify`, { method: 'POST', body: form })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Request failed')
  }
  const data = await res.json()
  return {
    similarity: data.similarity_score,
    hog1: `data:image/png;base64,${data.hog_image1}`,
    hog2: `data:image/png;base64,${data.hog_image2}`
  }
}
