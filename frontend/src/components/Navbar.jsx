import React, { useState } from 'react';
import { Box, Typography, Link, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from './PrimaryBtn';
import Logo from '../assets/images/logo.svg';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = [
    { label: 'Features', href: '#features' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'AI Workspace', href: '#ai-workspace' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (e, href) => {
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id) || document.querySelector(href);
    if (!target) return;

    const headerOffset = 90;
    try {
      gsap.to(window, {
        duration: 1.35,
        ease: 'power3.inOut',
        scrollTo: { y: target, offsetY: headerOffset, autoKill: true },
      });
    } catch {
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 2, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: '#FFFFFF',
          borderTop: '1px solid #F5F5F5',
          borderBottom: '1px solid #E0E0E0',
          borderRadius: '999px',
          px: '22px',
          py: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow:
            '0px 10px 8px rgba(0, 0, 0, 0.10), 0px 20px 25px rgba(0, 0, 0, 0.10)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
          <Box
            component="img"
            src={Logo}
            alt="NewEra AI"
            sx={{ width: 154, height: 44, flex: '0 0 auto' }}
          />
        
        </Box>

        {/* Desktop menu */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {menus.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                underline="none"
                sx={{
                  color: '#8E8E8E',
                  fontSize: 14,
                  fontWeight: 600,
                  '&:hover': { color: '#111827' },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        )}

        {!isMobile && (
          <PrimaryButton sx={{ padding: '10px 22px' }} onClick={() => navigate('/signup')}>Login / Signup</PrimaryButton>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <MenuIcon sx={{ color: '#111827' }} />
          </IconButton>
        )}
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            px: 0,
            py: 0,
          },
        }}
      >
        {/* Drawer header with close icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="NewEra AI"
            sx={{ width: 154, height: 44, flex: '0 0 auto' }}
          />
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <CloseIcon sx={{ color: '#111827' }} />
          </IconButton>
        </Box>

        <List sx={{ width: '100%', px: 2, py: 3 }}>
          {menus.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              href={item.href}
              onClick={(e) => {
                handleNavClick(e, item.href);
                setMobileMenuOpen(false);
              }}
              sx={{
                color: '#8E8E8E',
                fontSize: 16,
                fontWeight: 600,
                '&:hover': { color: '#111827' },
                textDecoration: 'none',
                mb: 1,
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2 }}>
            <PrimaryButton
              onClick={() => setMobileMenuOpen(false)}
              sx={{ width: '100%', padding: '12px 24px' }}
            >
              Login / Signup
            </PrimaryButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
