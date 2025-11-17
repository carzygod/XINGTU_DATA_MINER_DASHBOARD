import { useState, useEffect, FormEvent } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { crawlerService, CrawlerRecord } from '../services/crawlerService';
import { useToast } from '../components/Toast';
import { api_pgy_auth_new, api_pgy_data_batch_list, api_pgy_data_new } from '@/core/request';

export const PGYControlPage = () => {
  const [link, setLink] = useState('');
  const [records, setRecords] = useState<CrawlerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async() => {
    // const data = crawlerService.getRecords();
    const data = (await api_pgy_data_batch_list())?.data;
    setRecords(data);
  };

  const handleExecute = async (e: FormEvent) => {
    e.preventDefault();
    // if (!link.trim()) {
    //   showToast('请输入达人链接', 'error');
    //   return;
    // }

    setLoading(true);
    try {
      const result = await api_pgy_data_new();
      // if (result.status === 'success') {
      //   showToast(`爬虫执行成功，抓取${result.dataCount}条数据`, 'success');
      // } else {
      //   showToast('爬虫执行失败', 'error');
      // }
      // setLink('');
      loadRecords();
    } catch (error) {
      showToast('执行失败', 'error');
    } finally {
      // setLoading(false);
    }
  };

  const handleAuthUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api_pgy_auth_new();
      loadRecords();
    } catch (error) {
      showToast('执行失败', 'error');
    } finally {
    }
  };

  const columns = [
    { 
      key: 'startTime', 
      title: '开始时间', 
      width: '200px',
      render: (val: string) => new Date(val).toLocaleString('zh-CN')
    },
    { 
      key: 'endTime', 
      title: '结束时间', 
      width: '200px',
      render: (val: string) => val?new Date(val).toLocaleString('zh-CN'):0
    },
    { 
      key: 'id', 
      title: '操作ID', 
      width: '300px',
      render: (val: string) => (
        <a href={val} target="_blank" rel="noopener noreferrer" className="text-[#4f7cff] hover:underline truncate block">
          {val}
        </a>
      )
    },
    { 
      key: 'status', 
      title: '状态', 
      width: '100px',
      render: (val: string) => {
        // const statusMap = {
        //   success: { text: '成功', color: 'text-green-400' },
        //   failed: { text: '失败', color: 'text-red-400' },
        //   running: { text: '运行中', color: 'text-yellow-400' }
        // };
        // const status = statusMap[val as keyof typeof statusMap];
        // return <span className={status.color}>{status.text}</span>;

        const statusMap = [
          { text: '运行中', color: 'text-yellow-400' },
          { text: '成功', color: 'text-green-400' },
          { text: '失败', color: 'text-red-400' },
        ];
        const status = statusMap[val];
        return <span className={status?.color}>{status?.text}</span>;
      }
    },
    // { key: 'dataCount', title: '数据量', width: '100px' },
    // { key: 'message', title: '消息', width: '200px' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#e1e7f5]">控制中心</h1>

      {/* 执行爬虫 */}
      <Card title="蒲公英数据操作">
        <form onSubmit={handleExecute} className="space-y-4">
          {/* <Input
            type="url"
            placeholder="请输入达人链接，例如：https://www.douyin.com/user/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={loading}
          /> */}
          <Button loading={loading}
          onClick={handleExecute}
          >
            {loading ? '执行中...' : '获取数据'}
          </Button>

          <Button loading={loading}
          onClick={handleAuthUpdate}
          >
            {loading ? '执行中...' : '更新账户权限'}
          </Button>
        </form>
      </Card>

      <Card title="操作历史记录">
        <Table
          columns={columns}
          data={records}
          rowKey="id"
        />
      </Card>
    </div>
  );
};
