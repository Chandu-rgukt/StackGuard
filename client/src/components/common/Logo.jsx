import React from 'react'
import logo from '../../assets/logo.png' // rename and move your uploaded logo here

const Logo = ({ size = 'w-12 h-12' }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img
        src={logo}
        alt="Stackguard Logo"
        className={`${size} object-contain`}
      />
    </div>
  )
}

export default Logo
