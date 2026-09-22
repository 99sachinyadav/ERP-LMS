import React, { useContext } from 'react'

import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
const Navbar = () => {
  const {userData, logout} = useContext(AppContext)
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
     <Link to='/'>  
     <button
            type="button"
            
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-blue-50 shadow-sm transition-shadow group-hover:shadow-md">
              <img
                src={assets.rkgitm_logo}
                alt="RKGITM logo"
                className="h-8 w-8 object-contain"
              />
            </span>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                LMS
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
                Learning Management
              </span>
            </div>
          </button>
     </Link>
     <div className='flex items-center gap-5 text-gray-500 relative'>
         <p>Hi! {userData? userData.name:'Developers'}</p>
         {userData? <button onClick={logout} className='text-sm text-blue-600'>Logout</button>:<img className='max-w-8' src={assets.profile_img}/>}
     </div>
    </div>
  )
}

export default Navbar
