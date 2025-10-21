// 爬虫服务
const CRAWLER_RECORDS_KEY = 'xingtu_crawler_records';

export interface CrawlerRecord {
  id: string;
  link: string;
  timestamp: string;
  status: 'success' | 'failed' | 'running';
  dataCount: number;
  message?: string;
}

// 初始化模拟历史记录
const initRecords = (): CrawlerRecord[] => [
  {
    id: '1',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA1a2b3c',
    timestamp: '2025-10-10T08:30:00Z',
    status: 'success',
    dataCount: 245,
    message: '数据抓取成功'
  },
  {
    id: '2',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA4d5e6f',
    timestamp: '2025-10-10T10:15:00Z',
    status: 'success',
    dataCount: 189,
    message: '数据抓取成功'
  },
  {
    id: '3',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA7g8h9i',
    timestamp: '2025-10-11T14:20:00Z',
    status: 'failed',
    dataCount: 0,
    message: '链接无效或网络错误'
  },
  {
    id: '4',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA0j1k2l',
    timestamp: '2025-10-11T16:45:00Z',
    status: 'success',
    dataCount: 312,
    message: '数据抓取成功'
  },
  {
    id: '5',
    link: 'https://www.douyin.com/user/MS4wLjABAAAA3m4n5o',
    timestamp: '2025-10-12T09:00:00Z',
    status: 'success',
    dataCount: 156,
    message: '数据抓取成功'
  }
];

export const crawlerService = {
  // 获取所有爬虫记录
  getRecords: (): CrawlerRecord[] => {
    const data = localStorage.getItem(CRAWLER_RECORDS_KEY);
    if (!data) {
      const initial = initRecords();
      localStorage.setItem(CRAWLER_RECORDS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  // 添加爬虫记录
  addRecord: (record: Omit<CrawlerRecord, 'id'>): CrawlerRecord[] => {
    const records = crawlerService.getRecords();
    const newRecord: CrawlerRecord = {
      id: Date.now().toString(),
      ...record
    };
    records.unshift(newRecord); // 最新的在最前面
    localStorage.setItem(CRAWLER_RECORDS_KEY, JSON.stringify(records));
    return records;
  },

  // 更新爬虫记录状态
  updateRecord: (id: string, updates: Partial<CrawlerRecord>): CrawlerRecord[] => {
    const records = crawlerService.getRecords();
    const updated = records.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem(CRAWLER_RECORDS_KEY, JSON.stringify(updated));
    return updated;
  },

  // 模拟爬虫执行
  executeCrawler: async (link: string): Promise<CrawlerRecord> => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 随机成功或失败
    const isSuccess = Math.random() > 0.2; // 80%成功率
    
    const record: Omit<CrawlerRecord, 'id'> = {
      link,
      timestamp: new Date().toISOString(),
      status: isSuccess ? 'success' : 'failed',
      dataCount: isSuccess ? Math.floor(Math.random() * 300) + 50 : 0,
      message: isSuccess ? '数据抓取成功' : '链接无效或网络错误'
    };
    
    const records = crawlerService.addRecord(record);
    return records[0];
  }
};
