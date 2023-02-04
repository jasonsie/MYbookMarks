import './App.css';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { SrcProvider } from './context/tableContext';
import Layout from './components/layout';
import { router } from './utilis/createRouter';

function App() {
  return (
    <>
      <SrcProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {/* <Layout /> */}
          <RouterProvider router={router} />
        </SnackbarProvider>
      </SrcProvider>
    </>
  );
}

export default App;
