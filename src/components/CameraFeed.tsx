
import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Recording,
  Wifi,
  WifiOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Camera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "recording";
}

interface CameraFeedProps {
  camera: Camera;
  isSelected: boolean;
  onSelect: () => void;
}

export const CameraFeed = ({ camera, isSelected, onSelect }: CameraFeedProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-500";
      case "recording": return "text-red-500";
      case "offline": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Wifi className="h-4 w-4" />;
      case "recording": return <Recording className="h-4 w-4" />;
      case "offline": return <WifiOff className="h-4 w-4" />;
      default: return <WifiOff className="h-4 w-4" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative bg-gray-800 rounded-lg overflow-hidden border-2 transition-all cursor-pointer group",
        isSelected ? "border-blue-500" : "border-gray-700 hover:border-gray-600",
        camera.status === "offline" && "opacity-75"
      )}
      onClick={onSelect}
    >
      {/* Video Feed Area */}
      <div className="aspect-video bg-gray-900 relative overflow-hidden">
        {camera.status === "offline" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <WifiOff className="h-12 w-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Camera Offline</p>
            </div>
          </div>
        ) : (
          <>
            {/* Simulated Video Feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 0L0 20L20 40L40 20L20 0Z"/%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
              </div>
              
              {/* Simulated movement indicator */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              
              {/* Timestamp overlay */}
              <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded text-xs font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </>
        )}

        {/* Status indicator */}
        <div className={cn(
          "absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium",
          camera.status === "online" && "bg-green-900/80 text-green-300",
          camera.status === "recording" && "bg-red-900/80 text-red-300",
          camera.status === "offline" && "bg-gray-900/80 text-gray-400"
        )}>
          {getStatusIcon(camera.status)}
          <span className="capitalize">{camera.status}</span>
        </div>

        {/* Controls overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all">
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Info */}
      <div className="p-3 bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">{camera.name}</h3>
            <p className="text-xs text-gray-400">{camera.location}</p>
          </div>
          <div className={cn("text-xs", getStatusColor(camera.status))}>
            {camera.id}
          </div>
        </div>
      </div>
    </div>
  );
};
