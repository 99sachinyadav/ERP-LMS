import express from 'express'
import { addUserRating, enrollCourse, getCourseProgress, getUserdata, getuserEnrolledCourses, loginUser, purchaseCourse, registerUser, runProgrammingQuestion, updateCourseProgress } from '../controller/user.controller.js'
import { requireAuth } from '../mddelware/localAuth.js'

const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', requireAuth, getUserdata)
userRouter.get('/enrolled-courses', requireAuth, getuserEnrolledCourses)
userRouter.post('/enroll', requireAuth, enrollCourse)
userRouter.post('/purchase', requireAuth, enrollCourse) // Backward compatibility alias
userRouter.post('/update-course-progress', requireAuth, updateCourseProgress)
userRouter.get('/get-course-progress', requireAuth, getCourseProgress)
userRouter.post('/add-rating', requireAuth, addUserRating)
userRouter.post('/course/:courseId/programming-questions/:questionId/run', requireAuth, runProgrammingQuestion)

export default userRouter
