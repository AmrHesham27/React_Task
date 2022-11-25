import Dashboard from './views/Dashboard'
import Create from './views/Create'
import Single from './views/Single'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/create', name: 'Create', element: Create },
  { path: '/invoice/:id', name: 'Create', element: Single },
]

export default routes
