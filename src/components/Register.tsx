import React, { useState } from 'react';
import { Mail, Key, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email || 'newuser@example.com');
      navigate('/');
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background font-sans">
      {/* Dynamic Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-10 w-full max-w-[440px] relative z-10"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full flex flex-col">
          
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary/10 -rotate-3 text-4xl">
                ✨
              </div>
              <h1 className="text-3xl font-black text-on-surface mb-2 tracking-tight">สร้างบัญชีใหม่</h1>
              <p className="text-on-surface-variant text-center text-[15px] font-medium max-w-[280px]">
                กรอกข้อมูลของคุณเพื่อเริ่มต้นใช้งานระบบ
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface" htmlFor="name">ชื่อ-นามสกุล</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-sm border border-outline-variant flex items-center justify-center rounded-lg z-10 text-outline-variant group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="สมชาย ใจดี"
                    className="w-full pl-[4.5rem] pr-4 py-4 rounded-xl border border-outline-variant bg-surface focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline-variant font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface" htmlFor="email">อีเมล</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-sm border border-outline-variant flex items-center justify-center rounded-lg z-10 text-outline-variant group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-[4.5rem] pr-4 py-4 rounded-xl border border-outline-variant bg-surface focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline-variant font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface" htmlFor="password">รหัสผ่าน</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-sm border border-outline-variant flex items-center justify-center rounded-lg z-10 text-outline-variant group-focus-within:text-primary transition-colors">
                    <Key size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-[4.5rem] pr-12 py-4 rounded-xl border border-outline-variant bg-surface focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline-variant font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-outline-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-extrabold flex justify-center items-center gap-2 hover:bg-black active:scale-[0.98] transition-all relative overflow-hidden group mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="loading flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    กำลังสร้างบัญชี...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 w-full text-center">สมัครสมาชิก</span>
                    <div className="absolute right-6 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={18} />
                    </div>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center w-full">
              <p className="text-on-surface-variant text-[15px] font-medium">
                มีบัญชีผู้ใช้งานอยู่แล้ว? 
                <Link to="/login" className="text-primary hover:text-primary/80 font-black ml-2 underline decoration-2 underline-offset-4 decoration-primary/30 transition-colors">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </motion.div>
          
        </motion.div>
      </motion.div>
    </div>
  );
}
