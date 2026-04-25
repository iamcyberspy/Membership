import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Filter, Search, PersonStanding, FileText, AlertTriangle, UserPlus, Settings, Download, Trash2, ArrowRight, Server } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

export default function Activities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activitiesData, setActivitiesData] = useState<any[]>([]);
  
  useEffect(() => {
    const newSocket = io();
    
    newSocket.on('init', (data) => {
      setActivitiesData(data.activities);
    });

    newSocket.on('activity:new', (newActivity) => {
      setActivitiesData(prev => [newActivity, ...prev]); 
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const getIcon = (iconName: string, type: string) => {
    if (iconName === 'server') return Server;
    if (iconName === 'user') return PersonStanding;
    if (type === 'warning') return AlertTriangle;
    if (type === 'success') return FileText;
    return PersonStanding;
  };

  const filteredActivities = activitiesData.filter(activity => 
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, typeof activitiesData>);

  return (
    <div className="space-y-8 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">บันทึกกิจกรรม</h1>
          <p className="text-on-surface-variant mt-2">ตรวจสอบประวัติการใช้งานและการเปลี่ยนแปลงในระบบ</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface hover:bg-surface-variant text-on-surface border border-outline-variant font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Download size={20} />
          ส่งออกข้อมูล
        </motion.button>
      </header>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[20px] shadow-sm border border-surface-variant flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="ค้นหากิจกรรม ผู้ใช้ หรือโมดูล..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-variant transition-colors text-on-surface-variant font-medium">
            <Calendar size={18} />
            <span>ช่วงเวลา</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-variant transition-colors text-on-surface-variant font-medium">
            <Filter size={18} />
            <span>ตัวกรองเสริม</span>
          </button>
        </div>
      </div>

      {/* Activities Timeline view */}
      <div className="bg-white rounded-[24px] shadow-sm border border-surface-variant p-6 md:p-8">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-variant text-on-surface-variant rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <p className="text-lg font-bold text-on-surface">ไม่พบกิจกรรมที่ค้นหา</p>
            <p className="text-on-surface-variant">ลองค้นหาด้วยคำสำคัญอื่นๆ</p>
          </div>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-variant before:to-transparent">
            {Object.keys(groupedActivities).map((date, dateIdx) => (
              <div key={date} className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <span className="bg-surface py-1.5 px-4 rounded-full text-sm font-bold text-on-surface-variant border border-outline-variant shadow-sm z-10">
                    {date}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {groupedActivities[date].map((activity, actIdx) => {
                      const Icon = getIcon(activity.icon, activity.type);
                      return (
                        <motion.div 
                          key={activity.id}
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ delay: 0.05 }}
                          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none"
                        >
                          {/* Timeline Dot */}
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 z-10">
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${
                              activity.type === 'warning' ? 'bg-red-50 text-red-600' : 
                              activity.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-primary/10 text-primary'
                            }`}>
                              <Icon size={16} className="shrink-0" />
                            </div>
                          </div>
                          
                          {/* Card layout adjustment for mobile vs desktop */}
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] px-4">
                            <div className="p-5 bg-surface hover:bg-surface-bright rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all cursor-pointer group-hover:-translate-y-1">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">{activity.module}</span>
                                <span className="text-xs font-medium text-outline flex items-center gap-1">
                                  <Calendar size={12} />
                                  {activity.time}
                                </span>
                              </div>
                              <p className="text-on-surface font-bold text-[15px] mb-1 leading-snug">{activity.action}</p>
                              <div className="flex items-center gap-2 mt-3 text-sm text-on-surface-variant">
                                <div className="w-6 h-6 rounded-full bg-secondary-container text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                  {activity.user.charAt(0)}
                                </div>
                                <span className="truncate">{activity.user}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {!searchTerm && (
        <div className="flex justify-center mt-8">
           <button className="bg-surface border border-outline-variant hover:bg-surface-variant text-on-surface font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
            โหลดข้อมูลเพิ่มเติม
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
