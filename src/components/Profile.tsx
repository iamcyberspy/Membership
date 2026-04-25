import { Mail, Phone, Camera, Edit2, Calendar, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../App';

export default function Profile() {
  const { user } = useAuth();
  
  const profile = {
    name: user?.name || 'สมชาย ใจดี',
    email: user?.email || 'somchai.j@example.com',
    phone: '+66 81 234 5678',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=512&h=512&q=80',
    cover: 'bg-primary-container/20',
    birthday: '1990-01-15',
    role: user?.role || 'ผู้ดูแลระบบ',
    location: 'กรุงเทพมหานคร, ประเทศไทย'
  };

  return (
    <div className="space-y-10 font-sans pb-10">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[32px] shadow-sm border border-surface-variant relative overflow-hidden">
        <div className={`h-48 w-full ${profile.cover} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        <div className="px-8 pb-10 flex flex-col items-center md:items-start md:flex-row gap-8">
          <div className="relative -mt-20 md:-mt-24">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-[40px] border-[6px] border-white shadow-xl overflow-hidden bg-surface-variant ring-1 ring-black/5">
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-3 right-3 bg-primary text-white rounded-2xl p-3 shadow-lg hover:scale-110 active:scale-95 transition-all">
              <Camera size={22} />
            </button>
          </div>
          
          <div className="flex-1 mt-6 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-on-surface tracking-tight">{profile.name}</h2>
              <p className="text-xl font-bold text-primary">{profile.role}</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-on-surface-variant justify-center md:justify-start font-medium text-[15px]">
              <div className="flex items-center gap-2.5">
                <Mail size={20} className="text-blue-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={20} className="text-red-500" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-black border border-blue-100">สมาชิกพรีเมียม</span>
              <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-black border border-green-100 italic">ยืนยันตัวตนแล้วระดับสูง</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Additional Stats/Info Sidebar */}
        <div className="space-y-8">
          <section className="bg-white rounded-[32px] shadow-sm border border-surface-variant p-8 space-y-6">
            <h3 className="text-xl font-black text-on-surface">ข้อมูลการติดต่อ</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Phone size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">เบอร์โทรศัพท์</p>
                  <p className="font-bold text-on-surface text-[15px]">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">วันเดือนปีเกิด</p>
                  <p className="font-bold text-on-surface text-[15px]">15 มกราคม 2533</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Briefcase size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-on-surface-variant uppercase tracking-widest">ตำแหน่งงาน</p>
                  <p className="font-bold text-on-surface text-[15px]">Senior Product Manager</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Detailed Info Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[32px] shadow-sm border border-surface-variant p-8 md:p-10 space-y-8">
            <div className="flex justify-between items-center border-b border-surface pb-6">
              <h2 className="text-2xl font-black text-on-surface">รายละเอียดส่วนตัว</h2>
              <button className="bg-primary hover:bg-opacity-90 text-white rounded-[16px] px-6 py-3 font-black text-sm flex items-center gap-2 transition-all shadow-md active:scale-95">
                <Edit2 size={18} />
                แก้ไขข้อมูล
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-3">
                <label className="text-sm font-black text-on-surface ml-1">ชื่อจริง</label>
                <div className="w-full rounded-2xl border border-surface-variant px-5 py-4 text-on-surface bg-surface/30 font-medium text-[16px]">สมชาย</div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-on-surface ml-1">นามสกุล</label>
                <div className="w-full rounded-2xl border border-surface-variant px-5 py-4 text-on-surface bg-surface/30 font-medium text-[16px]">ใจดี</div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-black text-on-surface ml-1">ที่อยู่ปัจจุบัน</label>
                <div className="w-full rounded-2xl border border-surface-variant px-5 py-4 text-on-surface bg-surface/30 font-medium text-[16px] leading-relaxed">
                  123/45 หมู่บ้านสวยงาม ซอยสุขุมวิท 101 แขวงบางจาก เขตพระโขนง กรุงเทพมหานคร 10260
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-on-surface ml-1">ภาษาที่ถนัด</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-surface-variant rounded-xl text-xs font-black">ไทย (Native)</span>
                  <span className="px-3 py-1.5 bg-surface-variant rounded-xl text-xs font-black">อังกฤษ (Fluent)</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
