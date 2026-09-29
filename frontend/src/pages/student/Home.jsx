import React from 'react'
import Hero from '../../components/student/Hero'
import CourseSection from '../../components/student/CourseSection'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'

const Home = () => {
  const features = [
    {
      title: 'Structured Learning',
      description: 'Organized courses with clear lessons, chapters, and milestones.',
      icon: 'M12 6v12m6-6H6',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Interactive Content',
      description: 'Videos, quizzes, assignments, and practical exercises.',
      icon: 'M8 7h8M8 12h8M8 17h5',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Get Certified',
      description: 'Complete learning paths and showcase your skills.',
      icon: 'M12 3l2.4 4.8 5.3.8-3.8 3.7.9 5.2L12 15l-4.8 2.5.9-5.2-3.8-3.7 5.3-.8L12 3z',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Learn Anywhere',
      description: 'Access your courses on web and mobile devices.',
      icon: 'M9 2h6a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2zm3 17h.01',
      color: 'bg-rose-100 text-rose-700',
    },
  ]
 const teachers = [
  {
    name: 'Prof.(Dr.) Rakesh Goel',
    role: 'Maths Faculty',
    image: assets.Director,
    description: 'Prof. Rakesh Goel, a postgraduate from IIT Kanpur, has 26 years of Government of India experience, including 21 years in N.I.C., Uttar Pradesh. He joined RKGITM in 2008 after taking V.R.S. and received the President’s Medal in 1991. ',
    tag: 'Director, RKGITM',
  },
  {
    name: 'Dr. Manorma Sharma',
    role: 'Chemistry Faculty',
    image: assets.Dean,
    description: 'Dr. Manorma Sharma holds an M.Sc. in Organic Chemistry & Ph.D. in Biochemistry from LLRM Medical College. Associated with RKG Group since 2000,she has over 27 years of teaching experience & has served in various academic ,administrative roles.',
    tag: 'Dean Academics, RKGITM',
  },
  {
    name: 'Ms. Nidhi Garg',
    role: 'Computer Network Faculty',
    image: assets.Nidhi,
    description: 'Ms. Nidhi Garg is an accomplished academician with 23 years of experience in education. She has 12+ research papers and 2 patents to her credit and actively promotes research, innovation, and holistic student development.',
    tag: 'HOD CSE',
  },
  {
    name: 'Mr. Sandeep Singh',
    role: 'Electrical Engineering Faculty',
    image: assets.Sandeep,
    description: 'Mr. Sandeep Singh has extensive experience in teaching, research, and academic administration in Electronics & Communication Engineering. He is committed to student development, academic excellence, and strengthening the ECE department.',
    tag: 'HOD ECE',
  },
];

  return (
    <div className='min-h-screen bg-white text-slate-950'>
       <Hero/>
       <section className='w-full bg-white py-10 sm:py-12'>
        <div className='mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10'>
          {features.map((feature) => (
            <article key={feature.title} className='text-left'>
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl sm:mb-5 sm:h-14 sm:w-14 ${feature.color}`}>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-6 w-6 sm:h-7 sm:w-7'>
                  <path d={feature.icon} />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-slate-950'>{feature.title}</h3>
              <p className='mt-3 max-w-xs text-sm leading-6 text-slate-500'>{feature.description}</p>
            </article>
          ))}
        </div>
       </section>
       <CourseSection/>
       <section className='w-full bg-white py-12 sm:py-14 lg:py-16'>
        <div className='mx-auto max-w-7xl px-5 text-left sm:px-8 lg:px-10'>
          <div className='mb-8 max-w-2xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-sm'>Faculty Spotlight</p>
            <h2 className='mt-3 text-2xl font-bold text-slate-950 sm:text-3xl'>Popular Teachers</h2>
            <p className='mt-3 text-sm leading-6 text-slate-500'>
              Learn from experienced faculty members who combine academic clarity with practical, career-focused guidance.
            </p>
          </div>

          <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
            {teachers.map((teacher) => (
              <article key={teacher.name} className='rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
                <div className='flex items-center gap-4'>
                  <img src={teacher.image} alt={teacher.name} className='h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-blue-50 sm:h-16 sm:w-16' />
                  <div className='min-w-0'>
                    <h3 className='truncate text-base font-bold text-slate-950'>{teacher.name}</h3>
                    <p className='mt-1 text-xs font-medium text-slate-500'>{teacher.role}</p>
                  </div>
                </div>
                <p className='mt-5 text-sm leading-6 text-slate-600'>{teacher.description}</p>
                <div className='mt-5 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700'>
                  {teacher.tag}
                </div>
              </article>
            ))}
          </div>
        </div>
       </section>
       <Footer/>
    </div>
  )
}

export default Home
