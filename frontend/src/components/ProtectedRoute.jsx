import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        })

        if (cancelled) return

        if (res.ok) {
          setStatus('authed')
        } else {
          setStatus('unauthed')
        }
      } catch {
        if (!cancelled) setStatus('unauthed')
      }
    }

    checkAuth()

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') return null
  if (status === 'unauthed') return <Navigate to="/login" replace />

  return children
}
