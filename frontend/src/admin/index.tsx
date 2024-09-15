import { CheckIn } from "./check-in";
import AdminLayout from "./layout";
import { Qrcodes } from "./qrcodes";




export const router = {
  element: <AdminLayout />,
  children: [
    { index: true, element: <Qrcodes /> },
    { path:'checkins', element: <CheckIn /> },
    /* existing routes */
  ],
}



