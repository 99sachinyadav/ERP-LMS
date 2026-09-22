import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {


   const { calculateRating } = useContext(AppContext);
  return (
    <Link  to={'/course/'+ course._id}   onClick={()=>scrollTo(0,0)}
     className='group overflow-hidden rounded-lg border border-slate-200 bg-white pb-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
      <div className="relative overflow-hidden p-3 pb-0">
        <img  className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300" src={course.courseThumbnail} alt="" />
        <div className="absolute inset-x-3 bottom-0 top-3 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
        <div className='p-4 text-left space-y-1.5'>
          <h3 className='text-sm font-semibold text-slate-900 line-clamp-2'>{course.courseTitle}</h3>
          <p className=" text-xs text-slate-500">by {course.educator?.name || "Educator"}</p>
          <div className='flex items-center space-x-2 text-xs'>
             <p className="font-semibold text-slate-800">{calculateRating(course)}</p>
              <div className='flex'>
                {[...Array(5)].map((_,i)=>(<img  className="w-3.5 h-3.5" key={i} src={i< Math.floor(calculateRating(course))? assets.star:assets.star_blank} alt='star'/>))}
              </div>
              <p className="text-slate-500">({course.courseRating?.length || 0})</p>
          </div>
          <p className='text-sm font-semibold text-emerald-600'>
            Free
          </p>
        </div>
    </Link>
  )
}

export default CourseCard
