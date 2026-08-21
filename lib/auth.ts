import bcrypt from 'bcryptjs';

// Admin user - Password: admin1234
const ADMIN_USER = {
  id: '1',
  username: 'admin',
  password: '$2a$10$eh35gttAuDJxGwCUVAKSqecSIwzpeQc78lxKD2j3US1gjqVnKRQzG',
  role: 'admin',
};

// Gunakan global session untuk persistensi di serverless
declare global {
  var __sessions: Record<string, any>;
}

if (!global.__sessions) {
  global.__sessions = {};
}

const sessions = global.__sessions;

export async function verifyLogin(username: string, password: string) {
  try {
    console.log('🔑 Verifying login for:', username);
    
    if (username !== ADMIN_USER.username) {
      console.log('❌ Username not found');
      return null;
    }

    const isValid = await bcrypt.compare(password, ADMIN_USER.password);
    console.log('🔐 Password validation:', isValid);

    if (!isValid) {
      return null;
    }

    return {
      id: ADMIN_USER.id,
      username: ADMIN_USER.username,
      role: ADMIN_USER.role,
    };
  } catch (error) {
    console.error('❌ Error verifying login:', error);
    return null;
  }
}

export function generateToken() {
  const token = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
  
  sessions[token] = {
    user: {
      id: ADMIN_USER.id,
      username: ADMIN_USER.username,
      role: ADMIN_USER.role,
    },
    createdAt: new Date().toISOString(),
  };
  
  console.log('🔑 Token generated:', token);
  console.log('📊 Sessions:', Object.keys(sessions));
  return token;
}

export async function checkAuth(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    console.log('🍪 Cookie header:', cookieHeader);
    
    if (!cookieHeader) {
      console.log('❌ No cookie header');
      return false;
    }

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const token = cookies['admin_token'];
    console.log('🔑 Token:', token);

    if (!token) {
      console.log('❌ No token found');
      return false;
    }

    const session = sessions[token];
    console.log('📊 Session found:', !!session);
    console.log('📊 All sessions:', Object.keys(sessions));

    return !!session;
  } catch (error) {
    console.error('❌ CheckAuth error:', error);
    return false;
  }
}

export function getSession(token: string) {
  return sessions[token] || null;
}

export function clearSession(token: string) {
  delete sessions[token];
}

export function getAdminUser() {
  return {
    id: ADMIN_USER.id,
    username: ADMIN_USER.username,
    role: ADMIN_USER.role,
  };
}
