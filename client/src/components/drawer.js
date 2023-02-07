import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Toolbar,
  ListItemText,
  ListItemButton,
  List,
  ListItem,
  Drawer,
  Divider,
  Box,
} from '@mui/material';
import { drawerWidth } from '../server/static';
import { useSrcDispatch } from '../context/tableContext';

const style = {
  drawer: {
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: ' 1.2rem',
    fontWeight: 'bold',
    letterSpacing: '0.2em',
  },
  sideBarText: {
    maxWidth: '100%',
    textTransform: 'uppercase',
    fontSize: ' 0.9rem',
    letterSpacing: '0.1em',
    textAlign: 'right',
  },
};

export default function SideDrawer(props) {
  const { sideBar } = props;
  const dispatch = useSrcDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [params, setParams] = React.useState(undefined);
  const { category } = useParams();
  // const [listItem, setListItem] = React.useState({});
  // const container = window !== undefined ? () => window().document.body : undefined;

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  function setCurrent(data) {
    dispatch({ type: 'setCurrent', current: data });
  }

  React.useEffect(() => {
    setParams(category);
  }, [category]);

  return (
    <>
      <Drawer variant="permanent" sx={style['drawer']} open>
        <Box sx={style['flexContainer']}>
          <Link to="/">
            <Toolbar sx={style['title']}>WEB. TAG</Toolbar>
          </Link>
          <Divider />
          <List>
            {sideBar.map((each, index) => (
              <Link to={`/${each?.name}`} key={index}>
                <ListItem disablePadding onClick={() => setCurrent(each)}>
                  <ListItemButton selected={each?.name.toLowerCase() === params?.toLowerCase()}>
                    <ListItemText
                      primary={each.name}
                      // disableTypography
                      style={style['sideBarText']}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}
