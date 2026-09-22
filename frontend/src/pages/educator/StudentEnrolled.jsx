import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled, assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentEnrolled = () => {
  const {backendUrl,  iseducator,getToken} = useContext(AppContext)
   const [enrolledStudents,setenrolledStudents]=useState(null)

    const fetchEnrolledStudents = async()=>{
        try {
          const token =await getToken();
          // console.log(token)
           const {data}= await axios.get(backendUrl+'/api/educator/enrolled-students',{
        headers:{
          Authorization: `Bearer ${token}`
        }
       })
          console.log(data)
       if(data.success){
          setenrolledStudents(data.enrolledStudents.reverse())
       }
       else{
         toast.error(data.message)
       }
        } catch (error) {
          toast.error(error.message)
        }
    }

    useEffect(()=>{
     if(iseducator){
         fetchEnrolledStudents();
     }
    },[iseducator])
  return enrolledStudents?(
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
       <div className='flex flex-col items-center max-w-4xl w-full  overflow-hidden  rounded-md bg-white border border-gray-500/20'>
        <table className='table-fixed md:table-auto w-full  overflow-hidden pb-4'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                 <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                  <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
                 </tr>
          </thead>
          <tbody className='text-sm text-gray-500'>
              {enrolledStudents.map((item,index)=>(
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
                   <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                     {item.student?.imageUrl ? (
                       <img
                         src={item.student.imageUrl}
                         alt="Student"
                         onError={(e) => {
                           e.currentTarget.onerror = null;
                           e.currentTarget.src = assets.user_icon;
                         }}
                         className='w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-50'
                       />
                     ) : (
                       <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600">
                         <img src={assets.user_icon} alt="Student" className="h-5 w-5 opacity-70" />
                       </span>
                     )}
                     <span className='truncate'>{item.student?.name || "Student"}</span>
                   </td>
                   <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                   <td className='px-4 py-3 hidden sm:table-cell'>{new Date(item.purchaseData).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
       </div>
    </div>
  ): <Loading/>
}

export default StudentEnrolled