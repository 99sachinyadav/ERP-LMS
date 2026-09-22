import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "./SearchBar";

const Hero = () => {
  const { navigate, allCourses, enrolledCourses } = useContext(AppContext);

  return (
    <section className="w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:py-14 lg:min-h-[560px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-10 lg:py-20">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 shadow-sm sm:gap-3 sm:px-4 sm:text-xs">
            <span>Learn</span>
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            <span>Build</span>
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            <span>Achieve</span>
          </div>

          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:mx-0 lg:text-[64px]">
            Build Your Skills,
            <span className="block text-blue-600">Build Your Future.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
            A unified LMS for students and educators to discover courses, manage
            enrollments, continue lessons, and keep academic learning moving in one
            professional ERP experience.
          </p>

          <div className="mx-auto mt-7 max-w-xl lg:mx-0 lg:mt-8">
            <SearchBar />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-8 lg:justify-start">
            <button
              onClick={() => navigate("/course-list")}
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700"
            >
              Explore Courses
            </button>
            <button
              onClick={() => navigate("/my-enrollments")}
              className="rounded-md border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-sm transition-colors hover:bg-blue-50"
            >
              My Enrollment
            </button>
          </div>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mx-0 lg:mt-10">
            <div className="pb-4 sm:pb-0 sm:pr-4">
              <p className="text-xl font-bold text-slate-950 sm:text-2xl">{allCourses.length || "100"}+</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Courses Available</p>
            </div>
            <div className="py-4 sm:px-4 sm:py-0">
              <p className="text-xl font-bold text-slate-950 sm:text-2xl">{enrolledCourses.length || "1,000"}+</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Active Learners</p>
            </div>
            <div className="pt-4 sm:pl-4 sm:pt-0">
              <p className="text-xl font-bold text-slate-950 sm:text-2xl">4.8/5</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="relative order-1 mx-auto block w-full max-w-3xl lg:order-2 lg:min-h-[430px] lg:max-w-none">
          <div className="absolute -right-8 top-2 h-36 w-36 rounded-full bg-blue-100 sm:-right-10 sm:top-4 sm:h-64 sm:w-64 lg:-right-16 lg:top-0 lg:h-80 lg:w-80" />
          <div className="absolute bottom-0 left-4 h-32 w-32 rounded-full bg-sky-100 sm:left-6 sm:h-60 sm:w-60 lg:left-12 lg:h-72 lg:w-72" />
          <img
            src="/lms-hero.png"
            alt="LMS dashboard preview"
            className="relative z-10 mx-auto w-full max-w-[520px] object-contain drop-shadow-xl sm:max-w-[680px] lg:max-w-[760px] lg:drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
