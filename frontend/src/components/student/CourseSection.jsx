import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
   const {allCourses} = useContext(AppContext);
  return (
    <section className="w-full bg-slate-50 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 text-left sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">Popular Courses</h2>
            <p className="mt-2 text-sm text-slate-500">
              Explore in-demand courses and start learning today.
            </p>
          </div>
          <Link
            to={"/course-list"}
            onClick={() => scrollTo(0, 0)}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            View All Courses
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
           {
            allCourses.slice(0,4).map((course,index)=> <CourseCard key={index} course={course}/>    )
           }
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
