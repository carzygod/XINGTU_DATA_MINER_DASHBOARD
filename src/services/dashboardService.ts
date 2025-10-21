// 数据面板服务
const DASHBOARD_DATA_KEY = 'xingtu_dashboard_data';

export interface DashboardData {
  id: string;
  account: string;
  accountId: string;
  xingtuLink: string;
  video1_20s: number;
  video21_60s: number;
  video60plus: number;
  shortDirectBundle: number;
  searchAfterView: number;
  searchAfterViewRate: string;
  a3Growth: number;
  storeCost: number;
  // 视频表现指标 - 4组
  group1PlayMedian: number;
  group1CompletionRate: string;
  group1InteractionRate: string;
  group1AvgLikes: number;
  group1AvgComments: number;
  group1AvgShares: number;
  group2PlayMedian: number;
  group2CompletionRate: string;
  group2InteractionRate: string;
  group2AvgLikes: number;
  group2AvgComments: number;
  group2AvgShares: number;
  group3PlayMedian: number;
  group3CompletionRate: string;
  group3InteractionRate: string;
  group3AvgLikes: number;
  group3AvgComments: number;
  group3AvgShares: number;
  group4PlayMedian: number;
  group4CompletionRate: string;
  group4InteractionRate: string;
  group4AvgLikes: number;
  group4AvgComments: number;
  group4AvgShares: number;
  // 预期数据
  expectedCPM: number;
  expectedCPE: number;
  expectedPlays: number;
  // 人群画像
  femaleRatio: string;
  age18_23: string;
  age24_30: string;
  age31_40: string;
  age41_50: string;
  age50plus: string;
  zGeneration: string;
  smallTownYouth: string;
  urbanWhiteCollar: string;
  urbanBlueCollar: string;
  smallTownElderly: string;
  urbanSilver: string;
  seniorMiddleClass: string;
  refinedMom: string;
  iosDevice1: string;
  iosDevice2: string;
}

// 生成模拟数据
const generateMockData = (): DashboardData[] => {
  const accounts = ['@美食达人小李', '@时尚博主张三', '@科技评测王五', '@旅行达人小赵', '@健身教练老刘', '@数码博主阿强', '@生活家小美', '@音乐人小明', '@游戏解说大彬', '@美妆达人莎莎'];
  
  return accounts.map((account, index) => {
    const baseId = 100000 + index;
    return {
      id: (index + 1).toString(),
      account,
      accountId: `XTU${baseId}`,
      xingtuLink: `https://xingtu.cn/user/${baseId}`,
      video1_20s: Math.floor(Math.random() * 50) + 10,
      video21_60s: Math.floor(Math.random() * 40) + 20,
      video60plus: Math.floor(Math.random() * 30) + 5,
      shortDirectBundle: Math.floor(Math.random() * 15) + 3,
      searchAfterView: Math.floor(Math.random() * 5000) + 1000,
      searchAfterViewRate: `${(Math.random() * 5 + 2).toFixed(2)}%`,
      a3Growth: Math.floor(Math.random() * 1000) + 200,
      storeCost: parseFloat((Math.random() * 10 + 5).toFixed(2)),
      // Group 1
      group1PlayMedian: Math.floor(Math.random() * 50000) + 10000,
      group1CompletionRate: `${(Math.random() * 30 + 40).toFixed(1)}%`,
      group1InteractionRate: `${(Math.random() * 10 + 5).toFixed(2)}%`,
      group1AvgLikes: Math.floor(Math.random() * 2000) + 500,
      group1AvgComments: Math.floor(Math.random() * 150) + 30,
      group1AvgShares: Math.floor(Math.random() * 100) + 20,
      // Group 2
      group2PlayMedian: Math.floor(Math.random() * 60000) + 15000,
      group2CompletionRate: `${(Math.random() * 30 + 45).toFixed(1)}%`,
      group2InteractionRate: `${(Math.random() * 10 + 6).toFixed(2)}%`,
      group2AvgLikes: Math.floor(Math.random() * 2500) + 600,
      group2AvgComments: Math.floor(Math.random() * 180) + 40,
      group2AvgShares: Math.floor(Math.random() * 120) + 25,
      // Group 3
      group3PlayMedian: Math.floor(Math.random() * 70000) + 20000,
      group3CompletionRate: `${(Math.random() * 30 + 50).toFixed(1)}%`,
      group3InteractionRate: `${(Math.random() * 10 + 7).toFixed(2)}%`,
      group3AvgLikes: Math.floor(Math.random() * 3000) + 700,
      group3AvgComments: Math.floor(Math.random() * 200) + 50,
      group3AvgShares: Math.floor(Math.random() * 140) + 30,
      // Group 4
      group4PlayMedian: Math.floor(Math.random() * 80000) + 25000,
      group4CompletionRate: `${(Math.random() * 30 + 55).toFixed(1)}%`,
      group4InteractionRate: `${(Math.random() * 10 + 8).toFixed(2)}%`,
      group4AvgLikes: Math.floor(Math.random() * 3500) + 800,
      group4AvgComments: Math.floor(Math.random() * 220) + 60,
      group4AvgShares: Math.floor(Math.random() * 160) + 35,
      // 预期数据
      expectedCPM: parseFloat((Math.random() * 50 + 30).toFixed(2)),
      expectedCPE: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
      expectedPlays: Math.floor(Math.random() * 100000) + 30000,
      // 人群画像
      femaleRatio: `${(Math.random() * 40 + 30).toFixed(1)}%`,
      age18_23: `${(Math.random() * 20 + 10).toFixed(1)}%`,
      age24_30: `${(Math.random() * 30 + 20).toFixed(1)}%`,
      age31_40: `${(Math.random() * 25 + 15).toFixed(1)}%`,
      age41_50: `${(Math.random() * 15 + 10).toFixed(1)}%`,
      age50plus: `${(Math.random() * 10 + 5).toFixed(1)}%`,
      zGeneration: `${(Math.random() * 25 + 15).toFixed(1)}%`,
      smallTownYouth: `${(Math.random() * 20 + 10).toFixed(1)}%`,
      urbanWhiteCollar: `${(Math.random() * 30 + 15).toFixed(1)}%`,
      urbanBlueCollar: `${(Math.random() * 20 + 10).toFixed(1)}%`,
      smallTownElderly: `${(Math.random() * 15 + 5).toFixed(1)}%`,
      urbanSilver: `${(Math.random() * 10 + 5).toFixed(1)}%`,
      seniorMiddleClass: `${(Math.random() * 20 + 10).toFixed(1)}%`,
      refinedMom: `${(Math.random() * 15 + 8).toFixed(1)}%`,
      iosDevice1: `${(Math.random() * 40 + 30).toFixed(1)}%`,
      iosDevice2: `${(Math.random() * 40 + 30).toFixed(1)}%`,
    };
  });
};

export const dashboardService = {
  // 获取数据面板数据
  getData: (): DashboardData[] => {
    const data = localStorage.getItem(DASHBOARD_DATA_KEY);
    if (!data) {
      const initial = generateMockData();
      localStorage.setItem(DASHBOARD_DATA_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }
};
