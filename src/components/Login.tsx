import React, { useState } from 'react';
import { Mail, Key, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email || 'somchai.j@example.com');
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background font-sans">
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-[420px] p-10 relative z-10 border-t-4 border-primary"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center mb-5 shadow-inner">
            <span className="material-symbols-outlined text-3xl font-bold">lock_person</span>
          </div>
          <h1 className="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">เข้าสู่ระบบ</h1>
          <p className="text-on-surface-variant text-center text-[15px]">
            กรุณากรอกข้อมูลประจำตัวเพื่อเข้าใช้งานระบบ
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface" htmlFor="email">อีเมล</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface" htmlFor="password">รหัสผ่าน</label>
            <div className="relative group">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
              />
              <span className="text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">จดจำฉัน</span>
            </label>
            <a href="#" className="text-primary hover:underline font-bold">ลืมรหัสผ่าน?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary text-white py-4 rounded-xl font-extrabold flex justify-center items-center gap-3 hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-lg mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="loading flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังเข้าสู่ระบบ...
              </span>
            ) : (
              <>
                เข้าสู่ระบบ
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-on-surface-variant text-[15px]">
            ยังไม่มีบัญชี? 
            <a href="#" className="text-primary hover:underline font-extrabold ml-1.5">สมัครสมาชิกใหม่</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
