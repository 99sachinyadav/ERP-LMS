import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {
    
  const navigate = useNavigate()
  const [input ,setInput] = useState(data?data:'')

  const onSearchHandler = (e)=>{
    e.preventDefault();
     navigate('/course-list/'+input)
  }
  return (
    
       <form action="" onSubmit={onSearchHandler} className='flex h-12 w-full max-w-xl items-center rounded-full border border-slate-200 bg-white px-3 shadow-sm transition-colors focus-within:border-blue-300 sm:px-4'>
         <img src={assets.search_icon} alt="Search Icon" className='h-4 w-4 opacity-70' />
         <input value={input} onChange={e=>setInput(e.target.value)} type="text"  placeholder='Search courses, topics...' className='h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:px-3'  />
         <button type='submit' className='rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:px-5' >Search</button>
       </form>
    
  )
}

export default SearchBar
