'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Email dan password harus diisi!')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/home')
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h1>Login</h1>

      {/* input email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />

      {/* input password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10, padding: 8 }}
      />

      {/* tombol login */}
      <button
        type="button"        // 🔑 pastikan type button
        onClick={handleLogin}
        disabled={loading}
        style={{ width: '100%', padding: 10, cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </div>
  )
}