// 账号管理服务
const ACCOUNTS_KEY = 'xingtu_accounts';

export interface Account {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

// 初始化模拟数据
const initAccounts = (): Account[] => [
  {
    id: '1',
    email: 'user001@example.com',
    password: 'pass123',
    createdAt: '2025-09-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'user002@example.com',
    password: 'pass456',
    createdAt: '2025-09-20T14:20:00Z'
  },
  {
    id: '3',
    email: 'admin@xingtu.com',
    password: 'admin888',
    createdAt: '2025-10-01T09:00:00Z'
  },
  {
    id: '4',
    email: 'test@xingtu.com',
    password: 'test999',
    createdAt: '2025-10-05T16:45:00Z'
  },
  {
    id: '5',
    email: 'demo@xingtu.com',
    password: 'demo111',
    createdAt: '2025-10-10T11:30:00Z'
  }
];

export const accountService = {
  // 获取所有账号
  getAccounts: (): Account[] => {
    const data = localStorage.getItem(ACCOUNTS_KEY);
    if (!data) {
      const initial = initAccounts();
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  // 添加账号
  addAccount: (email: string, password: string): Account[] => {
    const accounts = accountService.getAccounts();
    const newAccount: Account = {
      id: Date.now().toString(),
      email,
      password,
      createdAt: new Date().toISOString()
    };
    accounts.push(newAccount);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    return accounts;
  },

  // 删除账号
  deleteAccount: (id: string): Account[] => {
    const accounts = accountService.getAccounts();
    const filtered = accounts.filter(acc => acc.id !== id);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(filtered));
    return filtered;
  }
};
