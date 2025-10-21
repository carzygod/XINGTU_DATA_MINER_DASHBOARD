// 认证服务
const AUTH_KEY = 'xingtu_auth';

interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

export const authService = {
  // 登录
  login: (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'xingtu123') {
      const authState: AuthState = {
        isAuthenticated: true,
        username: 'admin'
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
      return true;
    }
    return false;
  },

  // 登出
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // 检查登录状态
  isAuthenticated: (): boolean => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return false;
    try {
      const authState: AuthState = JSON.parse(auth);
      return authState.isAuthenticated === true;
    } catch {
      return false;
    }
  },

  // 获取当前用户
  getCurrentUser: (): string | null => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return null;
    try {
      const authState: AuthState = JSON.parse(auth);
      return authState.username || null;
    } catch {
      return null;
    }
  }
};
