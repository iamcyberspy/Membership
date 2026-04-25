import { User, Lock, Bell, CheckCircle, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../App';

export default function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'สมชาย ใจดี',
    email: user?.email || 'somchai.j@example.com',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [notifications, setNotifications] = useState({
    system: true,
    activity: true,
    promo: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-10 font-sans pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">การตั้งค่าระบบ</h1>
          <p className="text-on-surface-variant mt-2 text-lg">จัดการข้อมูลส่วนตัว ความปลอดภัย และการแจ้งเตือน</p>
        </div>
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-full border border-green-200 font-bold shadow-sm"
            >
              <CheckCircle size={20} />
              บันทึกข้อมูลเรียบร้อยแล้ว
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Basic Settings */}
          <section className="bg-white rounded-[32px] shadow-sm border border-surface-variant overflow-hidden">
            <div className="p-8 border-b border-surface-variant flex items-center gap-4 bg-surface/30">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <User size={24} />
              </div>
              <h2 className="text-2xl font-black text-on-surface">ข้อมูลบัญชีเบื้องต้น</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface ml-1">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[16px]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface ml-1">อีเมลทางการ</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-surface border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[16px]"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-primary text-white font-black rounded-2xl px-10 py-4 hover:bg-opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2 text-[16px]"
                >
                  {isSaving ? 'กำลังบันทึก...' : (
                    <>
                      <Save size={20} />
                      บันทึกข้อมูล
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Password Section */}
          <section className="bg-white rounded-[32px] shadow-sm border border-surface-variant overflow-hidden">
            <div className="p-8 border-b border-surface-variant flex items-center gap-4 bg-surface/30">
              <div className="p-2.5 bg-red-50 rounded-xl text-red-600">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-black text-on-surface">ความปลอดภัย</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="max-w-xl space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface ml-1">รหัสผ่านปัจจุบัน</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-surface border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[16px]"
                  />
                </div>
                <div className="h-px bg-surface-variant mx-1" />
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface ml-1">รหัสผ่านใหม่</label>
                  <input 
                    type="password" 
                    placeholder="อย่างน้อย 8 ตัวอักษร พร้อมอักขระพิเศษ" 
                    className="w-full bg-surface border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[16px]"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-on-surface ml-1">ยืนยันรหัสผ่านใหม่</label>
                  <input 
                    type="password" 
                    placeholder="พิมพ์รหัสผ่านใหม่อีกครั้ง" 
                    className="w-full bg-surface border border-outline-variant rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-[16px]"
                  />
                </div>
              </div>
              <div className="flex justify-start pt-4">
                <button className="bg-surface border border-outline-variant hover:bg-surface-variant text-on-surface font-black rounded-2xl px-10 py-4 transition-all active:scale-95 text-[16px] shadow-sm">
                  อัปเดตรหัสผ่าน
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Notifications Sidebar Style */}
        <div className="space-y-8">
          <section className="bg-white rounded-[32px] shadow-sm border border-surface-variant overflow-hidden">
            <div className="p-8 border-b border-surface-variant flex items-center gap-4 bg-surface/30">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                <Bell size={24} />
              </div>
              <h2 className="text-xl font-black text-on-surface">การแจ้งเตือน</h2>
            </div>
            <div className="divide-y divide-surface">
              {[
                { id: 'system', label: 'แจ้งเตือนระบบ', sub: 'รับข้อมูลอัปเดตและความปลอดภัย' },
                { id: 'activity', label: 'แจ้งเตือนกิจกรรม', sub: 'เมื่อมีการเคลื่อนไหวในทีม' },
                { id: 'promo', label: 'ข่าวสารพิเศษ', sub: 'รับโปรโมชั่นและข้อเสนอใหม่' },
              ].map((item) => (
                <div key={item.id} className="p-7 flex items-center justify-between hover:bg-surface-bright transition-colors group">
                  <div className="pr-4 space-y-1">
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors text-[16px]">{item.label}</p>
                    <p className="text-[13px] text-on-surface-variant leading-tight">{item.sub}</p>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.id as keyof typeof notifications)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notifications[item.id as keyof typeof notifications] ? 'bg-primary' : 'bg-surface-variant'}`}
                  >
                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${notifications[item.id as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="p-8 bg-red-50 rounded-[32px] border border-red-100 flex flex-col items-center text-center space-y-4">
            <h3 className="text-lg font-black text-red-600 tracking-tight">เขตอันตราย</h3>
            <p className="text-sm text-red-700/70 font-medium">หากคุณลบบัญชีนี้ ข้อมูลทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้</p>
            <button className="w-full py-4 text-sm font-black text-white bg-red-600 rounded-2xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
              ลบบัญชีผู้ใช้งาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
