import { NavLink } from "react-router-dom";

const ResponsiveNavBar = ({ isAuthenticated, username, logout }) => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
      <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">
        {isAuthenticated ? (
          <>
            <li>Hi, {username}</li>
            <li onClick={logout} className="cursor-pointer">
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}

        <li className="font-semibold">
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Post
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ResponsiveNavBar;
