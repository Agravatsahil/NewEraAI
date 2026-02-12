import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Typography } from '@mui/material'
import PrimaryButton from '../components/PrimaryBtn'
import SecondaryButton from '../components/SecondaryBtn'
import heroBg from '../assets/images/bg.png'
import dashboardHero from '../assets/images/dashboard-herosec.png'
import logo1 from '../assets/images/logo1.png'
import logo2 from '../assets/images/logo2.png'
import logo3 from '../assets/images/logo3.png'
import logo4 from '../assets/images/logo4.png'
import logo5 from '../assets/images/logo5.png'
import logo6 from '../assets/images/logo6.png'
import logo7 from '../assets/images/logog7.png'
import box1Bg from '../assets/images/box1bg.png'
import imageUnderstanding from '../assets/images/Image Understanding & Generation.png'
import box2Bg from '../assets/images/box2bg.png'
import stacksImage from '../assets/images/stacks image.png'
import mikeImage from '../assets/images/mike.png'
import box4Img from '../assets/images/box4 img.png'
import box5Img from '../assets/images/box5.png'
import box5Bg from '../assets/images/box5bg.png'
import integrationsBg from '../assets/images/bg-integration.png'
import sticky1 from '../assets/images/sticy1.png'
import sticky2 from '../assets/images/stikcy2.png'
import sticky3 from '../assets/images/sticky3.png'
import reviewBg from '../assets/images/review bg.png'
import reviewImg1 from '../assets/images/review img1.png'
import review1 from '../assets/images/review1.png'
import review2 from '../assets/images/review2.png'
import review3 from '../assets/images/review3.png'
import review4 from '../assets/images/review4.png'
import ctaBg from '../assets/images/CTA bg.png'
import footerBg from '../assets/images/Footers.png'
import logo from '../assets/images/logo.svg'
import socialIcon1 from '../assets/images/Social Icons.png'
import socialIcon2 from '../assets/images/Social Icons (1).png'
import socialIcon3 from '../assets/images/Social Icons (2).png'
import socialIcon4 from '../assets/images/Social Icons (3).png'
import newEraFooterText from '../assets/images/NewEra AI.png'
import PhysicsPills from '../components/PhysicsPills'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function LandingPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('.gsap-reveal')
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]
  const stickyCards = [
    {
      title: 'AI-Powered Projects',
      description: 'Plan, generate, and execute faster with smart AI workflows built directly into your projects.',
      image: sticky1,
    },
    {
      title: 'Talk. Command. Create.',
      description: 'Use voice to ask, build, and control — your AI listens, understands, and acts instantly.',
      image: sticky2,
    },
    {
      title: 'Pro Mode Unlocked',
      description: 'Access faster responses, deeper intelligence, and exclusive tools built for power users.',
      image: sticky3,
    },
  ]

  const reviews = [
    {
      name: 'Ciara',
      location: 'Los Angeles, USA',
      text:
        'NewEra feels like an AI control center. The dashboard, voice assistant, and Pro mode make everyday tasks faster and more intuitive.',
      image: reviewImg1,
      rating: 5,
    },
    {
      name: 'Aarav',
      location: 'Mumbai, India',
      text:
        'The workflow feels insanely smooth — projects, chat, and tools are all in one place. It saves me a ton of time every day.',
      image: review1,
      rating: 5,
    },
    {
      name: 'Sophia',
      location: 'Berlin, Germany',
      text:
        'Clean UI, smart assistance, and the integrations make it feel like a complete productivity system, not just another chatbot.',
      image: review2,
      rating: 5,
    },
    {
      name: 'Noah',
      location: 'Toronto, Canada',
      text:
        'The design is clean and the AI feels genuinely helpful. Switching tools less means I stay focused and ship faster.',
      image: review3,
      rating: 5,
    },
    {
      name: 'Mia',
      location: 'London, UK',
      text:
        'Everything I need is in one dashboard. It feels like a modern workspace, not a bunch of separate apps stitched together.',
      image: review4,
      rating: 5,
    },
  ]

  const [activeReview, setActiveReview] = useState(0)
  const handlePrevReview = () => setActiveReview((i) => (i - 1 + reviews.length) % reviews.length)
  const handleNextReview = () => setActiveReview((i) => (i + 1) % reviews.length)

  const faqs = [
    {
      q: 'Is NewEra free to use?',
      a: 'Yes. You can start using NewEra for free. We also offer a Pro plan with advanced features and higher limits.',
    },
    {
      q: 'What do I get with NewEra Pro?',
      a: 'Pro unlocks faster responses, higher usage limits, and access to advanced tools designed for power users.',
    },
    {
      q: 'How is NewEra different from other AI tools?',
      a: 'NewEra is built as a complete AI workspace — projects, chat, voice, and tools together — so you can build and ship faster.',
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes. You can cancel anytime from your account settings. Your plan will remain active until the end of the billing period.',
    },
    {
      q: 'Is my data safe with NewEra?',
      a: 'We take security seriously and follow best practices to protect your data. You stay in control of what you share.',
    },
    {
      q: 'Does NewEra support voice input?',
      a: 'Yes. You can use voice to interact with NewEra so you can work hands-free and faster.',
    },
  ]
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>
      <Box sx={{ pt: { xs: 2, md: 3 } }}>
        <Navbar />
      </Box>

      <Box
        sx={{
          mt: { xs: 6, md: '0px' },
          px: { xs: 2, md: '80px' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: { xs: 6, md: 8 },
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pt: { xs: 6, md: 10 },
            pb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              px: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 34, sm: 44, md: 64 },
                fontWeight: 700,
                lineHeight: { xs: '42px', sm: '54px', md: '78px' },
                color: '#0F0F0F',
              }}
            >
              What will you build today?
            </Typography>

            <Typography
              sx={{
                mt: { xs: 0.5, md: 1 },
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: 34, sm: 44, md: 64 },
                fontStyle: 'italic',
                fontWeight: 700,
                lineHeight: { xs: '42px', sm: '54px', md: '78px' },
                color: '#F59E0B',
              }}
            >
              Build Faster with AI
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2, md: 2.5 },
                maxWidth: 760,
                fontFamily:
                  'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 16, sm: 18, md: 28 },
                fontWeight: 500,
                lineHeight: { xs: '24px', md: '40px' },
                color: '#555555',
              }}
            >
              NewEra is your AI workspace to think, create, and solve faster all from one powerful dashboard.
            </Typography>

            <Box
              sx={{
                mt: { xs: 3, md: 4 },
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <SecondaryButton sx={{ padding: '10px 22px' }}>View Demo</SecondaryButton>
              <PrimaryButton sx={{ padding: '10px 22px' }}>Start Free</PrimaryButton>
            </Box>
          </Box>

          <Box
            sx={{
              mt: { xs: 4, md: 6 },
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: -10, md: '-220px' },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              component="img"
              src={dashboardHero}
              alt="Dashboard preview"
              sx={{
                width: '100%',
                maxWidth: 980,
                px: { xs: 2, sm: 3 },
                borderRadius: { xs: 4, md: 6 },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: { xs: 120, md: 220 } }} />

      <Box
        sx={{
          px: { xs: 2, md: '80px' },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1100,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2.5, sm: 3.5, md: 5 },
            flexWrap: 'wrap',
            opacity: 0.55,
          }}
        >
          {partnerLogos.map((src, idx) => (
            <Box
              key={idx}
              component="img"
              src={src}
              alt={`partner-logo-${idx + 1}`}
              sx={{
                height: { xs: 18, sm: 20, md: 24 },
                width: 'auto',
                filter: 'grayscale(100%)',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        id="features"
        className="gsap-reveal"
        sx={{
          px: { xs: 2, md: '80px' },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto' ,mt:'100px'}}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              sx={{
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 32, sm: 40, md: 52 },
                fontWeight: 800,
                lineHeight: { xs: '40px', md: '60px' },
                color: '#0F0F0F',
              }}
            >
              <Box component="span" sx={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700 }}>
                Everything
              </Box>{' '}
              You Can Do with NewEra
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: 500,
                color: '#555555',
              }}
            >
              One AI platform designed to help you create, learn, and build smarter.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(5, minmax(0, 1fr))' },
              gap: { xs: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                gridColumn: { xs: 'auto', md: '1 / -1' },
                bgcolor: '#FCFCFC',
                border: '1px solid #E9E9EA',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: { xs: 2.5, md: 3 }, pb: { xs: 0, md: 0 } }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Image Understanding & Generation
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, fontWeight: 500, color: '#4B5563' }}>
                  Ask AI about any image or create new ones from prompts.
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: { xs: 5, md: 5 },
                  height: { xs: 220, sm: 260, md: 280 },
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={box1Bg}
                  alt="bento-bg-1"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    // width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    // opacity: 0.9,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <Box
                  component="img"
                  src={imageUnderstanding}
                  alt="Image Understanding"
                  sx={{
                    position: 'absolute',
                    left: { xs: '50%', md: 'auto' },
                    right: { xs: 'auto', md: 24 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    bottom: { xs: -4, md: -12 },
                    width: { xs: '92%', sm: '80%', md: 520 },
                    maxWidth: 560,
                    height: 'auto',
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                gridColumn: { xs: 'auto', md: 'span 3' },
                bgcolor: '#FCFCFC',
                border: '1px solid #E9E9EA',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 280, md: 320 },
                position: 'relative',
              }}
            >
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Intelligent Conversations
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, fontWeight: 500, color: '#4B5563' }}>
                  Get step-by-step guidance and clear answers for any topic.
                </Typography>
              </Box>
              <Box
                component="img"
                src={box2Bg}
                alt="bento-bg-2"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: { xs: 140, md: 180 },
                  objectFit: 'cover',
                //   opacity: 0.9,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 16,
                  right: 16,
                  bottom: 14,
                }}
              >
                <PhysicsPills height={260} />
              </Box>
            </Box>

            <Box
              sx={{
                gridColumn: { xs: 'auto', md: 'span 2' },
                bgcolor: '#FCFCFC',
                border: '1px solid #E9E9EA',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 280, md: 320 },
                position: 'relative',
              }}
            >
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Voice-Powered Assistance
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, fontWeight: 500, color: '#4B5563' }}>
                  Talk to AI in real time and get hands-free answers while you work.
                </Typography>
              </Box>
              <Box
                component="img"
                src={mikeImage}
                alt="voice"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: 18,
                  width: { xs: 230, md: 270 },
                  height: 'auto',
                }}
              />
            </Box>

            <Box
              sx={{
                gridColumn: { xs: 'auto', md: 'span 2' },
                bgcolor: '#FCFCFC',
                border: '1px solid #E9E9EA',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 280, md: 320 },
                position: 'relative',
              }}
            >
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Flexible AI Models
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, fontWeight: 500, color: '#4B5563' }}>
                  Choose the best AI model for coding, reasoning, or creativity.
                </Typography>
              </Box>
              <Box
                component="img"
                src={box4Img}
                alt="models"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: 18,
                  width: { xs: '88%', md: '82%' },
                  maxWidth: 520,
                  height: 'auto',
                }}
              />
            </Box>

            <Box
              sx={{
                gridColumn: { xs: 'auto', md: 'span 3' },
                bgcolor: '#FCFCFC',
                border: '1px solid #E9E9EA',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 280, md: 320 },
                position: 'relative',
              }}
            >
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Collaborate & Code Faster
                </Typography>
                <Typography sx={{ mt: 0.75, fontSize: 13, fontWeight: 500, color: '#4B5563' }}>
                  Write, debug, and share code directly with AI support.
                </Typography>
              </Box>
              <Box
                component="img"
                src={box5Bg}
                alt="bento-bg-5"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: { xs: 150, md: 190 },
                  objectFit: 'cover',
                  opacity: 0.9,
                }}
              />
              <Box
                component="img"
                src={box5Img}
                alt="code"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: 18,
                  width: { xs: '92%', md: '86%' },
                  maxWidth: 560,
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

     

      <Box
        id="integrations"
        className="gsap-reveal"
        sx={{
          px: { xs: 2, md: '80px' },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: { xs: 6, md: 8 },
            backgroundImage: `url(${integrationsBg})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: { xs: 420, sm: 520, md: 720, lg: 820 },
            py: { xs: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 6 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: 34, sm: 44, md: 56 },
                fontStyle: 'italic',
                fontWeight: 800,
                lineHeight: { xs: '42px', sm: '54px', md: '66px' },
                color: '#0F0F0F',
              }}
            >
              Plug In. Power Up.
            </Typography>

            <Typography
              sx={{
                mt: { xs: 1.25, md: 1.5 },
                fontFamily:
                  'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 16, sm: 18, md: 20 },
                fontWeight: 500,
                lineHeight: { xs: '24px', md: '30px' },
                color: '#555555',
              }}
            >
              Connect NewEra to your favorite tools and watch your workflow level up instantly.
            </Typography>

            <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'center' }}>
              <PrimaryButton sx={{ padding: '10px 22px' }}>Power Up Your Stack</PrimaryButton>
            </Box>
          </Box>
        </Box>
      </Box>
       <Box
        id="ai-workspace"
        className="gsap-reveal"
        sx={{
          px: { xs: 2, md: '80px' },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              sx={{
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 30, sm: 38, md: 48 },
                fontWeight: 800,
                lineHeight: { xs: '38px', md: '56px' },
                color: '#0F0F0F',
              }}
            >
              Where{' '}
              <Box component="span" sx={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700 }}>
                AI Work
              </Box>{' '}
              Comes Together
            </Typography>
            <Typography
              sx={{
                mt: 1,
                maxWidth: 720,
                mx: 'auto',
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 15, sm: 16, md: 18 },
                fontWeight: 500,
                color: '#555555',
              }}
            >
              From intelligent projects to voice assistance and advanced Pro tools — everything lives in one powerful dashboard.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
            {stickyCards.map((card, idx) => (
              <Box
                key={card.title}
                sx={{
                  bgcolor: '#FCFCFC',
                  border: '1px solid #E7E7E7',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: { xs: 'relative', md: 'sticky' },
                  top: { md: 96 + idx * 28 },
                  zIndex: 10 + idx,
                }}
              >
                <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography
                    sx={{
                      fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      fontSize: 28,
                      fontWeight: 800,
                      color: '#111827',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.75,
                      fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      fontSize: 18,
                      fontWeight: 500,
                      color: '#4B5563',
                      maxWidth: 820,
                    }}
                  >
                    {card.description}
                  </Typography>

                  <Box
                    component="img"
                    src={card.image}
                    alt={card.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      mt: { xs: 2, md: 2.5 },
                      borderRadius: 3,
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        id="reviews"
        className="gsap-reveal"
        sx={{
          width: '100%',
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundImage: `url(${reviewBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: { xs: 6, md: 8 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', px: { xs: 2, md: '80px' } }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: { xs: 30, sm: 38, md: 48 },
                  fontWeight: 800,
                  lineHeight: { xs: '38px', md: '56px' },
                  color: '#0F0F0F',
                }}
              >
                What People Are{' '}
                <Box component="span" sx={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 700 }}>
                  Saying About NewEra
                </Box>
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: { xs: 15, sm: 16, md: 18 },
                  fontWeight: 500,
                  color: '#555555',
                }}
              >
                Real feedback from users building smarter with AI every day.
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 4, md: 6 }, position: 'relative' }}>
              <Box sx={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 920,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: `${reviews.length * 100}%`,
                      transform: `translateX(-${activeReview * (100 / reviews.length)}%)`,
                      transition: 'transform 420ms ease',
                      mx: -1.25,
                    }}
                  >
                    {reviews.map((review, idx) => (
                      <Box
                        key={`${review.name}-${idx}`}
                        sx={{
                          width: `${100 / reviews.length}%`,
                          flex: `0 0 ${100 / reviews.length}%`,
                          px: 1.25,
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E7E7E7',
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0px 10px 30px rgba(17, 24, 39, 0.08)',
                            p: 2,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'stretch', sm: 'center' },
                            gap: '20px',
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: '100%', sm: 240 },
                              height: { xs: 268, sm: 268 },
                              borderRadius: '10px',
                              overflow: 'hidden',
                              boxShadow: '0px 0px 27px 12px rgba(0,0,0,0.06)',
                              flexShrink: 0,
                            }}
                          >
                            <Box
                              component="img"
                              src={review.image}
                              alt={review.name}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              pr: { sm: 1 },
                              py: { xs: 0, sm: 0 },
                              minHeight: { sm: 268 },
                            }}
                          >
                            <Box>
                              <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#F59E0B' }}>
                                {'★★★★★'}
                              </Typography>
                              <Typography
                                sx={{
                                  mt: 1,
                                  fontFamily:
                                    'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                  fontSize: { xs: 14, sm: 15, md: 16 },
                                  fontWeight: 500,
                                  lineHeight: { xs: '22px', md: '26px' },
                                  color: '#374151',
                                }}
                              >
                                {review.text}
                              </Typography>
                            </Box>

                            <Box sx={{ mt: { xs: 2, md: 2.5 } }}>
                              <Typography
                                sx={{
                                  fontFamily:
                                    'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                  fontSize: 13,
                                  fontWeight: 800,
                                  color: '#111827',
                                }}
                              >
                                {review.name}
                              </Typography>
                              <Typography
                                sx={{
                                  mt: 0.25,
                                  fontFamily:
                                    'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: '#6B7280',
                                }}
                              >
                                {review.location}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box
                component="button"
                onClick={handlePrevReview}
                aria-label="Previous review"
                sx={{
                  position: 'absolute',
                  left: { sm: -22, md: -28 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: '1px solid #E7E7E7',
                  bgcolor: '#FFFFFF',
                  cursor: 'pointer',
                  display: { xs: 'none', sm: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  lineHeight: '22px',
                }}
              >
                ‹
              </Box>

              <Box
                component="button"
                onClick={handleNextReview}
                aria-label="Next review"
                sx={{
                  position: 'absolute',
                  right: { sm: -22, md: -28 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  border: '1px solid #E7E7E7',
                  bgcolor: '#FFFFFF',
                  cursor: 'pointer',
                  display: { xs: 'none', sm: 'inline-flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  lineHeight: '22px',
                }}
              >
                ›
              </Box>
            </Box>

            <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'center', gap: 1 }}>
              {reviews.map((_, idx) => (
                <Box
                  key={idx}
                  component="button"
                  onClick={() => setActiveReview(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  sx={{
                    width: idx === activeReview ? 28 : 10,
                    height: 10,
                    borderRadius: '999px',
                    border: 'none',
                    bgcolor: idx === activeReview ? '#111827' : '#D1D5DB',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                    padding: 0,
                  }}
                />
              ))}
            </Box>

            <Box sx={{ mt: 2, display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', gap: 1.5 }}>
              <Box
                component="button"
                onClick={handlePrevReview}
                aria-label="Previous review"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: '999px',
                  border: '1px solid #E7E7E7',
                  bgcolor: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                Prev
              </Box>
              <Box
                component="button"
                onClick={handleNextReview}
                aria-label="Next review"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: '999px',
                  border: '1px solid #E7E7E7',
                  bgcolor: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                Next
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        id="faq"
        className="gsap-reveal"
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', px: { xs: 2, md: '80px' } }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 36, sm: 48, md: 56 },
                fontWeight: 800,
                lineHeight: { xs: '44px', md: '64px' },
                color: '#0F0F0F',
              }}
            >
              Questions?
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: 36, sm: 48, md: 56 },
                fontStyle: 'italic',
                fontWeight: 700,
                lineHeight: { xs: '44px', md: '64px' },
                color: '#0F0F0F',
              }}
            >
              We&apos;ve Got Answers.
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 15, sm: 16, md: 18 },
                fontWeight: 500,
                color: '#6B7280',
              }}
            >
              Everything you need to know about NewEra, pricing, and how our AI works.
            </Typography>
          </Box>

          <Box sx={{ mt: { xs: 5, md: 7 } }}>
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <Box
                  key={item.q}
                  sx={{
                    borderBottom: '1px solid #E5E7EB',
                    py: { xs: 2.5, md: 3 },
                  }}
                >
                  <Box
                    component="button"
                    onClick={() => setOpenFaq((cur) => (cur === idx ? null : idx))}
                    aria-expanded={isOpen}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2,
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontSize: { xs: 16, sm: 17, md: 18 },
                        fontWeight: 700,
                        color: '#111827',
                      }}
                    >
                      {idx + 1}. {item.q}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontSize: 26,
                        fontWeight: 400,
                        color: '#6B7280',
                        lineHeight: '26px',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 180ms ease',
                        userSelect: 'none',
                      }}
                    >
                      +
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 240ms ease',
                    }}
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? 'translateY(0px)' : 'translateY(-4px)',
                        transition: 'opacity 200ms ease, transform 240ms ease',
                      }}
                    >
                      <Typography
                        sx={{
                          mt: 1.25,
                          pr: { xs: 0, md: 6 },
                          fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontSize: { xs: 14, sm: 15, md: 16 },
                          fontWeight: 500,
                          lineHeight: { xs: '22px', md: '26px' },
                          color: '#4B5563',
                        }}
                      >
                        {item.a}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>

      <Box className="gsap-reveal" sx={{ width: '100%', pb: { xs: 10, md: 14 } }}>
        <Box sx={{ width: '100%', maxWidth: 1320, mx: 'auto', px: { xs: 2, md: '80px' } }}>
          <Box
            sx={{
              width: '100%',
              borderRadius: { xs: 4, md: 6 },
              backgroundImage: `url(${ctaBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              py: { xs: 7, md: 9 },
              px: { xs: 2.5, sm: 4, md: 6 },
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 26, sm: 34, md: 42 },
                fontWeight: 800,
                lineHeight: { xs: '34px', md: '52px' },
                color: '#0F0F0F',
              }}
            >
              Start Building with{' '}
              <Box
                component="span"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                }}
              >
                NewEra
              </Box>{' '}
              Today
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: { xs: 13, sm: 14, md: 15 },
                fontWeight: 500,
                color: '#111827',
                opacity: 0.85,
              }}
            >
              Experience smarter AI, faster workflows, and powerful tools — all in one dashboard.
            </Typography>

            <Box sx={{ mt: { xs: 3, md: 3.5 }, display: 'flex', justifyContent: 'center' }}>
             <PrimaryButton>Start Free</PrimaryButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          pt: { xs: 8, md: 10 },
          pb: { xs: 10, md: '246px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1320, mx: 'auto', px: { xs: 2, md: '80px' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: { xs: 5, md: 8 },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ maxWidth: 360 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="NewEra AI"
                  sx={{ width: 120, height: 'auto', display: 'block' }}
                />
              </Box>

              <Typography
                sx={{
                  mt: 2,
                  fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontSize: 12.5,
                  fontWeight: 500,
                  lineHeight: '18px',
                  color: '#6B7280',
                }}
              >
                Think smarter, build faster, and create better with one powerful AI workspace.
              </Typography>

              <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', gap: 1.4 }}>
                {[
                  { src: socialIcon1, aria: 'Social icon 1' },
                  { src: socialIcon2, aria: 'Social icon 2' },
                  { src: socialIcon3, aria: 'Social icon 3' },
                  { src: socialIcon4, aria: 'Social icon 4' },
                ].map((ic) => (
                  <Box
                    key={ic.aria}
                    component="button"
                    aria-label={ic.aria}
                    sx={{
                      width: 18,
                      height: 18,
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box component="img" src={ic.src} alt="" sx={{ width: 18, height: 18, display: 'block' }} />
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                columnGap: { xs: 6, md: 10 },
                rowGap: 5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#111827',
                    mb: 1.5,
                  }}
                >
                  Quick Links
                </Typography>
                {['Careers', 'Help and support', 'Blog', 'Sitemap'].map((t) => (
                  <Typography
                    key={t}
                    component="a"
                    href="#"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: '#6B7280',
                      py: 0.6,
                      '&:hover': { color: '#111827' },
                    }}
                  >
                    {t}
                  </Typography>
                ))}
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#111827',
                    mb: 1.5,
                  }}
                >
                  Legal
                </Typography>
                {['Privacy Policy', 'Terms of service', 'Terms of use'].map((t) => (
                  <Typography
                    key={t}
                    component="a"
                    href="#"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      fontFamily: 'Geist, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: '#6B7280',
                      py: 0.6,
                      '&:hover': { color: '#111827' },
                    }}
                  >
                    {t}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          component="img"
          src={newEraFooterText}
          alt="NewEra AI"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 0,
            width: '100%',
            maxWidth: 1320,
            height: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </Box>
    </Box>
  )
}

export default LandingPage