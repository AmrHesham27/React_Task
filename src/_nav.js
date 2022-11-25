/* eslint-disable prettier/prettier */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPlus
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create',
    to: '/create',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
]

export default _nav
