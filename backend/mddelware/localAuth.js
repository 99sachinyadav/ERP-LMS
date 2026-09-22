import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import User from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'erp_lms_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = '7d';

/**
 * Hash password using bcrypt with 10 salt rounds
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(String(password), 10);
};

/**
 * Compare plain password against stored hash (supports standard bcrypt and legacy fallback)
 */
export const comparePassword = async (password, storedHash) => {
  if (!password || !storedHash) return false;

  // Standard bcrypt hash format starts with $2a$, $2b$, or $2y$
  if (storedHash.startsWith('$2')) {
    return await bcrypt.compare(String(password), storedHash);
  }

  // Backward compatibility fallback for legacy pbkdf2 format (salt:hash)
  const [salt, hash] = String(storedHash).split(':');
  if (salt && hash) {
    const candidate = crypto.pbkdf2Sync(String(password), salt, 100000, 64, 'sha512').toString('hex');
    return (
      candidate.length === hash.length &&
      crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(hash))
    );
  }

  return false;
};

/**
 * Generate a signed JWT token
 */
export const createAuthToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role || 'student',
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Middleware to require and verify JWT token
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - User not found' });
    }

    req.auth = { userId: user._id };
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Unauthorized - Token expired' });
    }
    return res.status(401).json({ success: false, message: 'Unauthorized - Authentication failed' });
  }
};

/**
 * Middleware to protect educator-only routes
 */
export const protectEducator = async (req, res, next) => {
  await requireAuth(req, res, () => {
    if (req.user.role !== 'educator') {
      return res.status(403).json({ success: false, message: 'Unauthorised Access' });
    }
    next();
  });
};
