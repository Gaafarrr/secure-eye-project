
import { 
  Monitor, 
  Video, 
  Activity, 
  Settings, 
  Shield, 
  Camera,
  HardDrive,
  Wifi,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
  availableOptions: string[];
}

export const Sidebar = ({ activePanel, setActivePanel, availableOptions }: SidebarProps) => {
  const allMenuItems = [
    { id: "live", label: "Live View", icon: Monitor },
    { id: "recordings", label: "Recordings", icon: Video },
    { id: "status", label: "System Status", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Filter menu items based on available options
  const menuItems = allMenuItems.filter(item => availableOptions.includes(item.id));

  const systemInfo = [
    { label: "Cameras Online", value: "8/8", icon: Camera, status: "good" },
    { label: "Storage", value: "2.1TB", icon: HardDrive, status: "warning" },
    { label: "Network", value: "Connected", icon: Wifi, status: "good" },
    { label: "Alerts", value: "3", icon: AlertTriangle, status: "error" },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold">SecureVision</h1>
            <p className="text-xs text-gray-400">Security Management System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                activePanel === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-3">System Overview</h3>
        <div className="space-y-2">
          {systemInfo.map((info, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <info.icon className={cn(
                  "h-4 w-4",
                  info.status === "good" && "text-green-500",
                  info.status === "warning" && "text-yellow-500",
                  info.status === "error" && "text-red-500"
                )} />
                <span className="text-gray-300">{info.label}</span>
              </div>
              <span className={cn(
                "font-medium",
                info.status === "good" && "text-green-400",
                info.status === "warning" && "text-yellow-400",
                info.status === "error" && "text-red-400"
              )}>
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
