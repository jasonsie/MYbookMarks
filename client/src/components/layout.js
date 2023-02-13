import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CssBaseline, CircularProgress } from '@mui/material';
import SideDrawer from './drawer';
import Main from '../views/tables/main';
import { drawerWidth } from '../server/static';
import { useSrcContext } from '../context/tableContext';

const Layout = () => {
  const { sideBar, bookmarks } = useSrcContext();
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const { category } = useParams();
  const tableRef = useRef();

  useEffect(() => {
    if (bookmarks[0] === undefined) return;
    if (category) {
      setSelectedBookmarks(bookmarks.filter((each) => each.ctg.some((each) => each === category)));
    } else {
      setSelectedBookmarks(bookmarks);
    }
    tableRef.current?.init();
  }, [bookmarks, category]);

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <SideDrawer sideBar={sideBar} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: '100vh',
          }}
        >
          {bookmarks[0] == undefined ? (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ) : (
            <Main rows={selectedBookmarks} sideBar={sideBar} ref={tableRef} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
