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

import ManageUsers from "../pages/admin/ManageUsers";
import AddCar from "../pages/seller/AddCar";
import BrowseCars from "../pages/BrowseCars";
import CarsDetail from "../pages/CarsDetail";
import Transactions from "../pages/users/Transactions";
import SavedCars from "../pages/users/SavedCars";
import UserProfile from "../pages/users/UserProfile";
import SellerProfile from "../pages/seller/SellerProfile";
import MyListings from "../pages/seller/MyListings";
import EditCar from "../pages/seller/EditCar";
import SellerTestDrives from "../pages/seller/SellerTestdrives";
import ManageSellers from "../pages/admin/ManageSellers";

const router  = createBrowserRouter([
    { path: "/", element: <Home /> },
    {path:"/login",element:<Login/>},
    {path:"/signup",element:<Signup/>},
    {path:"/browsecars",element:<BrowseCars/>},
    {path:"/car/:id",element:<CarsDetail />},
    
    {
        path:"/user",element:<ProtectedRoute role="user"><UserNavbar/></ProtectedRoute>,

        children:[
            {index: true,element: <BrowseCars />},
            {path:"dashboard",element: <UserDashboard />},
            {path:"testdrive",element: <TestDrive />},
            {path:"transactions",element:<Transactions />},
            {path:"savedcars",element:<SavedCars />},
            {path:"profile",element:<UserProfile/>},
            
            
        ]
        
    },
    {
        path:"/admin",element:<ProtectedRoute role="admin"><AdminSidebar/></ProtectedRoute>,
        children:[
            {index:"dashboard",element:<AdminDashboard/>},
            {path:"dashboard",element: <AdminDashboard/>},
            {path:"manageusers",element: <ManageUsers />},
            {path:"managesellers",element:<ManageSellers/>}
            
        ]
    },
    {
        path:"/seller",element:<ProtectedRoute role="seller"><SellerNavbar/></ProtectedRoute>,
        children:[
            {index: true,element: <SellerDashboard />},
            {path:"dashboard",element: <SellerDashboard />},
            {path:"addcar",element: <AddCar />},
            {path:"profile",element: <SellerProfile/>},
            {path:"mylistings",element:<MyListings/>},
            {path:"editcar/:id",element:<EditCar/>},
            {path:"testdrive",element:<SellerTestDrives/>}
        ]
        

    }

])
 const AppRouter =()=>{
    return <RouterProvider router={router}></RouterProvider>
 }
 export default AppRouter;