import { useState, useEffect, FormEvent } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { accountService, Account } from '../services/accountService';
import { useToast } from '../components/Toast';
import { api_account_del, api_account_list, api_account_new } from '@/core/request';

export const AccountManagementPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async() => {
    const data = (await api_account_list())?.data;
    setAccounts(data || []);
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('请填写完整信息', 'error');
      return;
    }
    await api_account_new(
      {
        email,
        password
      }
    )
    accountService.addAccount(email, password);
    showToast('账号添加成功', 'success');
    setEmail('');
    setPassword('');
    setIsModalOpen(false);
    await loadAccounts();
  };

  const handleDelete = (data:any) => {
    setDeleteId(data?._id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await api_account_del(deleteId)
      accountService.deleteAccount(deleteId);
      showToast('账号删除成功', 'success');
      setDeleteId(null);
      loadAccounts();
    }
  };

  const columns = [
    { key: 'email', title: '邮箱', width: '300px' },
    { key: 'password', title: '密码', width: '200px' },
    // { 
    //   key: 'createdAt', 
    //   title: '创建时间', 
    //   width: '200px',
    //   render: (val: string) => new Date(val).toLocaleString('zh-CN')
    // },
    { 
      key: 'id', 
      title: '操作', 
      width: '150px',
      render: (_: any, record: Account) => (
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#e1e7f5]">星图账号管理</h1>
        <Button onClick={() => setIsModalOpen(true)}>新增账号</Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={accounts}
          rowKey="id"
        />
      </Card>

      {/* 新增账号弹窗 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="新增账号"
        size="sm"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            type="email"
            label="邮箱"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="密码"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              取消
            </Button>
            <Button type="submit">确认添加</Button>
          </div>
        </form>
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="确认删除"
        size="sm"
      >
        <p className="text-[#c4d0ed] mb-6">确定要删除这个账号吗？此操作不可恢复。</p>
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
