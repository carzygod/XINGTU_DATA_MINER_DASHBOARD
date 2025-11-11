import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { dashboardService, DashboardData } from '../services/dashboardService';
import { useToast } from '../components/Toast';
import * as XLSX from 'xlsx';
import { api_pgy_data_list, api_pgy_data_lts } from '@/core/request';

export const PGYDashboardPage = () => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [fullData, setFullData] = useState<DashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const dashboardData = (await api_pgy_data_lts()).data;
    console.log(dashboardData)
    setData(dashboardData);
    setFullData((await api_pgy_data_list())?.data)
    setLoading(false);
  };

  const handleExport = () => {
    try {
      window.open("/api/pgy/data/lts/download")
      showToast('数据导出成功', 'success');
    } catch (error) {
      showToast('数据导出失败', 'error');
    }
  };

const columns = [
  { key: "account", title: "账号", width: "150px", fixed: true },
  { key: "xhsId", title: "小红书号", width: "150px" },
  { key: "imagePostPrice", title: "图文笔记一口价", width: "150px" },
  { key: "videoPostPrice", title: "视频笔记一口价", width: "150px" },
  { key: "followers", title: "粉丝数", width: "120px" },
  { key: "likesAndFavorites", title: "获赞与收藏", width: "130px" },
  { key: "ipRegion", title: "IP地区", width: "120px" },
  {
    key: "profileLink",
    title: "主页链接",
    width: "200px",
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
  {
    key: "pugongyingLink",
    title: "蒲公英链接",
    width: "200px",
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
  { key: "overview_last30daysNoteCount", title: "近30天发布笔记数量", width: "160px" },
  { key: "dailyPost_exposureMedian", title: "【日常笔记】曝光中位数", width: "150px" },
  { key: "dailyPost_readMedian", title: "【日常笔记】阅读中位数", width: "150px" },
  { key: "dailyPost_interactionMedian", title: "【日常笔记】互动中位数", width: "150px" },
  { key: "dailyPost_outstoreMedian", title: "【日常笔记】外溢进店中位数", width: "160px" },
  { key: "dailyPost_likeMedian", title: "【日常笔记】中位点赞量", width: "150px" },
  { key: "dailyPost_commentMedian", title: "【日常笔记】中位评论量", width: "150px" },
  { key: "dailyPost_followMedian", title: "【日常笔记】中位关注量", width: "150px" },
  { key: "dailyPost_favoriteMedian", title: "【日常笔记】中位收藏量", width: "150px" },
  { key: "dailyPost_interactionRate", title: "【日常笔记】互动率", width: "130px" },
  { key: "dailyPost_videoCompletionRate", title: "【日常笔记】视频完播率", width: "130px" },
  { key: "dailyPost_image3sReadRate", title: "【日常笔记】图文三秒阅读率", width: "160px" },
  { key: "dailyPost_thousandLikeRatio", title: "【日常笔记】千赞笔记比例", width: "160px" },
  { key: "dailyPost_hundredLikeRatio", title: "【日常笔记】百赞笔记比例", width: "160px" },
  { key: "collabPost_exposureMedian", title: "【合作笔记】曝光中位数", width: "150px" },
  { key: "collabPost_readMedian", title: "【合作笔记】阅读中位数", width: "150px" },
  { key: "collabPost_interactionMedian", title: "【合作笔记】互动中位数", width: "150px" },
  { key: "collabPost_outstoreMedian", title: "【合作笔记】外溢进店中位数", width: "160px" },
  { key: "collabPost_likeMedian", title: "【合作笔记】中位点赞量", width: "150px" },
  { key: "collabPost_commentMedian", title: "【合作笔记】中位评论量", width: "150px" },
  { key: "collabPost_followMedian", title: "【合作笔记】中位关注量", width: "150px" },
  { key: "collabPost_favoriteMedian", title: "【合作笔记】中位收藏量", width: "150px" },
  { key: "collabPost_interactionRate", title: "【合作笔记】互动率", width: "130px" },
  { key: "collabPost_videoCompletionRate", title: "【合作笔记】视频完播率", width: "130px" },
  { key: "collabPost_image3sReadRate", title: "【合作笔记】图文三秒阅读率", width: "160px" },
  { key: "collabPost_thousandLikeRatio", title: "【合作笔记】千赞笔记比例", width: "160px" },
  { key: "collabPost_hundredLikeRatio", title: "【合作笔记】百赞笔记比例", width: "160px" },
  { key: "fans_increase", title: "粉丝增量", width: "120px" },
  { key: "fans_changeRate", title: "粉丝量变化幅度", width: "150px" },
  { key: "fans_activeRatio", title: "活跃粉丝占比", width: "130px" },
  { key: "fans_readRatio", title: "阅读粉丝占比", width: "130px" },
  { key: "fans_interactionRatio", title: "互动粉丝占比", width: "130px" },
  { key: "fans_orderRatio", title: "下单粉丝占比", width: "130px" },
  { key: "gender_femaleRatio", title: "女性占比", width: "100px" },
  { key: "gender_maleRatio", title: "男性占比", width: "100px" },
  { key: "age_below18", title: "＜18", width: "100px" },
  { key: "age_18_24", title: "18-24", width: "100px" },
  { key: "age_25_34", title: "25-34", width: "100px" },
  { key: "age_35_44", title: "35-44", width: "100px" },
  { key: "age_above44", title: "＞44", width: "100px" },
  { key: "region_province", title: "按省份", width: "150px" },
  { key: "region_city", title: "按城市", width: "150px" },
  { key: "iosUserRatio", title: "按设备", width: "150px" },
  { key: "userInterests", title: "按兴趣", width: "150px" },
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
        <h1 className="text-3xl font-bold text-[#e1e7f5]">蒲公英数据面板</h1>
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
