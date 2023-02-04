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
} from '@mui/material';
import { drawerWidth } from '../server/static';
import { useSrcDispatch } from '../context/tableContext';

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
    // setListItem(data);
    dispatch({ type: 'setCurrent', current: data });
  }

  React.useEffect(() => {
    setParams(category);
  }, [category]);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <div>
          <Link to="/">
            <Toolbar>Web Development Resources</Toolbar>
          </Link>
          <Divider />
          <List>
            {sideBar.map((each, index) => (
              <Link to={`/${each?.name}`}>
                <ListItem key={each.id} disablePadding onClick={() => setCurrent(each)}>
                  <ListItemButton selected={each.name?.toLowerCase() === params?.toLowerCase()}>
                    <ListItemText primary={each.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </>
  );
}

// non - router version :
//<ListItem key={each.id} disablePadding onClick={() => setCurrent(each)}>
//  <ListItemButton selected={each.name?.toLowerCase() === listItem?.name?.toLowerCase()}>
//      <ListItemText primary={each.name} />
//   </ListItemButton>
//</ListItem>
