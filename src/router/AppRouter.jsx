import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/HomePage";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";

import { ProtectedRoute } from "./ProtectedRoutes";


import { SellerNavbar } from "../components/seller/SellerNavbar";
import UserDashboard from "../pages/users/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import SellerDashboard from "../pages/seller/SellerDashboard";
import TestDrive from "../pages/users/TestDrive";
import BrowseCars from "../pages/users/BrowseCars";
import ManageUsers from "../pages/admin/ManageUsers";
import AddCar from "../pages/seller/AddCar";


const router  = createBrowserRouter([
    { path: "/", element: <Home /> },
    {path:"/login",element:<Login/>},
    {path:"/signup",element:<Signup/>},
    {
        path:"/user",element:<ProtectedRoute role="user"><UserNavbar/></ProtectedRoute>,
        children:[
            {path:"dashboard",element: <UserDashboard />},
            {path:"testdrive",element: <TestDrive />},
            {path:"browsecars",element: <BrowseCars />},
        ]
        
    },
    {
        path:"/admin",element:<ProtectedRoute role="admin"><AdminSidebar/></ProtectedRoute>,
        children:[
            {path:"dashboard",element: <AdminDashboard/>},
            {path:"manageusers",element: <ManageUsers />},
            
        ]
    },
    {
        path:"/seller",element:<ProtectedRoute role="seller"><SellerNavbar/></ProtectedRoute>,
        children:[
            {path:"dashboard",element: <SellerDashboard />},
            {path:"addcar",element: <AddCar />},
        ]
        

    }

])
 const AppRouter =()=>{
    return <RouterProvider router={router}></RouterProvider>
 }
 export default AppRouter;