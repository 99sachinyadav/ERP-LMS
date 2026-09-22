import Course from "../model/course.js"
import crypto from 'node:crypto'
import { CourseProgress } from "../model/courseprogress.js"
import User from "../model/User.js"
import { v2 as cloudinary } from "cloudinary"
import { comparePassword, createAuthToken, hashPassword } from "../mddelware/localAuth.js"

const publicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
    role: user.role,
    enrolledCourses: user.enrolledCourses,
})

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password || String(password).length < 6) {
            return res.json({ success: false, message: 'Name, email and 6+ character password are required' })
        }

        const normalizedEmail = String(email).trim().toLowerCase()
        const existingUser = await User.findOne({ email: normalizedEmail })
        if (existingUser) {
            return res.json({ success: false, message: 'Email is already registered' })
        }

        const passwordHash = await hashPassword(password)
        const user = await User.create({
            _id: `user_${crypto.randomUUID()}`,
            name: String(name).trim(),
            email: normalizedEmail,
            passwordHash,
            imageUrl: '',
        })

        res.json({ success: true, token: createAuthToken(user), user: publicUser(user) })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: String(email || '').trim().toLowerCase() }).select('+passwordHash')
        if (!user || !(await comparePassword(password, user.passwordHash))) {
            return res.json({ success: false, message: 'Invalid email or password' })
        }

        res.json({ success: true, token: createAuthToken(user), user: publicUser(user) })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export  const getUserdata = async(req,res)=>{
    try {
        const user = await User.findById(req.auth.userId)
        if(!user){
            return res.json({success:false,message:'User Not Found'})
        }
        
        res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// User Enrolled Courses  with lecture link
 export const getuserEnrolledCourses = async(req,res)=>{
    try {
        const { userId } = req.auth
        const userdata = await User.findById(userId).populate('enrolledCourses')

        res.json({success:true ,enrolledCourses:userdata})
        
    } catch (error) {
         res.json({success:false,message:error.message})
    }
 }



 // FUNCTION TO ENROLL IN COURSE
export const enrollCourse = async(req,res)=>{
       try {
        const {courseId} = req.body

        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)
        if(!userData || !courseData){
            return res.json({success:false,message:'Invalid Course or User'})
        }
        if (userData.enrolledCourses.some((id) => id.toString() === courseData._id.toString())) {
            return res.json({success:true,message:'Already enrolled',courseId:courseData._id})
        }

        userData.enrolledCourses.push(courseData._id)
        courseData.enrolledStudents.push(userData._id)
        await userData.save()
        await courseData.save()

        res.json({success:true,message:'Enrolled successfully',courseId:courseData._id})
       } catch (error) {
           res.json({success:false,message:error.message})
       }
}

export const purchaseCourse = enrollCourse;


// Update User Course Progress

export const updateCourseProgress = async(req,res)=>{
    try {
        const userId = req.auth.userId
        const {courseId,lectureId} = req.body
        const progressData = await CourseProgress.findOne({userId,courseId})

        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success:true,message:'Lecture already marked as completed'})
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        }
        else{
             await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted:[lectureId]
        
             })
        }

        res.json({success:true,message:'Course Progress Updated'})


    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// get user course progress
export const getCourseProgress = async(req,res)=>{

    try {
        const userId = req.auth.userId
        const {courseId} = req.query
        // console.log(courseId,userId)
        const progressData = await CourseProgress.findOne({userId,courseId})
        //  console.log(progressData)
        
        if(!progressData){
            return res.json({success:false,message:'No Progress Found'})
        }
        res.json({success:true,progress:progressData})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// add user rating to the cource

export const addUserRating = async(req,res)=>{
    try {
        const userId = req.auth.userId
        const {courseId,rating}=req.body;
        // console.log(courseId,rating)
        if(!courseId || !userId||!rating || rating<1|| rating>5){
            return res.json({success:false,message:"Invalid Details"})
        }

        const course = await Course.findById(courseId)
        if(!course){
             return res.json({success:false,message:"Course not found"})
        }

        const user = await User.findById(userId)
        if(!user || !user.enrolledCourses.includes(courseId)){
             return res.json({success:false,message:"User is not enrolled in this course"})
        }

        const existingRatingIndex= course.courseRating.findIndex(r=>r.userId===userId)

        if(existingRatingIndex>-1){
            course.courseRating[existingRatingIndex].rating = rating;
        }
        else{
            course.courseRating.push({userId,rating})
        }

        await course.save();
          
        return res.json({success:true,message:"Rating Added"})
       
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// Run code for a programming question with custom stdin/stdout (compiler mode)
export const runProgrammingQuestion = async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const { courseId, questionId } = req.params;
        const { code, language: bodyLanguage, stdin = "" } = req.body;

        if (!code || !code.trim()) {
            return res.json({ success: false, message: "Code is required" });
        }

        const course = await Course.findById(courseId);
        if (!course || !course.isProgrammingCourse) {
            return res.json({ success: false, message: "Programming course or question not found" });
        }

        const question = (course.programmingQuestions || []).find(
            (q) => q.questionId === questionId,
        );
        if (!question) {
            return res.json({ success: false, message: "Question not found" });
        }
        const lang = (bodyLanguage || question.language || "javascript")
            .toLowerCase()
            .replace("c++", "cpp");

        const languageMap = {
            javascript: 63, // JavaScript (Node.js 12+)
            js: 63,
            cpp: 54, // C++ (GCC 9.2.0)
            c: 50, // C (GCC 9.2.0)
            java: 62, // Java (OpenJDK 13.0.1)
            python: 71, // Python (3.8.1)
            python3: 71,
            go: 60, // Go (1.13.5)
            rust: 73, // Rust (1.40.0)
            csharp: 51, // C# (Mono 6.6.0.161)
            php: 68, // PHP (7.4.1)
            ruby: 72, // Ruby (2.7.0)
            kotlin: 78, // Kotlin (1.3.70)
            swift: 83, // Swift (5.2.3)
            typescript: 74, // TypeScript (3.7.4)
        };

        const languageId = languageMap[lang];
        if (!languageId) {
            return res.json({
                success: false,
                message: `Language "${lang}" is not supported.`,
            });
        }

        const judgeBaseUrl = (process.env.JUDGE0_URL || "https://ce.judge0.com").replace(/\/+$/, "");
        const submissionsUrl = `${judgeBaseUrl}/submissions?base64_encoded=true&wait=true`;
        const b64 = (s) => Buffer.from(String(s ?? ""), "utf8").toString("base64");
        const unb64 = (s) => (s ? Buffer.from(String(s), "base64").toString("utf8") : "");

        const body = {
            source_code: b64(code),
            language_id: languageId,
            stdin: b64(String(stdin ?? "")),
        };

        const response = await fetch(submissionsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errText = await response.text().catch(() => "");
            throw new Error(
                `Judge service error: ${response.status}${errText ? ` - ${errText}` : ""}`,
            );
        }

        const result = await response.json();
        const status = result.status || {};
        const stdout = unb64(result.stdout || "");
        const stderr = unb64(result.stderr || "");
        const compileOutput = unb64(result.compile_output || "");
        const terminalOutput = [compileOutput, stderr, stdout]
            .filter((part) => String(part || "").length > 0)
            .join("\n");

        return res.json({
            success: true,
            runResult: {
                statusId: status.id,
                status: status.description || "Unknown",
                stdout,
                stderr,
                compileOutput,
                terminalOutput,
                time: result.time || null,
                memory: result.memory || null,
            },
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
