import * as React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'Home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'UpComing',
    title: 'UpComing',
    icon: <AccessTimeIcon />,
  },
  {
    segment: 'Today',
    title: 'Today',
    icon: <PlaylistAddCheckCircleIcon />,
  },
  {
    segment: 'Calender',
    title: 'Calender',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'Sticky Wall',
    title: 'Sticky Wall',
    icon: <StickyNote2Icon />,
  },
  {
    segment: 'Personal',
    title: 'Personal',
    icon: <PersonIcon />,
  },
  {
    segment: 'Work',
    title: 'Work',
    icon: <WorkIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, userData }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Dashboard content for {pathname}</Typography>
      {userData && (
        <Box mt={4}>
          <Typography variant="h6">Signed In User Details:</Typography>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>
        </Box>
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  userData: PropTypes.object,
};

const demoSession = null;

function DashboardLayoutAccountSidebar(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');
  const [session, setSession] = React.useState(demoSession);
  const [userData, setUserData] = React.useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signIn = (userId) => {
    setSession({ userId }); // Simulating a session with userId
    fetchUserData(userId); // Fetch user data after signing in
  };

  const signOut = () => {
    setSession(null);
    setUserData(null);
  };

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const authentication = React.useMemo(() => {
    return {
      signIn: () => signIn('123'), // Replace '123' with the actual user ID for testing
      signOut,
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        title="Toolpad Dashboard"
        sidebar={null}
        footer={null}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {!session ? (
            <Box>
              <Typography variant="h6">Please sign in to view your dashboard</Typography>
              <button onClick={() => authentication.signIn()}>Sign In</button>
            </Box>
          ) : (
            <Box>
              <button onClick={authentication.signOut}>Sign Out</button>
              <DemoPageContent pathname={pathname} userData={userData} />
            </Box>
          )}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutAccountSidebar;
