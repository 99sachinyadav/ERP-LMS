import multer from 'multer'

const storage = multer.diskStorage({})

const upload = multer({storage})

export const uploadNotes = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit
  },
})

// Middleware wrapper to catch Multer file size errors and send a clean JSON response
export const uploadNotesMiddleware = (req, res, next) => {
  uploadNotes.single('notesFile')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Notes file size cannot exceed 2 MB',
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading notes file',
      });
    }
    next();
  });
};

export default upload 