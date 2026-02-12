import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../components/sidebar';
import NewEraMainContent from '../components/NewEraMainContent';


const Dashboard = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 1025px)');
    const isUnder1024 = useMediaQuery('(max-width: 1024px)');
  // const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#F5F7F9',
      }}
    >
      <Sidebar
        desktopOpen={isDesktop ? sidebarOpen : undefined}
        onDesktopClose={() => setSidebarOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,  
          overflow: 'hidden', 
          px: { xs: 1, md: 1 },
          pb: { xs: 2, md: 2 },
          pt: '16px',
          mt: isUnder1024 ? '50px' : 0, // 50px margin-top for screens under 1024px
        }}
      >
        <NewEraMainContent
          isSidebarOpen={isDesktop ? sidebarOpen : true}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
