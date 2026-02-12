import React, { useState } from 'react'
import { Box, Typography, TextField ,Link} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SecondaryButton from '../components/SecondaryBtn'
import PrimaryButton from '../components/PrimaryBtn'
import { useSnackbar } from '../components/SnackbarProvider'
import logo from '../assets/images/logo.svg'
import sideBg from '../assets/images/sidebg.png'
import badge from '../assets/images/Badge.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { showSuccess, showError } = useSnackbar()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Login failed')
      }

      showSuccess('Login successful')
      navigate('/dashboard')
    } catch (err) {
      showError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  };

  const reviews = [
    {
      text:
        'NewEra AI has completely changed how I work with documents. I can upload files, ask questions instantly, and get accurate answers without reading everything manually.',
      name: 'John Doe',
      role: 'Product Designer & Consultant',
      rating: 5,
    },
    {
      text:
        'The workflow feels insanely smooth — projects, chat, and tools are all in one place. It saves me a ton of time every day.',
      name: 'Aarav',
      role: 'Founder',
      rating: 5,
    },
    {
      text:
        'Clean UI and the AI feels genuinely helpful. Switching tools less means I stay focused and ship faster.',
      name: 'Noah',
      role: 'Developer',
      rating: 5,
    },
  ]
  const [activeReview, setActiveReview] = useState(0)

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#FFFFFF',
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 4, md: 7 },
          py: { xs: 2.5, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <SecondaryButton
            onClick={() => navigate('/')}
            sx={{
              px: '18px',
              py: '8px',
              fontSize: 13,
              borderRadius: '999px',
              borderWidth: '1px',
              boxShadow: '0px 2px 10px rgba(15, 23, 42, 0.08)',
              '& .MuiButton-startIcon': { mr: 0.75 },
            }}
            startIcon={<Typography sx={{ fontSize: 18, lineHeight: 1 }}>←</Typography>}
          >
            Back
          </SecondaryButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto', textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 2.25,
              }}
            >
              <Box component="img" src={logo} alt="NewEra AI" sx={{ width: 120, height: 'auto' }} />
            </Box>

            <Typography sx={{ fontSize: { xs: 28, sm: 32 }, fontWeight: 800, color: '#111827' }}>
              Login
            </Typography>
            <Typography sx={{ mt: 0.75, fontSize: 12.5, fontWeight: 500, color: '#6B7280' }}>
              Log in to continue to your workspace.
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: 'grid',
                gap: 1.5,
              }}
            >
              <Box component="form" onSubmit={handleLogin} sx={{ display: 'grid', gap: 1.5 }}>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      height: 44,
                      borderRadius: 2,
                      bgcolor: '#F9FAFB',
                      '& fieldset': { borderColor: '#E5E7EB' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      height: 44,
                      borderRadius: 2,
                      bgcolor: '#F9FAFB',
                      '& fieldset': { borderColor: '#E5E7EB' },
                    },
                  }}
                />

                <Box sx={{ mt: 1.25 }}>
                  <PrimaryButton
                    type="submit"
                    disabled={loading}
                    sx={{
                      width: '100%',
                      py: 1.25,
                      fontSize: 13,
                      borderRadius: '999px',
                      background: 'linear-gradient(180deg, #111827 0%, #0B0F1A 100%)',
                      '&:hover': {
                        background: 'linear-gradient(180deg, #0B0F1A 0%, #05070D 100%)',
                      },
                    }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </PrimaryButton>
                </Box>
                <Typography sx={{ mt: 1.5, textAlign: 'center', color: '#6B7280', fontSize: 13 }}>
                  Don't have an account? <Link href="/signup" sx={{ color: '#111827', textDecoration: 'underline' }}>Sign up</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'stretch',
          justifyContent: 'center',
          p: '44px',
          width: { md: 620 },
          flex: { md: '0 0 620px' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            backgroundImage: `url(${sideBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.15) 34%, rgba(255,173,0,0.05) 100%)',
            }}
          />

          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: '#FFAD00',
                  lineHeight: '32px',
                }}
              >
                Let’s set up your AI
                <br />
                workspace
              </Typography>

              <Typography
                sx={{
                  mt: 1.25,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: '#111827',
                  maxWidth: 420,
                  opacity: 0.9,
                }}
              >
                Create your account to analyze documents, chat with AI, and automate workflows — all from one powerful, easy-to-use platform.
              </Typography>

              <Box sx={{ mt: 3, display: 'grid', gap: 1.75 }}>
                {[
                  {
                    title: 'All-in-One AI Dashboard',
                    desc: 'Upload PDFs, documents, and files, then ask questions and manage everything from one clean workspace.',
                  },
                  {
                    title: 'Smart AI Chat & Analysis',
                    desc: 'Chat with your documents in real time, get instant answers, summaries, and insights — no manual searching.',
                  },
                  {
                    title: 'Secure & Reliable',
                    desc: 'Your data stays protected with secure authentication and best-practice encryption.',
                  },
                ].map((f) => (
                  <Box key={f.title} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                    <Box component="img" src={badge} alt="" sx={{ width: 22, height: 22, flex: '0 0 auto', mt: '2px' }} />
                    <Box>
                      <Typography sx={{ fontSize: 13.5, fontWeight: 900, color: '#111827' }}>{f.title}</Typography>
                      <Typography sx={{ mt: 0.35, fontSize: 12, fontWeight: 600, color: '#111827', opacity: 0.72 }}>
                        {f.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                maxWidth: 420,
                bgcolor: '#FFFFFF',
                borderRadius: 3,
                p: 2.5,
                boxShadow: '0px 14px 40px rgba(15, 23, 42, 0.18)',
                mx: 'auto',
                alignSelf: 'center',
              }}
            >
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  sx={{
                    display: 'flex',
                    width: `${reviews.length * 100}%`,
                    transform: `translateX(-${activeReview * (100 / reviews.length)}%)`,
                    transition: 'transform 380ms ease',
                  }}
                >
                  {reviews.map((r, idx) => (
                    <Box key={`${r.name}-${idx}`} sx={{ width: `${100 / reviews.length}%`, flex: `0 0 ${100 / reviews.length}%` }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 900, color: '#F59E0B', letterSpacing: 0.5 }}>
                        {'★★★★★'.slice(0, r.rating || 5)}
                      </Typography>
                      <Typography sx={{ mt: 1, fontSize: 12.25, fontWeight: 600, color: '#6B7280', lineHeight: '18px' }}>
                        {r.text}
                      </Typography>
                      <Typography sx={{ mt: 1.25, fontSize: 12.5, fontWeight: 900, color: '#111827' }}>{r.name}</Typography>
                      <Typography sx={{ mt: 0.25, fontSize: 10.5, fontWeight: 700, color: '#6B7280' }}>{r.role}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                {reviews.map((_, idx) => (
                  <Box
                    key={idx}
                    component="button"
                    type="button"
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => setActiveReview(idx)}
                    sx={{
                      width: idx === activeReview ? 26 : 10,
                      height: 10,
                      borderRadius: '999px',
                      border: 'none',
                      bgcolor: idx === activeReview ? '#111827' : '#D1D5DB',
                      cursor: 'pointer',
                      transition: 'all 160ms ease',
                      padding: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
