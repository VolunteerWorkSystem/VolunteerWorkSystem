import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthLayout } from './auth/AuthLayout';
import { VolunteerPage } from './volunteer';
import { router as adminRouter } from './admin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider, useSnackbar } from './snackbar/context';
import { NotificationDialog } from './snackbar/components';
import VolunteerTotalHours from './volunteer/VolunteerTotalHours';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <VolunteerPage /> },
      { path: 'total-hours', element: <VolunteerTotalHours /> },
      { path: 'admin', ...adminRouter },
      /* existing routes */
    ],
  },
]);

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <SnackbarProvider>

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <SnackbarSection />
      </SnackbarProvider>
    </>
  )
}

function SnackbarSection() {
  const { snackbar, setSnackbar } = useSnackbar()
  // return (
  //   <Snackbar
  //     open={snackbar.open}
  //     severity={snackbar.severity}
  //     onClose={() => setSnackbar({ ...snackbar, open: false })}
  //     timeout={snackbar?.timeout || 5000}
  //   >
  //     {snackbar.message}
  //   </Snackbar>
  // )
  return (
    <NotificationDialog
      open={snackbar.open}
      message={snackbar.message}
      isError={snackbar.severity === 'error'}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
    ></NotificationDialog>
  )
}

export default App
