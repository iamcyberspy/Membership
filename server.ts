import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  const PORT = 3000;

  // Let's store some initial state to serve to joining clients
  let dashboardStats = {
    users: 6,
    activities: 120,
    online: 1,
    systemStatus: 'ปกติ',
  };

  let activities = [
    { id: 1, user: 'ระบบ', action: 'ระบบพร้อมใช้งาน', module: 'ระบบ', time: new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'}) + ' น.', date: 'วันนี้', type: 'info', icon: 'server' },
    { id: 2, user: 'คุณวิชัย', action: 'อัปเดตข้อมูลโปรไฟล์', module: 'จัดการผู้ใช้', time: '09:15 น.', date: 'วันนี้', type: 'success', icon: 'FileText' },
    { id: 3, user: 'ระบบความปลอดภัย', action: 'พบการพยายามเข้าสู่ระบบผิดพลาด 3 ครั้ง', module: 'ความปลอดภัย', time: '08:45 น.', date: 'วันนี้', type: 'warning', icon: 'AlertTriangle' },
    { id: 4, user: 'ประยุทธ์ สิทธิ์', action: 'เข้าสู่ระบบ', module: 'ระบบจัดการ', time: '15:20 น.', date: 'เมื่อวาน', type: 'info', icon: 'user' },
    { id: 5, user: 'แพรทองทา', action: 'ลบผู้ใช้งาน "ชูใจ ชอบใจ"', module: 'จัดการผู้ใช้', time: '14:10 น.', date: 'เมื่อวาน', type: 'warning', icon: 'Trash2' },
  ];

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Increment online users and broadcast
    dashboardStats.online += 1;
    io.emit('stats:update', dashboardStats);
    
    // Broadcast a new activity
    const newActivity = {
      id: Date.now(),
      user: 'ผู้ใช้ใหม่',
      action: 'เชื่อมต่อเข้าสู่ขระบบ',
      module: 'ระบบ',
      time: new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'}) + ' น.',
      date: 'วันนี้',
      type: 'info',
      icon: 'user'
    };
    activities.unshift(newActivity);
    if (activities.length > 50) activities.pop();
    
    io.emit('activity:new', newActivity);

    // Give current state to the connected client
    socket.emit('init', {
      stats: dashboardStats,
      activities: activities
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      dashboardStats.online = Math.max(1, dashboardStats.online - 1);
      io.emit('stats:update', dashboardStats);
    });
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", activeConnections: io.engine.clientsCount });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
