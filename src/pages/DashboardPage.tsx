import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { dashboardService, DashboardData } from '../services/dashboardService';
import { useToast } from '../components/Toast';
import * as XLSX from 'xlsx';
import { api_data_list, api_data_lts } from '@/core/request';

export const DashboardPage = () => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [fullData, setFullData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const dashboardData = (await api_data_lts()).data;
    setData(dashboardData);
    setFullData((await api_data_list())?.data)
    setLoading(false);
  };

  const handleExport = () => {
    try {
      window.open("/api/data/lts/download")
      showToast('数据导出成功', 'success');
    } catch (error) {
      showToast('数据导出失败', 'error');
    }
  };

  const columns =  [
  { key: 'time', title: '时间', width: '150px', fixed: true },
  { key: 'batchId', title: '批次ID', width: '120px' },
  { key: 'account', title: '账号', width: '150px' },
  { key: 'id', title: 'ID', width: '120px' },
  {
    key: 'link',
    title: '星图链接',
    width: '200px',
    render: (val: string) => (
      <a
        href={val}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4f7cff] hover:underline"
      >
        {val}
      </a>
    ),
  },
  { key: 'quoteVideo1to20s', title: '1-20s视频', width: '100px' },
  { key: 'quoteVideo21to60s', title: '21-60s视频', width: '100px' },
  { key: 'quoteVideoAbove60s', title: '60s以上视频', width: '100px' },
  { key: 'quoteShortBundle', title: '短直打包', width: '100px' },
  { key: 'valueSearchCount', title: '看后搜次数', width: '120px' },
  { key: 'valueSearchRate', title: '看后搜率', width: '100px' },
  { key: 'valueA3Growth', title: 'A3增长数', width: '100px' },
  { key: 'valueShopCost', title: '进店成本', width: '100px' },
  { key: 'personal30dMedianViews', title: '30天个人视频播放量中位数', width: '150px' },
  { key: 'personal30dCompletionRate', title: '30天个人视频完播率', width: '130px' },
  { key: 'personal30dEngagementRate', title: '30天个人视频互动率', width: '130px' },
  { key: 'personal30dAvgLikes', title: '30天个人视频平均点赞', width: '130px' },
  { key: 'personal30dAvgComments', title: '30天个人视频平均评论', width: '130px' },
  { key: 'personal30dAvgShares', title: '30天个人视频平均转发', width: '130px' },
  { key: 'personal30dExpectedCpm', title: '30天个人视频预期CPM', width: '130px' },
  { key: 'personal30dExpectedCpe', title: '30天个人视频预期CPE', width: '130px' },
  { key: 'personal30dExpectedViews', title: '30天个人视频预期播放量', width: '150px' },
  { key: 'xingtu30dMedianViews', title: '30天星图视频播放量中位数', width: '150px' },
  { key: 'xingtu30dCompletionRate', title: '30天星图视频完播率', width: '130px' },
  { key: 'xingtu30dEngagementRate', title: '30天星图视频互动率', width: '130px' },
  { key: 'xingtu30dAvgLikes', title: '30天星图视频平均点赞', width: '130px' },
  { key: 'xingtu30dAvgComments', title: '30天星图视频平均评论', width: '130px' },
  { key: 'xingtu30dAvgShares', title: '30天星图视频平均转发', width: '130px' },
  { key: 'xingtu30dExpectedCpm', title: '30天星图视频预期CPM', width: '130px' },
  { key: 'xingtu30dExpectedCpe', title: '30天星图视频预期CPE', width: '130px' },
  { key: 'xingtu30dExpectedViews', title: '30天星图视频预期播放量', width: '150px' },
  { key: 'personal90dMedianViews', title: '90天个人视频播放量中位数', width: '150px' },
  { key: 'personal90dCompletionRate', title: '90天个人视频完播率', width: '130px' },
  { key: 'personal90dEngagementRate', title: '90天个人视频互动率', width: '130px' },
  { key: 'personal90dAvgLikes', title: '90天个人视频平均点赞', width: '130px' },
  { key: 'personal90dAvgComments', title: '90天个人视频平均评论', width: '130px' },
  { key: 'personal90dAvgShares', title: '90天个人视频平均转发', width: '130px' },
  { key: 'personal90dExpectedCpm', title: '90天个人视频预期CPM', width: '130px' },
  { key: 'personal90dExpectedCpe', title: '90天个人视频预期CPE', width: '130px' },
  { key: 'personal90dExpectedViews', title: '90天个人视频预期播放量', width: '150px' },
  { key: 'xingtu90dMedianViews', title: '90天星图视频播放量中位数', width: '150px' },
  { key: 'xingtu90dCompletionRate', title: '90天星图视频完播率', width: '130px' },
  { key: 'xingtu90dEngagementRate', title: '90天星图视频互动率', width: '130px' },
  { key: 'xingtu90dAvgLikes', title: '90天星图视频平均点赞', width: '130px' },
  { key: 'xingtu90dAvgComments', title: '90天星图视频平均评论', width: '130px' },
  { key: 'xingtu90dAvgShares', title: '90天星图视频平均转发', width: '130px' },
  { key: 'xingtu90dExpectedCpm', title: '90天星图视频预期CPM', width: '130px' },
  { key: 'xingtu90dExpectedCpe', title: '90天星图视频预期CPE', width: '130px' },
  { key: 'xingtu90dExpectedViews', title: '90天星图视频预期播放量', width: '150px' },
  { key: 'audienceFemaleRatio', title: '观众画像女性占比', width: '130px' },
  { key: 'audienceAge18to23', title: '观众画像18-23岁', width: '120px' },
  { key: 'audienceAge24to30', title: '观众画像24-30岁', width: '120px' },
  { key: 'audienceAge31to40', title: '观众画像31-40岁', width: '120px' },
  { key: 'audienceAge41to50', title: '观众画像41-50岁', width: '120px' },
  { key: 'audienceAge50plus', title: '观众画像50+', width: '100px' },
  { key: 'audienceGenZ', title: '观众画像z世代', width: '120px' },
  { key: 'audienceTownYouth', title: '观众画像小镇青年', width: '130px' },
  { key: 'audienceWhiteCollar', title: '观众画像新锐白领', width: '130px' },
  { key: 'audienceBlueCollar', title: '观众画像都市蓝领', width: '130px' },
  { key: 'audienceMiddleAgedTown', title: '观众画像小镇中老年', width: '140px' },
  { key: 'audienceSilverUrban', title: '观众画像都市银发', width: '130px' },
  { key: 'audienceMiddleClass', title: '观众画像资深中产', width: '130px' },
  { key: 'audienceElegantMom', title: '观众画像精致妈妈', width: '130px' },
  { key: 'audienceIosRatio', title: '观众画像ios设备占比', width: '150px' },
  { key: 'fansFemaleRatio', title: '粉丝画像女性占比', width: '130px' },
  { key: 'fansAge18to23', title: '粉丝画像18-23岁', width: '120px' },
  { key: 'fansAge24to30', title: '粉丝画像24-30岁', width: '120px' },
  { key: 'fansAge31to40', title: '粉丝画像31-40岁', width: '120px' },
  { key: 'fansAge41to50', title: '粉丝画像41-50岁', width: '120px' },
  { key: 'fansAge50plus', title: '粉丝画像50+', width: '100px' },
  { key: 'fansGenZ', title: '粉丝画像z世代', width: '120px' },
  { key: 'fansTownYouth', title: '粉丝画像小镇青年', width: '130px' },
  { key: 'fansWhiteCollar', title: '粉丝画像新锐白领', width: '130px' },
  { key: 'fansBlueCollar', title: '粉丝画像都市蓝领', width: '130px' },
  { key: 'fansMiddleAgedTown', title: '粉丝画像小镇中老年', width: '140px' },
  { key: 'fansSilverUrban', title: '粉丝画像都市银发', width: '130px' },
  { key: 'fansMiddleClass', title: '粉丝画像资深中产', width: '130px' },
  { key: 'fansElegantMom', title: '粉丝画像精致妈妈', width: '130px' },
  { key: 'fansIosRatio', title: '粉丝画像ios设备占比', width: '150px' },
];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#4f7cff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#e1e7f5]">星图数据面板</h1>
        <Button onClick={handleExport}>导出数据</Button>
      </div>

      <Card
      title='最新记录'
      >
        <Table
          columns={columns}
          data={data}
          rowKey="id"
        />
      </Card>

      <Card
      title='所有记录'
      >
        <Table
          columns={columns}
          data={fullData}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
