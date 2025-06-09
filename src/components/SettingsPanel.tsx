
import { 
  Camera, 
  Server, 
  Shield, 
  Bell, 
  Users,
  HardDrive,
  Wifi,
  Monitor
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="cameras" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-800">
          <TabsTrigger value="cameras" className="flex items-center space-x-1">
            <Camera className="h-4 w-4" />
            <span className="hidden sm:inline">Cameras</span>
          </TabsTrigger>
          <TabsTrigger value="recording" className="flex items-center space-x-1">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Recording</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center space-x-1">
            <Wifi className="h-4 w-4" />
            <span className="hidden sm:inline">Network</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center space-x-1">
            <HardDrive className="h-4 w-4" />
            <span className="hidden sm:inline">Storage</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cameras" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Camera Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Resolution</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p">1920x1080 (1080p)</SelectItem>
                      <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                      <SelectItem value="720p">1280x720 (720p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Frame Rate</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select frame rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 FPS</SelectItem>
                      <SelectItem value="25">25 FPS</SelectItem>
                      <SelectItem value="15">15 FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Night Vision</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span>Motion Detection</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Audio Recording</span>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recording" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Recording Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Recording Mode</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="continuous">Continuous</SelectItem>
                      <SelectItem value="motion">Motion Detection</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Quality</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Retention Period (Days)</label>
                <Input type="number" defaultValue="30" className="bg-gray-700 border-gray-600" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Motion Alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>System Alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Notifications</span>
                  <Switch />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Alert Email</label>
                <Input type="email" placeholder="admin@company.com" className="bg-gray-700 border-gray-600" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Network Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">IP Address</label>
                  <Input defaultValue="192.168.1.100" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Subnet Mask</label>
                  <Input defaultValue="255.255.255.0" className="bg-gray-700 border-gray-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Gateway</label>
                  <Input defaultValue="192.168.1.1" className="bg-gray-700 border-gray-600" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">DNS Server</label>
                  <Input defaultValue="8.8.8.8" className="bg-gray-700 border-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Auto-delete old recordings</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Compress recordings</span>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Storage Path</label>
                <Input defaultValue="/var/recordings" className="bg-gray-700 border-gray-600" />
              </div>
              
              <Button className="w-full">Test Storage Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Current Users</h3>
                <Button>Add User</Button>
              </div>
              
              <div className="space-y-2">
                {["admin", "operator", "viewer"].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{user}</p>
                      <p className="text-sm text-gray-400">
                        {user === "admin" ? "Full Access" : user === "operator" ? "Limited Access" : "View Only"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
