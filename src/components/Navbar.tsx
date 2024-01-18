import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const storageKey ="loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) :null;
const {pathname} =useLocation()

console.log(userData);


  const isLogOut =()=>{
    localStorage.removeItem(storageKey)
    setTimeout(() => {
      location.replace(pathname)
      
    }, 1500);
  }
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
{    userData?.jwt ? <div className="flex  justify-center ali  items-center space-x-3">
<li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/todospag">Todos</NavLink>
        </li>
  <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/profile">My profile</NavLink>
        </li>
  <li className="text-white duration-200 font-semibold text-lg">
            <Button onClick={isLogOut}>LogOut</Button>
          </li>
 
 
</div>  :<p className="flex items-center space-x-3">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/register">Register</NavLink>
        </li>
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/login">Login</NavLink>
        </li>
      </p> }
         
      </ul>
    </nav>
  );
};

export default Navbar;
