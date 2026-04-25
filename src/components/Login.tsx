import React, { useState } from 'react';
import { Mail, Key, Eye, EyeOff, ArrowRight, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../App';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Forgot Password specific state
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
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

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    // Simulate API call
    setTimeout(() => {
      setIsResetting(false);
      setResetSuccess(true);
      setTimeout(() => {
        setIsForgotPasswordOpen(false);
        setResetSuccess(false);
        setResetEmail('');
      }, 3000);
    }, 1500);
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
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-primary/10 rotate-3 text-4xl">
                👋
              </div>
              <h1 className="text-3xl font-black text-on-surface mb-2 tracking-tight">ยินดีต้อนรับกลับมา</h1>
              <p className="text-on-surface-variant text-center text-[15px] font-medium max-w-[280px]">
                กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
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
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-on-surface" htmlFor="password">รหัสผ่าน</label>
                  <button type="button" onClick={() => setIsForgotPasswordOpen(true)} className="flex-none text-sm text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer">ลืมรหัสผ่าน?</button>
                </div>
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

              <div className="flex items-center text-sm pt-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer w-5 h-5 appearance-none rounded border-2 border-outline-variant checked:border-primary checked:bg-primary transition-all cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors font-medium select-none">จดจำฉันไว้ในระบบ</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-extrabold flex justify-center items-center gap-2 hover:bg-black active:scale-[0.98] transition-all relative overflow-hidden group mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="loading flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 w-full text-center">เข้าสู่ระบบ</span>
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
                ยังไม่มีบัญชีผู้ใช้งานใช่ไหม? 
                <Link to="/register" className="text-primary hover:text-primary/80 font-black ml-2 underline decoration-2 underline-offset-4 decoration-primary/30 transition-colors">
                  สร้างบัญชีใหม่
                </Link>
              </p>
            </div>
          </motion.div>
          
        </motion.div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForgotPasswordOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl z-50 p-8 overflow-hidden"
            >
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${resetSuccess ? 'bg-green-50 text-green-600 border-green-100' : 'bg-primary/10 text-primary border-primary/20'}`}>
                  {resetSuccess ? <CheckCircle size={32} /> : <Key size={32} />}
                </div>

                {!resetSuccess ? (
                  <>
                    <h2 className="text-2xl font-black text-on-surface mb-2 tracking-tight">ลืมรหัสผ่าน</h2>
                    <p className="text-on-surface-variant text-[15px] font-medium mb-8">
                      กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
                    </p>

                    <form onSubmit={handleForgotPassword} className="w-full space-y-6">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-sm border border-outline-variant flex items-center justify-center rounded-lg z-10 text-outline-variant group-focus-within:text-primary transition-colors">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-[4.5rem] pr-4 py-4 rounded-xl border border-outline-variant bg-surface focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-outline-variant font-medium"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isResetting || !resetEmail}
                        className={`w-full bg-primary text-white py-4 rounded-xl font-extrabold flex justify-center items-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-all relative overflow-hidden group ${isResetting || !resetEmail ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isResetting ? (
                          <span className="loading flex items-center gap-3">
                            <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                            กำลังส่งลิงก์...
                          </span>
                        ) : (
                          <>
                            <span className="relative z-10 w-full text-center">ส่งลิงก์ตั้งค่ารหัสผ่าน</span>
                            <div className="absolute right-6 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                              <ArrowRight size={18} />
                            </div>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-2xl font-black text-on-surface mb-2 tracking-tight">ส่งลิงก์สำเร็จแล้ว</h2>
                    <p className="text-on-surface-variant text-[15px] font-medium mb-8">
                      เราได้ส่งลิงก์ตั้งค่ารหัสผ่านใหม่ไปยัง 
                      <span className="font-bold text-on-surface ml-1 block mt-1">{resetEmail}</span>
                    </p>
                    <button
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="w-full bg-surface-variant hover:bg-outline-variant/30 text-on-surface py-4 rounded-xl font-extrabold transition-all"
                    >
                      กลับไปหน้าเข้าสู่ระบบ
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

