import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import SideDrawer from './drawer';
import Main from '../views/tables/main';
import { drawerWidth } from '../server/static';
import { useSrcContext } from '../context/tableContext';

const Layout = () => {
  const { sideBar, bookmarks, currentSideBar } = useSrcContext();
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    if (bookmarks[0] === undefined) return;
    if (category) {
      setSelectedBookmarks(bookmarks.filter((each) => each.ctg === category));
    } else {
      setSelectedBookmarks(bookmarks);
    }
  }, [bookmarks, category]);

  // useEffect(() => {
  //   if (JSON.stringify(bookmarks) === '{}') return;
  //   if (JSON.stringify(currentSideBar) === '{}') {
  //     setSelectedBookmarks(bookmarks);
  //   } else {
  //     setSelectedBookmarks(bookmarks.filter((each) => each.ctg === currentSideBar.name));
  //   }
  // }, [currentSideBar]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <SideDrawer sideBar={sideBar} />
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Main rows={selectedBookmarks} sideBar={sideBar} />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
