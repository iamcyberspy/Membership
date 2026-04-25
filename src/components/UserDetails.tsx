import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Shield, Mail, Calendar, Activity, CheckCircle, ShieldAlert, Key } from 'lucide-react';
import { mockUsers } from './Users';

// Mock permissions similar to Roles.tsx to show varying levels of access
const rolePermissions: Record<string, string[]> = {
  'ผู้ดูแลระบบ': ['แดชบอร์ด - ดูภาพรวมสถิติ', 'การจัดการผู้ใช้งาน - เข้าถึงทั้งหมด', 'การตั้งค่าระบบ - เข้าถึงทั้งหมด', 'บทบาทและสิทธิ์ - เข้าถึงทั้งหมด'],
  'ผู้จัดการ': ['แดชบอร์ด - ดูภาพรวมสถิติ', 'การจัดการผู้ใช้งาน - ดูข้อมูลและส่งออก', 'การตั้งค่าระบบ - เรียกดู'],
  'ผู้ใช้งาน': ['แดชบอร์ด - ดูภาพรวมสถิติ', 'การตั้งค่าระบบ - เรียกดูข้อมูลส่วนตัว'],
};

export default function UserDetails() {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === Number(id));

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <User size={64} className="text-on-surface-variant/50" />
        <h2 className="text-2xl font-black text-on-surface">ไม่พบผู้ใช้งานนี้</h2>
        <Link to="/users" className="text-primary font-bold hover:underline">
          กลับไปหน้ารายชื่อผู้ใช้งาน
        </Link>
      </div>
    );
  }

  const perms = rolePermissions[user.role] || [];
  const isSystemAdmin = user.role === 'ผู้ดูแลระบบ';

  return (
    <div className="space-y-8 font-sans pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/users" className="p-2 bg-surface hover:bg-surface-variant border border-outline-variant rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-on-surface" />
          </Link>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">ข้อมูลผู้ใช้งาน</h1>
            <p className="text-on-surface-variant mt-1 font-medium">รายละเอียด สิทธิ์ และประวัติการเข้าใช้งาน</p>
          </motion.div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="lg:col-span-1 space-y-8"
        >
          <div className="bg-white rounded-[32px] shadow-sm border border-surface-variant overflow-hidden p-8 text-center flex flex-col items-center relative">
            <div className={`absolute top-0 w-full h-24 ${isSystemAdmin ? 'bg-primary/20' : 'bg-surface-variant'}`} />
            
            <div className="w-28 h-28 bg-white border-4 border-white rounded-[28px] shadow-lg flex items-center justify-center z-10 relative overflow-hidden ring-1 ring-black/5">
              <div className="w-full h-full bg-secondary-container text-primary flex items-center justify-center text-4xl font-black">
                {user.name.charAt(0)}
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-on-surface mt-4">{user.name}</h2>
            <p className="text-on-surface-variant font-medium mt-1">{user.email}</p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className={`px-4 py-1.5 rounded-full text-sm font-black flex items-center gap-1.5 ${
                isSystemAdmin ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-on-surface-variant'
              }`}>
                {isSystemAdmin ? <ShieldAlert size={16} /> : <User size={16} />}
                {user.role}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-black flex items-center gap-1.5 ${
                user.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200/50' : 'bg-surface border-outline-variant text-on-surface-variant'
              }`}>
                <Activity size={16} />
                {user.status === 'active' ? 'กำลังใช้งาน' : 'ไม่ได้ใช้งาน'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[32px] shadow-sm border border-surface-variant p-8 space-y-6">
            <h3 className="text-lg font-black text-on-surface">ข้อมูลการติดต่อ & ประวัติ</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">อีเมล</p>
                  <p className="font-bold text-on-surface text-[15px] truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">เข้าใช้งานล่าสุด</p>
                  <p className="font-bold text-on-surface text-[15px]">{user.lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Permissions & Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white rounded-[32px] shadow-sm border border-surface-variant overflow-hidden">
            <div className="p-8 border-b border-surface-variant flex items-center gap-4 bg-surface/30">
              <div className={`p-2.5 rounded-xl ${isSystemAdmin ? 'bg-primary/10 text-primary' : 'bg-purple-50 text-purple-600'}`}>
                {isSystemAdmin ? <ShieldAlert size={24} /> : <Key size={24} />}
              </div>
              <div>
                <h2 className="text-2xl font-black text-on-surface">บทบาท: {user.role}</h2>
                <p className="text-sm font-medium text-on-surface-variant">สิทธิ์การเข้าถึงตามบทบาทปัจจุบัน</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-lg font-black text-on-surface mb-6">สิทธิ์ที่ได้รับ (Permissions)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {perms.map((perm, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-surface-variant bg-surface hover:border-primary/50 transition-colors group">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-primary">
                      <CheckCircle size={14} className="stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-[15px] leading-tight font-bold text-on-surface group-hover:text-primary transition-colors">
                        {perm}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {perms.length === 0 && (
                <div className="text-center py-10 bg-surface rounded-2xl border border-dashed border-outline-variant">
                  <p className="text-on-surface-variant font-bold">ไม่พบการกำหนดสิทธิ์พิเศษ</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
