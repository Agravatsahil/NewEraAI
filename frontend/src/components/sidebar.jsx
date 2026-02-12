import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, useMediaQuery, TextField, InputAdornment, Avatar, Collapse, Menu, MenuItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import sidebarOpenCloseIcon from '../assets/images/sidebar-open-close-icon.svg';
import searchIcon from '../assets/images/search-icon.svg';
import newChatIcon from '../assets/images/newchat-icon.svg';
import Logo from '../assets/images/logo.svg';
import folderIcon from '../assets/images/folder-icon.svg';
import avatarImage from '../assets/images/avatar.png';
import UpgradeCard from './UpgradeCard';
import { AppContext } from '../Context';
import { useSnackbar } from '../components/SnackbarProvider';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 248;
const ITEM_HEIGHT = 48;

const Sidebar = ({ desktopOpen, onDesktopClose }) => {
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [internalDesktopOpen, setInternalDesktopOpen] = React.useState(true);
  const [projectOpen, setProjectOpen] = React.useState(true);
  const [recentOpen, setRecentOpen] = React.useState(true);
  const [activeChat, setActiveChat] = React.useState('NewEra AI Project');
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
  const [profileMenuPosition, setProfileMenuPosition] = React.useState(null);

  const { allThreads, setAllThreads, currentUserId, isNewChat, setIsNewChat, prompt, setPrompt, reply, setReply, currentThreadId, setCurrentThreadId, prevChatId, setPrevChatId } = React.useContext(AppContext);
  const { showSuccess, showError } = useSnackbar();
  const navigate = useNavigate();

  const profileMenuOpen = Boolean(profileMenuAnchor);

  const handleOpenProfileMenu = (e) => {
    e?.stopPropagation?.();
    const el = e?.currentTarget || e?.target || null;
    setProfileMenuAnchor(el);

    if (el && typeof el.getBoundingClientRect === 'function') {
      const rect = el.getBoundingClientRect();
      setProfileMenuPosition({
        top: Math.round(rect.bottom),
        left: Math.round(rect.right),
      });
    } else {
      setProfileMenuPosition(null);
    }
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
    setProfileMenuPosition(null);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Logout failed');
      }

      showSuccess('Logged out successfully');
      navigate('/login');
    } catch (err) {
      showError(err?.message || 'Logout failed');
    } finally {
      handleCloseProfileMenu();
    }
  };

  const getallThreads = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/threads`);
      const data = await response.json();
      const filteredThreads = data.map(thread => ({ threadId: thread.threadId, title: thread.title }));
      setAllThreads(filteredThreads);
      // console.log(filteredThreads)
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }

  useEffect(() => {
    getallThreads();
  }, [currentUserId])

  const projects = ['MERN Stack', 'JavaScript'];
  // const recentChats = [];

  const createNewChat = () => {
    setIsNewChat(true);
    setPrompt('');
    setReply(null);
    setCurrentThreadId(uuidv4());
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    if (isDesktop) {
      if (onDesktopClose) {
        onDesktopClose();
      } else {
        setInternalDesktopOpen(false);
      }
    } else {
      setMobileOpen(false);
    }
  };

  const changeThread = async (newthreadId) => {
    setCurrentThreadId(newthreadId);
    setActiveChat(allThreads.find(thread => thread.threadId === newthreadId));

    try {
      const response = await fetch(`http://localhost:8080/api/threads/${newthreadId}`);
      const data = await response.json();
      // console.log('API Response from changeThread:', data);
      // console.log('Messages array:', data.messages);

      // Wrap the array in the expected format
      const formattedData = { messages: Array.isArray(data) ? data : [] };
      setPrevChatId(formattedData);
      setIsNewChat(false);
      // console.log('Set prevChatId to:', formattedData);
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  }

  const deleteThread = async (threadId, e) => {
    e.stopPropagation();
    console.log('Deleting thread:', threadId);

    try {
      const response = await fetch(`http://localhost:8080/api/threads/${threadId}`, { method: 'DELETE', });

      if (response.ok) {
        showSuccess('Thread deleted successfully');
        // Refresh the threads list
        // await getallThreads();
        setAllThreads(allThreads.filter(thread => thread.threadId !== threadId));

        // If deleted thread was active, create new chat
        if (currentThreadId === threadId) {
          createNewChat();
        }
      } else {
        console.error('Failed to delete thread');
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  }

  const isDesktopOpen = isDesktop
    ? (typeof desktopOpen === 'boolean' ? desktopOpen : internalDesktopOpen)
    : false;

  const SidebarContent = () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F5F7F9',
        color: '#111827',
        px: 2,
        pt: 2,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src={Logo} alt="logo" />
        </Box>
        <IconButton
          size="small"
          onClick={handleSidebarClose}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Box
            component="img"
            src={sidebarOpenCloseIcon}
            alt="Sidebar toggle"
            sx={{ height: 24, width: 24 }}
          />
        </IconButton>

      </Box>

      <Box sx={{ mb: '16px' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  component="img"
                  src={searchIcon}
                  alt="Search"
                  sx={{ height: 24, width: 24 }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography
                  variant="caption"
                  sx={{ color: '#9CA3AF', fontWeight: 500, fontSize: '18px' }}
                >
                  ⌘P
                </Typography>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '8px',
              bgcolor: '#F9FAFB',


              boxShadow: 'inset 0px 2px 2px rgba(0, 0, 0, 0.25)',

              '& fieldset': {
                borderColor: '#E5E7EB',
              },

              '&:hover fieldset': {
                borderColor: '#E5E7EB',
              },

              '&.Mui-focused fieldset': {
                borderColor: '#E5E7EB',
              },
            },
          }}
        />

      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: '12px',
            py: '10px',
            borderRadius: 2,
            cursor: 'pointer',
            color: '#4B5563',
            '&:hover': {
              bgcolor: '#E5E7EB',
            },
          }}
          onClick={createNewChat}
        >
          <Box
            component="img"
            src={newChatIcon}
            alt="New chat"
            sx={{ height: 20, width: 20 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: '16px', color: '#757575' }}
          >
            New Chat
          </Typography>
        </Box>

        <Box
          sx={{
            borderBottom: '1px solid #E5E7EB',
            mb: 2,
          }}
        />

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              mb: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: '16px',
                color: '#757575',
                fontWeight: 600,
              }}
            >
              Project
            </Typography>
            <IconButton
              size="small"
              onClick={() => setProjectOpen((prev) => !prev)}
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{
                  transform: projectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: '#6B7280',
                  '&:hover': {
                    color: '#111827',
                  },
                }}
              />
            </IconButton>
          </Box>
          <Collapse in={projectOpen}>
            {projects.map((project) => (
              <Box
                key={project}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: '12px',
                  py: '8px',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#E5E7EB',
                  },
                }}
              >

                <Box
                  component="img"
                  src={folderIcon}
                  alt="Project folder"
                  sx={{ width: 20, height: 20 }}
                />

                <Typography variant="body2" sx={{ color: '#757575', fontSize: '16px' }}>
                  {project}
                </Typography>
              </Box>
            ))}
          </Collapse>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 0.5,
              padding: '8px 12px',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: '16px',
                color: '#757575',
                fontWeight: 600,
              }}
            >
              Recent Chats
            </Typography>
            <IconButton
              size="small"
              onClick={() => setRecentOpen((prev) => !prev)}
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{
                  transform: recentOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: '#6B7280',
                  '&:hover': {
                    color: '#111827',
                  },
                }}
              />
            </IconButton>
          </Box>
          <Collapse in={recentOpen}>
            {allThreads.map((thread) => {
              const isActive = activeChat === thread;
              return (
                <Box
                  key={thread.threadId}
                  onClick={(e) => changeThread(thread.threadId)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: '12px',
                    py: '12px',
                    borderRadius: 2,
                    cursor: 'pointer',
                    mb: 0.5,
                    ml: 1,
                    mr: 1,
                    color: isActive ? '#0A0A0A' : '#757575',
                    bgcolor: isActive ? '#FFFFFF' : 'transparent',
                    border: isActive ? '1px solid #EFEFEF' : 'none',
                    boxShadow: isActive
                      ? '0px 2px 8px rgba(0, 0, 0, 0.08)'
                      : 'none',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.8)',

                      '& .delete-icon-hover': {
                        opacity: 1,
                        visibility: 'visible'
                      }
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1,
                    }}
                  >
                    {thread.title}
                  </Typography>
                  <IconButton
                    className="delete-icon-hover"
                    onClick={(e) => deleteThread(thread.threadId, e)}
                    sx={{
                      p: 0,
                      size: 'small',
                      bgcolor: 'transparent',
                      opacity: isActive ? 1 : 0,
                      visibility: isActive ? 'visible' : 'hidden',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        color: '#EF4444',
                        fontSize: '16px',
                        '&:hover': {
                          color: '#DC2626',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    />
                  </IconButton>
                </Box>
              );
            })}
            {/* {allThreads.map((thread) => (
              <Box
                key={thread.threadId}
                onClick={() => openThread(thread.threadId)}
                sx={{
                  padding: 1.5,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#F3F4F6',
                  },
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  {thread.title}
                </Typography>
              </Box>
            ))} */}

          </Collapse>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>

        {/* <UpgradeCard /> */}
        <Box
          sx={{
            mt: 2,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            bgcolor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0px 2px 10px rgba(15, 23, 42, 0.16)',

          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Avatar
              alt="Sahil"
              src={avatarImage}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Sahil
            </Typography>
          </Box>
          <IconButton
            aria-label="more"
            id="profile-menu-button"
            aria-controls={profileMenuOpen ? 'profile-menu' : undefined}
            aria-expanded={profileMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            size="small"
            onClick={handleOpenProfileMenu}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorReference={profileMenuPosition ? 'anchorPosition' : 'anchorEl'}
            anchorPosition={profileMenuPosition || undefined}
            anchorEl={profileMenuPosition ? null : profileMenuAnchor}
            open={profileMenuOpen}
            onClose={handleCloseProfileMenu}
            disablePortal
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: '0px 10px 30px rgba(15, 23, 42, 0.14)',
                },
              },
              list: {
                'aria-labelledby': 'profile-menu-button',
              },
            }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{ fontSize: 13, fontWeight: 700, color: '#EF4444' }}
            >
              Logout
            </MenuItem>
          </Menu>


        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile navbar */}
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          display: isDesktop ? 'none' : 'flex',
          bgcolor: '#F5F7F9',
          color: '#000',
          boxShadow: 'none',
          borderBottom: '0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{ height: 28 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <IconButton
              color="inherit"
              size="small"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop ? isDesktopOpen : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isDesktop ? (isDesktopOpen ? drawerWidth : 0) : drawerWidth,
          flexShrink: 0,
          overflowX: 'hidden',
          transition: isDesktop
            ? 'width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)'
            : 'none',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#F5F7F9',
            borderRight: 'none',
            boxShadow: 'none',
            ...(isDesktop && {
              transition: 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              transform: isDesktopOpen ? 'translateX(0)' : 'translateX(-100%)',
            }),
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
