
import { 
  Server, 
  HardDrive, 
  Wifi, 
  Camera, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const StatusPanel = () => {
  const systemMetrics = [
    { label: "CPU Usage", value: 45, unit: "%", status: "good" },
    { label: "Memory Usage", value: 67, unit: "%", status: "warning" },
    { label: "Storage Usage", value: 89, unit: "%", status: "critical" },
    { label: "Network Traffic", value: 23, unit: "Mbps", status: "good" },
  ];

  const deviceStatus = [
    { name: "Main Server", status: "online", uptime: "15d 4h 23m" },
    { name: "Backup Server", status: "online", uptime: "15d 4h 23m" },
    { name: "Network Switch", status: "online", uptime: "30d 12h 45m" },
    { name: "Storage Array", status: "warning", uptime: "10d 2h 15m" },
  ];

  const alerts = [
    { type: "warning", message: "Storage space running low on Server 1", time: "2 minutes ago" },
    { type: "error", message: "Camera CAM-004 connection lost", time: "15 minutes ago" },
    { type: "info", message: "System backup completed successfully", time: "1 hour ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "offline": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-300">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-sm text-gray-400">{metric.unit}</span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Device Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStatus.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(device.status)}
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-xs text-gray-400">Uptime: {device.uptime}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    device.status === "online" ? "bg-green-900 text-green-300" :
                    device.status === "warning" ? "bg-yellow-900 text-yellow-300" :
                    "bg-red-900 text-red-300"
                  }`}>
                    {device.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
