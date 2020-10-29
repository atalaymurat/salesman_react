import React, { useState, useEffect } from 'react'
import './sideBar.css'
import { Link } from 'react-router-dom'
import CatMenu from '../Leads/CatMenu'

const SideBar = (props) => {
  let sideBarClasses = 'side-bar'
  if (props.show) {
    sideBarClasses = 'side-bar open'
  }

  return (
    <nav className={sideBarClasses} style={{ top: 53, height:'100vh' }}>
      <ul>
        <li>
          <Link to="/" className="makinatr">
            makinaTr
          </Link>
        </li>
        <li>
          <Link to="/makinalar/cat/hepsi">Tüm Makinalar</Link>
        </li>
        <li>
          <CatMenu
            setCatFromMenu={props.setCatFromMenu}
            catSelected={props.catSelected}
          />
        </li>
      </ul>
    </nav>
  )
}

export default SideBar
