import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className='flex items-center gap-4'>
          {/* <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-white font-extrabold text-base shadow-md">
              S
            </div>
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Sdemy
            </span>
          </div> */}
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
                   <span className="text-lg font-bold tracking-tight text-slate-500 sm:text-xl">
                     LMS
                   </span>
                   <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
                     Learning Management
                   </span>
                 </div>
               </button>
           <div className='hidden md:block h-7 w-px bg-gray-300/60 dark:bg-slate-700'></div>
            <p className='py-4 text-center text-xs md:text-sm text-gray-500 dark:text-slate-400'>
              Copyright 2026 @ RKGITM. All Right Reserved
            </p>
        </div>
      
       <div className='flex items-center gap-3 max-md:mt-4'>
          <a href="#">
             < img src={assets.facebook_icon} alt="facebook_icon"/>
          </a>
          <a href="#">
             < img src={assets.twitter_icon} alt="facebook_icon"/>
          </a>
          <a href="#">
             < img src={assets.instagram_icon} alt="facebook_icon"/>
          </a>
       </div>

    </footer>
  )
}

export default Footer