import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, createContext, useContext, ReactNode } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Users from './components/Users';
import Activities from './components/Activities';
import Roles from './components/Roles';

interface AuthContextType {
  user: any;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<any>(null);

  const login = (email: string) => {
    setUser({
      name: 'สมชาย ใจดี',
      email: email,
      role: 'ผู้ดูแลระบบ',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          
          <Route
            element={
              user ? (
                <Layout>
                  <Outlet />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/activities" element={<Activities />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

