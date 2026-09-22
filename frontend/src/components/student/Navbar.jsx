import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import AuthModal from "./AuthModal";
import EducatorVerificationModal from "./EducatorVerificationModal";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const {
    navigate,
    iseducator,
    backendUrl,
    setiseducator,
    getToken,
    userData,
    logout,
  } = useContext(AppContext);
  const [showAuth, setShowAuth] = useState(false);
  const [showEducatorModal, setShowEducatorModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navLinkClass = ({ isActive }) =>
    `relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  const onSearchHandler = (event) => {
    event.preventDefault();
    const query = searchInput.trim();
    navigate(query ? `/course-list/${query}` : "/course-list");
  };

  const becomeEducator = async () => {
    if (iseducator) {
      navigate("/educator");
      return;
    }

    const token = await getToken();
    if (!token || !userData) {
      setShowAuth(true);
      return;
    }

    setShowEducatorModal(true);
  };

  return (
    <div
      className={`sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 shadow-sm sm:px-8 md:flex-nowrap md:px-8 lg:px-16 xl:px-24 ${
        isCourseListPage ? "bg-white" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <button
        type="button"
        onClick={() => navigate("/")}
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

      <nav className="hidden items-center gap-1 md:flex lg:gap-2">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/course-list" className={navLinkClass}>
          Courses
        </NavLink>
        {userData && (
          <NavLink to="/my-enrollments" className={navLinkClass}>
            My Enrollment
          </NavLink>
        )}
        {userData && iseducator && (
          <button onClick={() => navigate("/educator")} className={navLinkClass({ isActive: false })}>
            Educator Dashboard
          </button>
        )}
      </nav>

      <div className="hidden flex-1 items-center justify-end gap-2 md:flex lg:gap-3">
        <form
          onSubmit={onSearchHandler}
          className="flex h-10 w-full max-w-[210px] items-center rounded-full border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-blue-300 focus-within:bg-white lg:max-w-xs"
        >
          <img src={assets.search_icon} alt="" className="h-4 w-4 opacity-70" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            type="text"
            placeholder="Search courses, topics..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </form>

        {userData ? (
          <>
            {!iseducator && (
              <button
                onClick={becomeEducator}
                className="hidden rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 lg:inline-flex"
              >
                Become Educator
              </button>
            )}
            <button
              onClick={logout}
              className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Login / Register
          </button>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-1 text-xs font-medium text-slate-600 sm:gap-2 md:hidden">
        {userData ? (
          <>
            <Link
              className="rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100"
              to="/course-list"
            >
              Courses
            </Link>
            <Link
              className="whitespace-nowrap rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100"
              to="/my-enrollments"
            >
              Learn
            </Link>
            <button
              className="max-w-[74px] truncate rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100"
              onClick={becomeEducator}
            >
              {iseducator ? "Dashboard" : "Educator"}
            </button>
            <button
              onClick={logout}
              className="shrink-0 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 font-semibold text-red-700 sm:px-3"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100"
              to="/course-list"
            >
              Courses
            </Link>
            <button
              onClick={() => setShowAuth(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm"
              aria-label="Login or register"
            >
              <img src={assets.user_icon} alt="" className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showEducatorModal && (
        <EducatorVerificationModal onClose={() => setShowEducatorModal(false)} />
      )}
    </div>
  );
};

export default Navbar;
