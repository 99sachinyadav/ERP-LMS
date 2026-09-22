import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const currency = import.meta.env.VITE_CURRENCY;
  const [allCourses, setAllCourses] = useState([]);
  const [iseducator, setiseducator] = useState(false);
  const [enrolledCourses, setenrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null)
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("sdemy-token") || "");
  const getToken = async () => authToken;
  //   Fetch all Courses

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");
       console.log(data)
      if (data.success) {
      
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

//   fetch user data 

const fetchuserdata = async()=>{
       try {
              const token = await  getToken();
              if (!token) return;
              const {data} = await axios.get(backendUrl + '/api/user/data',{
                     headers:{
                            Authorization:`Bearer ${token}`
                     }
              })

              //  console.log(data)
              if(data.success){
                     setUserData(data.user)
                     setiseducator(data.user.role === 'educator')
              }
              else{
                     toast.error(data.message)
              }
       } catch (error) {
              toast.error(error.message)
       }
}

  // function to calculate rating
  const calculateRating = (course) => {
    if (course.courseRating.length === 0) return 0;
    let totalrating = 0;
    course.courseRating.forEach((rating) => {
      totalrating += rating.rating;
    });
    return Math.floor(totalrating / course.courseRating.length);
  };

  //  function to calculate course chapter time

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //  Function to Calculate Course Duration

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //  function to calculate no of lecture in the course

  const calculateNoOfLectures = (course) => {
    let noOfLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        noOfLectures += chapter.chapterContent.length;
      }
    });
    return noOfLectures;
  };

  // fetch User Enrolled Courses

  const fetchUserEnrolledCources = async (sessionToken) => {
     try {
        const token = sessionToken || await getToken();
        if (!token) return;
  
        const {data}= await axios.get(backendUrl +'/api/user/enrolled-courses',{
          headers:{
                Authorization:`Bearer ${token}`
          }
        })
  
        if(data.success){
              console.log(data.enrolledCourses.enrolledCourses)
          setenrolledCourses(data.enrolledCourses.enrolledCourses.reverse())
        }
        else{
          toast.error(data.message)
        }
     } catch (error) {
        toast.error(error.message)
     }
  };
  useEffect(() => {
    fetchAllCourses();
    
  }, []);

  const saveSession = (token, user) => {
    localStorage.setItem("sdemy-token", token);
    setAuthToken(token);
    setUserData(user);
    setiseducator(user.role === "educator");
  };

  const login = async (email, password) => {
    const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
    if (data.success) {
      saveSession(data.token, data.user);
      toast.success("Logged in successfully");
      await fetchUserEnrolledCources(data.token);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
    if (data.success) {
      saveSession(data.token, data.user);
      toast.success("Account created");
      await fetchUserEnrolledCources(data.token);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("sdemy-token");
    setAuthToken("");
    setUserData(null);
    setiseducator(false);
    setenrolledCourses([]);
    navigate("/");
  };

  useEffect(() => {
    if (authToken) {
      fetchuserdata();
      fetchUserEnrolledCources();
    }
  }, [authToken]);
  const value = {
    currency,
    allCourses,
    calculateRating,
    navigate,
    iseducator,
    setiseducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCources,
    backendUrl,
    userData,
    setUserData,getToken,fetchAllCourses,login,register,logout,authToken,fetchuserdata
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
