// 达人链接管理服务
const DARENS_KEY = 'xingtu_darens';

export interface DarenLink {
  id: string;
  link: string;
  addedAt: string;
  status: 'active' | 'inactive' | 'pending';
}

// 初始化模拟数据
const initDarens = (): DarenLink[] => [
  { id: '1', link: 'https://www.douyin.com/user/MS4wLjABAAAA1a2b3c', addedAt: '2025-09-10T08:00:00Z', status: 'active' },
  { id: '2', link: 'https://www.douyin.com/user/MS4wLjABAAAA4d5e6f', addedAt: '2025-09-12T10:30:00Z', status: 'active' },
  { id: '3', link: 'https://www.douyin.com/user/MS4wLjABAAAA7g8h9i', addedAt: '2025-09-15T14:20:00Z', status: 'pending' },
  { id: '4', link: 'https://www.douyin.com/user/MS4wLjABAAAA0j1k2l', addedAt: '2025-09-18T09:15:00Z', status: 'active' },
  { id: '5', link: 'https://www.douyin.com/user/MS4wLjABAAAA3m4n5o', addedAt: '2025-09-20T16:45:00Z', status: 'inactive' },
  { id: '6', link: 'https://www.douyin.com/user/MS4wLjABAAAA6p7q8r', addedAt: '2025-09-22T11:30:00Z', status: 'active' },
  { id: '7', link: 'https://www.douyin.com/user/MS4wLjABAAAA9s0t1u', addedAt: '2025-09-25T13:00:00Z', status: 'active' },
  { id: '8', link: 'https://www.douyin.com/user/MS4wLjABAAAA2v3w4x', addedAt: '2025-09-28T15:20:00Z', status: 'pending' },
  { id: '9', link: 'https://www.douyin.com/user/MS4wLjABAAAA5y6z7a', addedAt: '2025-10-01T10:00:00Z', status: 'active' },
  { id: '10', link: 'https://www.douyin.com/user/MS4wLjABAAAA8b9c0d', addedAt: '2025-10-03T12:30:00Z', status: 'active' },
  { id: '11', link: 'https://www.douyin.com/user/MS4wLjABAAAA1e2f3g', addedAt: '2025-10-05T14:45:00Z', status: 'active' },
  { id: '12', link: 'https://www.douyin.com/user/MS4wLjABAAAA4h5i6j', addedAt: '2025-10-08T09:30:00Z', status: 'inactive' }
];

export const darenService = {
  // 获取所有达人链接
  getDarens: (): DarenLink[] => {
    const data = localStorage.getItem(DARENS_KEY);
    if (!data) {
      const initial = initDarens();
      localStorage.setItem(DARENS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  // 批量添加达人链接
  addDarens: (links: string[]): DarenLink[] => {
    const darens = darenService.getDarens();
    const newDarens: DarenLink[] = links.map(link => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      link: link.trim(),
      addedAt: new Date().toISOString(),
      status: 'pending'
    }));
    const updated = [...darens, ...newDarens];
    localStorage.setItem(DARENS_KEY, JSON.stringify(updated));
    return updated;
  },

  // 删除达人链接
  deleteDaren: (id: string): DarenLink[] => {
    const darens = darenService.getDarens();
    const filtered = darens.filter(d => d.id !== id);
    localStorage.setItem(DARENS_KEY, JSON.stringify(filtered));
    return filtered;
  },

  // 批量删除
  deleteDarens: (ids: string[]): DarenLink[] => {
    const darens = darenService.getDarens();
    const filtered = darens.filter(d => !ids.includes(d.id));
    localStorage.setItem(DARENS_KEY, JSON.stringify(filtered));
    return filtered;
  }
};
