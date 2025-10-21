import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { dashboardService, DashboardData } from '../services/dashboardService';
import { useToast } from '../components/Toast';
import * as XLSX from 'xlsx';

export const DashboardPage = () => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const dashboardData = dashboardService.getData();
    setData(dashboardData);
    setLoading(false);
  };

  const handleExport = () => {
    try {
      // 准备导出数据
      const exportData = data.map(item => ({
        '账号': item.account,
        'ID': item.accountId,
        '星图链接': item.xingtuLink,
        '1-20s视频': item.video1_20s,
        '21-60s视频': item.video21_60s,
        '60s以上视频': item.video60plus,
        '短直打包': item.shortDirectBundle,
        '看后搜次数': item.searchAfterView,
        '看后搜率': item.searchAfterViewRate,
        'A3增长数': item.a3Growth,
        '进店成本': item.storeCost,
        '组1-播放量中位数': item.group1PlayMedian,
        '组1-完播率': item.group1CompletionRate,
        '组1-互动率': item.group1InteractionRate,
        '组1-平均点赞': item.group1AvgLikes,
        '组1-平均评论': item.group1AvgComments,
        '组1-平均转发': item.group1AvgShares,
        '组2-播放量中位数': item.group2PlayMedian,
        '组2-完播率': item.group2CompletionRate,
        '组2-互动率': item.group2InteractionRate,
        '组2-平均点赞': item.group2AvgLikes,
        '组2-平均评论': item.group2AvgComments,
        '组2-平均转发': item.group2AvgShares,
        '组3-播放量中位数': item.group3PlayMedian,
        '组3-完播率': item.group3CompletionRate,
        '组3-互动率': item.group3InteractionRate,
        '组3-平均点赞': item.group3AvgLikes,
        '组3-平均评论': item.group3AvgComments,
        '组3-平均转发': item.group3AvgShares,
        '组4-播放量中位数': item.group4PlayMedian,
        '组4-完播率': item.group4CompletionRate,
        '组4-互动率': item.group4InteractionRate,
        '组4-平均点赞': item.group4AvgLikes,
        '组4-平均评论': item.group4AvgComments,
        '组4-平均转发': item.group4AvgShares,
        '预期CPM': item.expectedCPM,
        '预期CPE': item.expectedCPE,
        '预期播放量': item.expectedPlays,
        '女性占比': item.femaleRatio,
        '18-23岁': item.age18_23,
        '24-30岁': item.age24_30,
        '31-40岁': item.age31_40,
        '41-50岁': item.age41_50,
        '50+岁': item.age50plus,
        'Z世代': item.zGeneration,
        '小镇青年': item.smallTownYouth,
        '新锐白领': item.urbanWhiteCollar,
        '都市蓝领': item.urbanBlueCollar,
        '小镇中老年': item.smallTownElderly,
        '都市银发': item.urbanSilver,
        '资深中产': item.seniorMiddleClass,
        '精致妈妈': item.refinedMom,
        'iOS设备占比1': item.iosDevice1,
        'iOS设备占比2': item.iosDevice2,
      }));

      // 创建工作簿
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '星图达人数据');

      // 导出文件
      const fileName = `xingtu_data_${new Date().getTime()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      showToast('数据导出成功', 'success');
    } catch (error) {
      showToast('数据导出失败', 'error');
    }
  };

  const columns = [
    { key: 'account', title: '账号', width: '150px', fixed: true },
    { key: 'accountId', title: 'ID', width: '120px' },
    { key: 'xingtuLink', title: '星图链接', width: '200px', render: (val: string) => (
      <a href={val} target="_blank" rel="noopener noreferrer" className="text-[#4f7cff] hover:underline">
        {val}
      </a>
    )},
    { key: 'video1_20s', title: '1-20s视频', width: '100px' },
    { key: 'video21_60s', title: '21-60s视频', width: '100px' },
    { key: 'video60plus', title: '60s+视频', width: '100px' },
    { key: 'shortDirectBundle', title: '短直打包', width: '100px' },
    { key: 'searchAfterView', title: '看后搜次数', width: '120px' },
    { key: 'searchAfterViewRate', title: '看后搜率', width: '100px' },
    { key: 'a3Growth', title: 'A3增长数', width: '100px' },
    { key: 'storeCost', title: '进店成本', width: '100px' },
    { key: 'group1PlayMedian', title: '组1-播放中位数', width: '130px' },
    { key: 'group1CompletionRate', title: '组1-完播率', width: '100px' },
    { key: 'group1InteractionRate', title: '组1-互动率', width: '100px' },
    { key: 'group1AvgLikes', title: '组1-平均点赞', width: '120px' },
    { key: 'group1AvgComments', title: '组1-平均评论', width: '120px' },
    { key: 'group1AvgShares', title: '组1-平均转发', width: '120px' },
    { key: 'group2PlayMedian', title: '组2-播放中位数', width: '130px' },
    { key: 'group2CompletionRate', title: '组2-完播率', width: '100px' },
    { key: 'group2InteractionRate', title: '组2-互动率', width: '100px' },
    { key: 'group2AvgLikes', title: '组2-平均点赞', width: '120px' },
    { key: 'group2AvgComments', title: '组2-平均评论', width: '120px' },
    { key: 'group2AvgShares', title: '组2-平均转发', width: '120px' },
    { key: 'group3PlayMedian', title: '组3-播放中位数', width: '130px' },
    { key: 'group3CompletionRate', title: '组3-完播率', width: '100px' },
    { key: 'group3InteractionRate', title: '组3-互动率', width: '100px' },
    { key: 'group3AvgLikes', title: '组3-平均点赞', width: '120px' },
    { key: 'group3AvgComments', title: '组3-平均评论', width: '120px' },
    { key: 'group3AvgShares', title: '组3-平均转发', width: '120px' },
    { key: 'group4PlayMedian', title: '组4-播放中位数', width: '130px' },
    { key: 'group4CompletionRate', title: '组4-完播率', width: '100px' },
    { key: 'group4InteractionRate', title: '组4-互动率', width: '100px' },
    { key: 'group4AvgLikes', title: '组4-平均点赞', width: '120px' },
    { key: 'group4AvgComments', title: '组4-平均评论', width: '120px' },
    { key: 'group4AvgShares', title: '组4-平均转发', width: '120px' },
    { key: 'expectedCPM', title: '预期CPM', width: '100px' },
    { key: 'expectedCPE', title: '预期CPE', width: '100px' },
    { key: 'expectedPlays', title: '预期播放量', width: '120px' },
    { key: 'femaleRatio', title: '女性占比', width: '100px' },
    { key: 'age18_23', title: '18-23岁', width: '100px' },
    { key: 'age24_30', title: '24-30岁', width: '100px' },
    { key: 'age31_40', title: '31-40岁', width: '100px' },
    { key: 'age41_50', title: '41-50岁', width: '100px' },
    { key: 'age50plus', title: '50+岁', width: '100px' },
    { key: 'zGeneration', title: 'Z世代', width: '100px' },
    { key: 'smallTownYouth', title: '小镇青年', width: '100px' },
    { key: 'urbanWhiteCollar', title: '新锐白领', width: '100px' },
    { key: 'urbanBlueCollar', title: '都市蓝领', width: '100px' },
    { key: 'smallTownElderly', title: '小镇中老年', width: '120px' },
    { key: 'urbanSilver', title: '都市银发', width: '100px' },
    { key: 'seniorMiddleClass', title: '资深中产', width: '100px' },
    { key: 'refinedMom', title: '精致妈妈', width: '100px' },
    { key: 'iosDevice1', title: 'iOS设备占比1', width: '120px' },
    { key: 'iosDevice2', title: 'iOS设备占比2', width: '120px' },
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
        <h1 className="text-3xl font-bold text-[#e1e7f5]">数据面板</h1>
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
      title='历史记录'
      >
        <Table
          columns={columns}
          data={data}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
