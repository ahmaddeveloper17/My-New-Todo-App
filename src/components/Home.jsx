import React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import { FaHome } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { IoMdToday } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { LiaSignOutAltSolid } from "react-icons/lia";
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Dashboard',
  },
  {
    segment: 'Home',
    title: 'Home',
    icon: <FaHome className='text-2xl' />,
  },
  {
    segment: 'upComing',
    title: 'UpComing',
    icon: <BiTimeFive className='text-2xl' />, // Replace with a relevant icon
  },
  {
    segment: 'today',
    title: 'Today',
    icon: <IoMdToday className='text-2xl' />, // Replace with a relevant icon
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <FaRegCalendarAlt className='text-2xl' />, // Replace with a relevant icon
  },
  {
    segment: 'sticky-wall',
    title: 'Sticky Wall',
    icon: <MdOutlineStickyNote2  className='text-2xl' />, // Replace with a relevant icon
  },
  {
    segment: 'personal',
    title: 'Personal',
    icon: <IoPerson  className='text-2xl' />, // Replace with a relevant icon
  },
  {
    segment: 'work',
    title: 'Work',
    icon: <MdWorkOutline className='text-2xl' />, // Replace with a relevant icon
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'All Todos',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'SignOut',
    title: 'Sign Out',
    icon: < LiaSignOutAltSolid className='text-2xl'/>,
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
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <div className="py-4 flex flex-col items-center text-center">
      <h2>Dashboard content for {pathname}</h2>
    </div>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
