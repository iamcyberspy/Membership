import { Users, Bell, CheckCircle, PersonStanding, FileText, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { useState, useEffect } from 'react';

const activitiesData = [
  { user: 'สมหญิง สมใจ', action: 'สมัครสมาชิกใหม่', module: 'ระบบสมาชิก', time: '10 นาทีที่แล้ว', icon: PersonStanding, type: 'info' },
  { user: 'คุณวิชัย', action: 'อัปเดตข้อมูลโปรไฟล์', module: 'จัดการผู้ใช้', time: '1 ชั่วโมงที่แล้ว', icon: FileText, type: 'success' },
  { user: 'ระบบความปลอดภัย', action: 'พบการพยายามเข้าสู่ระบบผิดพลาด 3 ครั้ง', module: 'ความปลอดภัย', time: '2 ชั่วโมงที่แล้ว', icon: AlertTriangle, type: 'warning' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('th-TH'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('th-TH'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'ผู้ใช้งานทั้งหมด', value: '1,234', trend: '+12% จากเดือนที่แล้ว', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', up: true },
    { label: 'กิจกรรมวันนี้', value: '56', trend: '+5% จากสัปดาห์ที่แล้ว', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100', up: true },
    { label: 'สถานะเซิร์ฟเวอร์', value: '99.9%', trend: `เวลาระบบ: ${currentTime}`, icon: Clock, color: 'text-green-600', bg: 'bg-green-100', up: false },
  ];

  return (
    <div className="space-y-10 font-sans">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">สวัสดีคุณ {user.name.split(' ')[0]} 👋</h1>
          <p className="text-on-surface-variant mt-2 text-lg">ยินดีต้อนรับกลับมา! นี่คือภาพรวมของระบบคุณในวันนี้</p>
        </motion.div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-outline-variant text-sm font-bold text-on-surface-variant">
          <CheckCircle size={16} className="text-green-500" />
          ระบบทำงานปกติ
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-[24px] shadow-sm border border-surface-variant relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} opacity-10 rounded-bl-full transition-all group-hover:scale-125`} />
            
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
                <stat.icon size={24} />
              </div>
              {stat.up && <span className="text-[10px] uppercase font-black bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">Growth</span>}
            </div>
            
            <div className="space-y-1">
              <p className="text-3xl font-black text-on-surface">{stat.value}</p>
              <p className="text-on-surface-variant font-bold text-[15px]">{stat.label}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-surface flex items-center gap-2">
              <p className={`text-sm font-bold ${stat.color}`}>{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-on-surface">กิจกรรมล่าสุด</h3>
            <button className="text-primary font-bold text-sm hover:underline">ดูทั้งหมด</button>
          </div>
          
          <div className="space-y-4">
            {activitiesData.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-5 p-5 bg-white rounded-[20px] shadow-sm border border-surface-variant hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                  item.type === 'warning' ? 'bg-red-50 text-red-600' : 
                  item.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'
                }`}>
                  <item.icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-on-surface font-bold text-[16px] truncate">{item.user} <span className="font-normal text-on-surface-variant">{item.action}</span></p>
                  <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider mt-0.5">{item.module}</p>
                </div>
                <div className="text-right">
                  <p className="text-outline text-xs font-bold whitespace-nowrap">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions / System Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-on-surface">ทางลัดระบบ</h3>
          <div className="bg-primary text-white p-6 rounded-[24px] shadow-xl space-y-4">
            <p className="font-bold text-lg">ต้องการความช่วยเหลือ?</p>
            <p className="text-white/80 text-sm leading-relaxed">หากคุณมีปัญหาในการใช้งานระบบหรือต้องการความช่วยเหลือเพิ่มเติม สามารถติดต่อทีมซัพพอร์ตได้ตลอด 24 ชม.</p>
            <button className="w-full bg-white text-primary py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg">
              แชทกับเจ้าหน้าที่
            </button>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-surface-variant shadow-sm space-y-4">
            <p className="font-bold text-on-surface">สถานะความปลอดภัย</p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-on-surface-variant">ไฟร์วอลล์ทำงานปกติ</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-on-surface-variant">สำรองข้อมูลล่าสุด: 04:00 น.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
