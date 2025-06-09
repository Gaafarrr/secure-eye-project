
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: keyof User['permissions']) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo
const mockAdminUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@company.com",
  role: "admin",
  status: "active",
  lastLogin: new Date(),
  permissions: {
    canViewLive: true,
    canViewRecordings: true,
    canAccessSettings: true,
    canManageUsers: true,
    canExportData: true,
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockAdminUser);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would call an API
    if (email === "admin@company.com" && password === "admin") {
      setCurrentUser(mockAdminUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const hasPermission = (permission: keyof User['permissions']): boolean => {
    return currentUser?.permissions[permission] || false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
