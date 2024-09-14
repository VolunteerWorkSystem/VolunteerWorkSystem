import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthLayout } from './auth/AuthLayout';
import { VolunteerPage } from './volunteer';
import { router as adminRouter } from './admin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <VolunteerPage /> },
      { path: 'admin', ...adminRouter },
      /* existing routes */
    ],
  },
]);

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </>
  )
}

export default App
