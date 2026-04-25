import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldAlert, Key, Plus, Trash2, Edit2, Users as UsersIcon, Check, X, CheckSquare } from 'lucide-react';

const initialRoles = [
  { id: '1', name: 'ผู้ดูแลระบบ', description: 'เข้าใช้งานและแก้ไขได้ทุกส่วนในระบบ', usersCount: 3, type: 'system' },
  { id: '2', name: 'ผู้จัดการ', description: 'จัดการข้อมูลผู้ใช้งานและดูรายงาน', usersCount: 12, type: 'custom' },
  { id: '3', name: 'ผู้ใช้งาน', description: 'สิทธิ์การใช้งานทั่วไป', usersCount: 1250, type: 'system' },
];

const permissionModules = [
  {
    id: 'dashboard', name: 'แดชบอร์ด (Dashboard)',
    permissions: [
      { id: 'dashboard.view', name: 'ดูภาพรวมสถิติ' },
    ]
  },
  {
    id: 'users', name: 'จัดการผู้ใช้งาน (Users)',
    permissions: [
      { id: 'users.view', name: 'ดูรายชื่อผู้ใช้งานทั้งหมด' },
      { id: 'users.create', name: 'เพิ่มผู้ใช้งานใหม่' },
      { id: 'users.edit', name: 'แก้ไขข้อมูลผู้ใช้งาน' },
      { id: 'users.delete', name: 'ลบผู้ใช้งาน' },
      { id: 'users.export', name: 'ส่งออกข้อมูล' },
    ]
  },
  {
    id: 'roles', name: 'บทบาทและสิทธิ์ (Roles)',
    permissions: [
      { id: 'roles.view', name: 'ดูบทบาทแบบสิทธิ์ทั้งหมด' },
      { id: 'roles.manage', name: 'แก้ไขและลบบทบาทสิทธิ์' },
    ]
  },
  {
    id: 'settings', name: 'การตั้งค่า (Settings)',
    permissions: [
      { id: 'settings.view', name: 'เรียกดูการตั้งค่าระบบ' },
      { id: 'settings.edit', name: 'แก้ไขการตั้งค่าระบบ' },
    ]
  }
];

// Map of role IDs and their toggled perms for demonstration
const mockPerms: Record<string, string[]> = {
  '1': ['dashboard.view', 'users.view', 'users.create', 'users.edit', 'users.delete', 'users.export', 'roles.view', 'roles.manage', 'settings.view', 'settings.edit'],
  '2': ['dashboard.view', 'users.view', 'users.create', 'users.edit', 'users.export'],
  '3': ['dashboard.view', 'settings.view']
};

export default function Roles() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(initialRoles[0].id);
  const [rolePerms, setRolePerms] = useState<Record<string, string[]>>(mockPerms);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const activeRole = roles.find(r => r.id === selectedRole);
  const currentPerms = rolePerms[selectedRole] || [];

  const togglePermission = (permId: string) => {
    if (!isEditing) return;
    setRolePerms(prev => {
      const permsForRole = prev[selectedRole] || [];
      if (permsForRole.includes(permId)) {
        return { ...prev, [selectedRole]: permsForRole.filter(p => p !== permId) };
      } else {
        return { ...prev, [selectedRole]: [...permsForRole, permId] };
      }
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">บทบาท & สิทธิ์การใช้งาน</h1>
          <p className="text-on-surface-variant mt-2 text-lg">จัดการบทบาทและกำหนดสิทธิ์เข้าถึงฟีเจอร์ต่างๆ</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex gap-3">
          <button className="bg-primary text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-opacity-90 active:scale-95 transition-all shadow-md">
            <Plus size={20} />
            เพิ่มบทบาทใหม่
          </button>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roles Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-surface-variant overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-6 border-b border-surface-variant bg-surface/30">
              <h2 className="text-[17px] font-black text-on-surface flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                รายชื่อบทบาท
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => { setSelectedRole(role.id); setIsEditing(false); }}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    selectedRole === role.id 
                      ? 'bg-secondary-container text-primary shadow-sm border border-primary/20' 
                      : 'hover:bg-surface-variant text-on-surface border border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-[16px]">{role.name}</span>
                    {role.type === 'system' && (
                      <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded-full">ระบบ</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold mt-2 opacity-80">
                    <UsersIcon size={14} />
                    ผู้ใช้ {role.usersCount} คน
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-surface-variant overflow-hidden">
            {activeRole && (
              <>
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between border-b border-surface-variant bg-surface/30 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${activeRole.type === 'system' ? 'bg-primary/10 text-primary' : 'bg-purple-50 text-purple-600'}`}>
                        {activeRole.type === 'system' ? <ShieldAlert size={24} /> : <Key size={24} />}
                      </div>
                      <h2 className="text-2xl font-black text-on-surface">{activeRole.name}</h2>
                    </div>
                    <p className="text-on-surface-variant text-[15px] font-medium max-w-lg">{activeRole.description}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 rounded-xl font-bold bg-surface hover:bg-surface-variant border border-outline-variant text-on-surface transition-all active:scale-95 text-sm"
                        >
                          ยกเลิก
                        </button>
                        <button 
                          onClick={handleSave}
                          className="px-6 py-3 rounded-xl font-bold bg-primary text-white shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2 active:scale-95 text-sm"
                        >
                          <Check size={18} />
                          บันทึกสิทธิ์
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 rounded-xl font-bold bg-surface hover:bg-surface-variant border border-outline-variant text-on-surface transition-all flex items-center gap-2 active:scale-95 text-sm"
                      >
                        <Edit2 size={18} />
                        แก้ไขสิทธิ์เข้าถึง
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-10 bg-white">
                  {permissionModules.map(module => (
                    <div key={module.id} className="space-y-4">
                      <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                        {module.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {module.permissions.map(perm => {
                          const isEnabled = currentPerms.includes(perm.id);
                          return (
                            <div 
                              key={perm.id} 
                              onClick={() => togglePermission(perm.id)}
                              className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                                !isEditing ? 'opacity-80' : 'cursor-pointer hover:shadow-sm'
                              } ${
                                isEnabled 
                                  ? 'bg-blue-50/50 border-primary text-primary' 
                                  : 'bg-surface border-surface-variant text-on-surface-variant'
                              }`}
                            >
                              <div className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded overflow-hidden ${
                                isEnabled 
                                  ? 'bg-primary text-white' 
                                  : 'bg-white border-2 border-outline-variant'
                              }`}>
                                {isEnabled && <Check size={14} className="stroke-[3]" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[15px] leading-tight font-bold ${isEnabled ? 'text-primary' : 'text-on-surface'}`}>
                                  {perm.name}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 bg-green-50 text-green-700 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-green-200 z-50 font-bold"
          >
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700">
              <Check size={18} />
            </div>
            อัปเดตสิทธิ์การใช้งานเรียบร้อยแล้ว
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
