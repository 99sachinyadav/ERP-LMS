import React, { useContext, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'
import { AppContext } from '../../context/AppContext'
import EducatorVerificationModal from '../../components/student/EducatorVerificationModal'

const Educator = () => {
  const { iseducator, userData, authToken } = useContext(AppContext);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const navigate = useNavigate();

  // If user is not logged in
  if (!authToken) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center'>
        <div className='max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200'>
          <h2 className='text-xl font-bold text-slate-800 mb-2'>Login Required</h2>
          <p className='text-sm text-slate-500 mb-6'>
            You need to be logged in to access the educator portal.
          </p>
          <button
            onClick={() => navigate('/')}
            className='px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition'
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // If logged in, but not an educator yet
  if (userData && !iseducator) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center'>
        <div className='max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200'>
          <div className='w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4'>
            <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          </div>
          <h2 className='text-xl font-bold text-slate-800 mb-2'>Educator Access Required</h2>
          <p className='text-sm text-slate-500 mb-6'>
            This portal is restricted to authorized educators. Please enter the common Educator ID to activate educator privileges.
          </p>
          <div className='flex items-center justify-center gap-3'>
            <button
              onClick={() => navigate('/')}
              className='px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition'
            >
              Back to Home
            </button>
            <button
              onClick={() => setShowVerifyModal(true)}
              className='px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-sm'
            >
              Verify Educator ID
            </button>
          </div>
        </div>
        {showVerifyModal && (
          <EducatorVerificationModal onClose={() => setShowVerifyModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className='text-default min-h-screen bg-white'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Educator;