
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/user';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  permission?: keyof User['permissions'];
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ children, permission, fallback }: ProtectedRouteProps) => {
  const { currentUser, hasPermission } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">Please log in to continue</p>
        </div>
      </div>
    );
  }

  if (permission && !hasPermission(permission)) {
    return fallback || (
      <div className="p-4">
        <Alert className="bg-red-900/20 border-red-700">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-red-300">
            You don't have permission to access this feature. Contact your administrator for access.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};
