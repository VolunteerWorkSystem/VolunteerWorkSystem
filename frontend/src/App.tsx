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
import AdminLayout from './admin/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <VolunteerPage /> },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: adminRouter.children[0].element },
          { path: 'checkins', element: adminRouter.children[1].element },
          { path: 'total-hours', element: <VolunteerTotalHours /> },
        ],
      },
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
