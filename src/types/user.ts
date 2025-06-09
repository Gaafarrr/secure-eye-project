
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "viewer";
  status: "active" | "inactive";
  lastLogin?: Date;
  permissions: {
    canViewLive: boolean;
    canViewRecordings: boolean;
    canAccessSettings: boolean;
    canManageUsers: boolean;
    canExportData: boolean;
  };
}

export const defaultPermissions = {
  admin: {
    canViewLive: true,
    canViewRecordings: true,
    canAccessSettings: true,
    canManageUsers: true,
    canExportData: true,
  },
  operator: {
    canViewLive: true,
    canViewRecordings: true,
    canAccessSettings: false,
    canManageUsers: false,
    canExportData: true,
  },
  viewer: {
    canViewLive: true,
    canViewRecordings: false,
    canAccessSettings: false,
    canManageUsers: false,
    canExportData: false,
  },
};
