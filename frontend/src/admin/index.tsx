import { CheckIn } from "./check-in";
import AdminLayout from "./layout";




export const router = {
  element: <AdminLayout />,
  children: [
    { index: true, element: <CheckIn /> },
    /* existing routes */
  ],
}



