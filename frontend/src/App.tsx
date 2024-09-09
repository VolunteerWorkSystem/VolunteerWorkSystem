import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthLayout } from './auth/AuthLayout';
import { VolunteerPage } from './volunteer';
import { router as adminRouter } from './admin';



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


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
