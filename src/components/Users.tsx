import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreVertical, Edit2, Trash2, UserPlus, Shield, User, AlertTriangle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const mockUsers = [
  { id: 1, name: 'สมหญิง สมใจ', email: 'somying.s@example.com', role: 'ผู้ใช้งาน', status: 'active', lastLogin: '2 ชั่วโมงที่แล้ว' },
  { id: 2, name: 'คุณวิชัย', email: 'wichai.k@example.com', role: 'ผู้ดูแลระบบ', status: 'active', lastLogin: '1 ชั่วโมงที่แล้ว' },
  { id: 3, name: 'ประยุทธ์ สิทธิ์', email: 'prayut.s@example.com', role: 'ผู้ใช้งาน', status: 'inactive', lastLogin: '3 วันที่แล้ว' },
  { id: 4, name: 'แพรทองทา', email: 'pae.t@example.com', role: 'ผู้จัดการ', status: 'active', lastLogin: '15 นาทีที่แล้ว' },
  { id: 5, name: 'มานี มีใจ', email: 'manee.m@example.com', role: 'ผู้ใช้งาน', status: 'active', lastLogin: '1 วันที่แล้ว' },
  { id: 6, name: 'ชูใจ ชอบใจ', email: 'choojai.c@example.com', role: 'ผู้ใช้งาน', status: 'inactive', lastLogin: '1 สัปดาห์ที่แล้ว' }
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState(mockUsers);
  const [userToDelete, setUserToDelete] = useState<{id: number, name: string} | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleDeleteClick = (user: {id: number, name: string}) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  return (
    <div className="space-y-8 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">การจัดการผู้ใช้งาน</h1>
          <p className="text-on-surface-variant mt-2">จัดการบัญชีผู้ใช้ สิทธิ์การเข้าถึง และสถานะ</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary hover:bg-primary-container text-white hover:text-on-primary-container font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <UserPlus size={20} />
          เพิ่มผู้ใช้งานใหม่
        </motion.button>
      </header>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[20px] shadow-sm border border-surface-variant flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="ค้นหาชื่อ หรือ อีเมล..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto h-auto">
          <div className="relative flex-1 md:flex-none">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface hover:bg-surface-variant transition-colors text-on-surface-variant font-medium outline-none focus:border-primary appearance-none pr-10 cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="all">บทบาททั้งหมด</option>
              <option value="ผู้ใช้งาน">ผู้ใช้งาน</option>
              <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
              <option value="ผู้จัดการ">ผู้จัดการ</option>
            </select>
          </div>
          <div className="relative flex-1 md:flex-none">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-xl bg-surface hover:bg-surface-variant transition-colors text-on-surface-variant font-medium outline-none focus:border-primary appearance-none pr-10 cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">กำลังใช้งาน</option>
              <option value="inactive">ไม่ได้ใช้งาน</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[24px] shadow-sm border border-surface-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-variant">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">ผู้ใช้งาน</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">สิทธิ์ / บทบาท</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">สถานะ</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant">ใช้งานล่าสุด</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-on-surface-variant text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
              {filteredUsers.map((user, idx) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-surface-bright transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-on-surface">{user.name}</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-sm text-on-surface">
                      {user.role === 'ผู้ดูแลระบบ' ? <Shield size={16} className="text-primary" /> : <User size={16} className="text-on-surface-variant" />}
                      <span className={user.role === 'ผู้ดูแลระบบ' ? 'font-bold text-primary' : 'font-medium text-on-surface'}>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}>
                      {user.status === 'active' ? 'กำลังใช้งาน' : 'ไม่ได้ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/users/${user.id}`} className="p-2 text-on-surface-variant hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </Link>
                      <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    ไม่พบข้อมูลผู้ใช้งานที่ค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {userToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 m-auto w-[90%] max-w-[400px] h-fit bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle size={32} />
                </div>
                <h2 className="text-2xl font-black text-on-surface mb-2 tracking-tight">ยืนยันการลบผู้ใช้งาน?</h2>
                <p className="text-on-surface-variant font-medium text-[15px] mb-8 leading-relaxed">
                  คุณกำลังจะลบผู้ใช้งาน <br/>
                  <span className="font-bold text-on-surface">"{userToDelete.name}"</span><br/>
                  การกระทำนี้ไม่สามารถยกเลิกได้
                </p>
                <div className="flex w-full gap-3">
                  <button 
                    onClick={cancelDelete}
                    className="flex-1 py-3.5 px-4 bg-surface hover:bg-surface-variant text-on-surface font-bold rounded-xl transition-all"
                  >
                    ยกเลิก
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
                  >
                    ลบข้อมูล
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
