import { UserNavbar } from "./user/UserNavbar";
import { SellerNavbar } from "./seller/SellerNavbar";
import PublicNavbar from "./PublicNavbar";

export default function DynamicNavbar() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <PublicNavbar />;

  if (role === "user") return <UserNavbar />;
  if (role === "seller") return <SellerNavbar />;

  return <PublicNavbar />;
}