import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { CarList } from "../components/user/CarList";
import { CarDetail } from "../components/user/CarDetail";
import { AllUserList } from "../components/admin/AllUserList";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import LoginT from "../components/LoginT";
import { ManageUsers } from "../components/admin/ManageUsers";
import { SellerNavbar } from "../components/seller/SellerNavbar";
import { Dashboard } from "../components/seller/Dashboard";

const router  = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/logint",element:<LoginT/>},
    {path:"/signup",element:<Signup/>},
    {
        path:"/user",element:<UserNavbar/>,
        children:[
            {path:"carlist",element:<CarList/>},
            {path:"cardetail",element:<CarDetail/>},
            {path:"getapidemo",element:<GetApiDemo/>},
            {path:"useeffectdemo",element:<UseEffectDemo/>}
        ]
    },
    {
        path:"/admin",element:<AdminSidebar/>,
        children:[
            {path:"alluserlist",element:<AllUserList/>},
            {path:"manage-users",element:<ManageUsers/>}

        ]
    },
    {
        path:"/seller",element:<SellerNavbar/>,
        children:[
            {
                path:"dashboard",element:<Dashboard/>
            }
        ]

    }

])
 const AppRouter =()=>{
    return <RouterProvider router={router}></RouterProvider>
 }
 export default AppRouter;