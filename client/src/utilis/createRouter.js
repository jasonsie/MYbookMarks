import { createBrowserRouter, useRouteError } from 'react-router-dom';
import Layout from '../components/layout';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: ':category',
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
]);
