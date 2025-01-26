import { NavLink } from "react-router"

const Menu = () => {

  const routes = [
    { to: '/', label: 'Index' },
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav>
      {routes.map((route) => (
        <NavLink key={route.label} to={route.to} className={({ isActive }) => isActive ? "active" : ""}>
          {route.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu