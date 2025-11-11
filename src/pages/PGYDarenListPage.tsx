import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { darenService, DarenLink } from '../services/darenService';
import { useToast } from '../components/Toast';
import { api_pgy_monitor_del, api_pgy_monitor_list, api_pgy_monitor_new } from '@/core/request';

export const PGYDarenListPage = () => {
  const [darens, setDarens] = useState<DarenLink[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    loadDarens();
  }, []);

  const loadDarens = async() => {
    // const data = darenService.getDarens();
    const data = (await api_pgy_monitor_list()).data;
    setDarens(data);
  };

  const handleImport = async() => {
    if (!importText.trim()) {
      showToast('请输入达人链接', 'error');
      return;
    }

    const links = importText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (links.length === 0) {
      showToast('没有有效的链接', 'error');
      return;
    }

    darenService.addDarens(links);
    await api_pgy_monitor_new(
      {url:links}
    )
    showToast(`成功导入${links.length}条链接`, 'success');
    setImportText('');
    setIsImportModalOpen(false);
    loadDarens();
  };

  const handleDelete = (data:any) => {
    setDeleteId(data?._id);
  };

  const confirmDelete = async() => {
    if (deleteId) {
      await api_pgy_monitor_del(deleteId);
      darenService.deleteDaren(deleteId);
      showToast('删除成功', 'success');
      setDeleteId(null);
      loadDarens();
    }
  };

  const handleBatchDelete = async() => {
    if (selectedIds.length === 0) {
      showToast('请选择要删除的项目', 'error');
      return;
    }
    for(let id of selectedIds)
    {
      await api_pgy_monitor_del(id);
    }
    darenService.deleteDarens(selectedIds);
    showToast(`成功删除${selectedIds.length}条记录`, 'success');
    setSelectedIds([]);
    loadDarens();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === darens.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(darens.map(d => d.id));
    }
  };

  const columns = [
    { 
      key: 'select', 
      title: (
        <input
          type="checkbox"
          checked={selectedIds.length === darens.length && darens.length > 0}
          onChange={toggleSelectAll}
          className="w-4 h-4"
        />
      ),
      width: '50px',
      render: (_: any, record: DarenLink) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(record.id)}
          onChange={() => toggleSelect(record.id)}
          className="w-4 h-4"
        />
      )
    },
    { 
      key: 'url', 
      title: '达人链接', 
      width: '400px',
      render: (val: string) => (
        <a href={val} target="_blank" rel="noopener noreferrer" className="text-[#4f7cff] hover:underline truncate block">
          {val}
        </a>
      )
    },
    // { 
    //   key: 'addedAt', 
    //   title: '添加时间', 
    //   width: '200px',
    //   render: (val: string) => new Date(val).toLocaleString('zh-CN')
    // },
    // { 
    //   key: 'status', 
    //   title: '状态', 
    //   width: '100px',
    //   render: (val: string) => {
    //     const statusMap = {
    //       active: { text: '激活', color: 'text-green-400' },
    //       inactive: { text: '未激活', color: 'text-gray-400' },
    //       pending: { text: '待处理', color: 'text-yellow-400' }
    //     };
    //     const status = statusMap[val as keyof typeof statusMap];
    //     return <span className={status.color}>{status.text}</span>;
    //   }
    // },
    { 
      key: '_id', 
      title: '操作', 
      width: '150px',
      render: (_: any, record: DarenLink) => (
        <Button
          variant="danger"
          className="px-4 py-2 text-sm"
          onClick={() => handleDelete(record)}
        >
          删除
        </Button>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-bold text-[#e1e7f5]">蒲公英达人管理</h1>
        <div className="flex gap-3">
          <Button 
            variant="danger" 
            onClick={handleBatchDelete}
            disabled={selectedIds.length === 0}
          >
            批量删除 ({selectedIds.length})
          </Button>
          <Button onClick={() => setIsImportModalOpen(true)}>批量导入</Button>
        </div>
      </div>

      <Card>
        <Table
          columns={columns}
          data={darens}
          rowKey="id"
        />
      </Card>

      {/* 批量导入弹窗 */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="批量导入达人链接"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-[#c4d0ed] text-sm">
            请每行输入一个达人链接，系统将自动解析并添加。
          </p>
          <textarea
            className="w-full h-64 px-4 py-3 rounded-lg bg-[#1a1d2e] text-[#e1e7f5] neu-pressed border border-transparent focus:border-[#4f7cff] focus:outline-none placeholder:text-[#c4d0ed] placeholder:opacity-50 resize-none"
            placeholder="请粘贴链接，每行一个，例如：
https://www.douyin.com/user/MS4wLjABAAAA...
https://www.douyin.com/user/MS4wLjABAAAA..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsImportModalOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleImport}>确认导入</Button>
          </div>
        </div>
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="确认删除"
        size="sm"
      >
        <p className="text-[#c4d0ed] mb-6">确定要删除这个达人链接吗？此操作不可恢复。</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            取消
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            确认删除
          </Button>
        </div>
      </Modal>
    </div>
  );
};
