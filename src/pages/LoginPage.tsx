import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { getIsLogin, setIsLogin } from '@/core/storage';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();


  useEffect(() => {
    if(getIsLogin() == "1")
    {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (authService.login(username, password)) {
      showToast('登录成功', 'success');
      setIsLogin("1")
      navigate('/dashboard');
    } else {
      showToast('账号或密码错误', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#2d3250] rounded-2xl p-8 neu-raised animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5b8def] to-[#7aa2f7] bg-clip-text text-transparent mb-2">
              XINGTU ADMIN
            </h1>
            <p className="text-[#c4d0ed]">星图管理面板</p>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label="账号"
              placeholder="请输入账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button
              type="submit"
              className="w-full"
              loading={loading}
            >
              登录
            </Button>
          </form>

          {/* 提示 */}
          <div className="mt-6 text-center text-sm text-[#c4d0ed]">
            默认账号：admin / admin123
          </div>
        </div>
      </div>
    </div>
  );
};
