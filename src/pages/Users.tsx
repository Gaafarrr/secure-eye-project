
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, defaultPermissions } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users as UsersIcon, UserPlus, Settings, Shield } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const Users = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@company.com",
      role: "admin",
      status: "active",
      lastLogin: new Date(),
      permissions: defaultPermissions.admin
    },
    {
      id: "2",
      name: "Security Operator",
      email: "operator@company.com",
      role: "operator",
      status: "active",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      permissions: defaultPermissions.operator
    },
    {
      id: "3",
      name: "Reception Viewer",
      email: "viewer@company.com",
      role: "viewer",
      status: "active",
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
      permissions: defaultPermissions.viewer
    },
    {
      id: "4",
      name: "Night Guard",
      email: "guard@company.com",
      role: "operator",
      status: "inactive",
      permissions: defaultPermissions.operator
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole, permissions: defaultPermissions[newRole] }
        : user
    ));
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handlePermissionChange = (userId: string, permission: keyof User['permissions'], value: boolean) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, permissions: { ...user.permissions, [permission]: value } }
        : user
    ));
  };

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-900/20 text-red-300 border-red-700';
      case 'operator': return 'bg-blue-900/20 text-blue-300 border-blue-700';
      case 'viewer': return 'bg-green-900/20 text-green-300 border-green-700';
      default: return 'bg-gray-900/20 text-gray-300 border-gray-700';
    }
  };

  const getStatusBadgeColor = (status: User['status']) => {
    return status === 'active' 
      ? 'bg-green-900/20 text-green-300 border-green-700'
      : 'bg-gray-900/20 text-gray-300 border-gray-700';
  };

  return (
    <ProtectedRoute permission="canManageUsers">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UsersIcon className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">User Management</h1>
              <p className="text-gray-400">Manage user access and permissions</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-900/20 rounded-lg">
                  <UsersIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xl font-semibold text-white">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-xl font-semibold text-white">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-900/20 rounded-lg">
                  <Settings className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Admins</p>
                  <p className="text-xl font-semibold text-white">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-900/20 rounded-lg">
                  <UsersIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Operators</p>
                  <p className="text-xl font-semibold text-white">
                    {users.filter(u => u.role === 'operator').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Login</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-gray-700">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog open={isDialogOpen && selectedUser?.id === user.id} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                              disabled={user.id === currentUser?.id}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>Edit User: {user.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Role</Label>
                                <Select 
                                  value={user.role} 
                                  onValueChange={(value: User['role']) => handleRoleChange(user.id, value)}
                                >
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="operator">Operator</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label>Status</Label>
                                <Select 
                                  value={user.status} 
                                  onValueChange={(value: User['status']) => handleStatusChange(user.id, value)}
                                >
                                  <SelectTrigger className="bg-gray-700 border-gray-600">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label className="text-base font-medium">Permissions</Label>
                                <div className="space-y-3 mt-2">
                                  {Object.entries(user.permissions).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                      <span className="text-sm text-gray-300">
                                        {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                                      </span>
                                      <Switch
                                        checked={value}
                                        onCheckedChange={(checked) => 
                                          handlePermissionChange(user.id, key as keyof User['permissions'], checked)
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Users;
