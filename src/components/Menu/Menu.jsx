import { NavLink } from "react-router"

const Menu = () => {

  const routes = [
    { to: '/', label: 'Home' },
    { to: '/charts', label: 'Charts' },
    { to: '/tags', label: 'Tags' },
    { to: '/about', label: 'About' },
  ]

  const utilsRoutes = [
    { to: '/app', label: 'App' },
  ]

  return (
    <nav>
      {routes.map((route) => (
        <NavLink key={route.label} to={route.to} className={({ isActive }) => isActive ? "active" : ""}>
          {route.label}
        </NavLink>
      ))}
      <div style={{ flex: 1 }}></div>
      {utilsRoutes.map((route) => (
        <NavLink key={route.label} to={route.to} className={({ isActive }) => isActive ? "active" : ""}>
          {route.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu