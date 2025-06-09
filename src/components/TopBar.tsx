
import { useState } from "react";
import { 
  Search, 
  Bell, 
  User, 
  Maximize, 
  Grid3X3, 
  Grid2X2,
  Square,
  Calendar,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  selectedCamera: string | null;
}

export const TopBar = ({ selectedCamera }: TopBarProps) => {
  const [viewMode, setViewMode] = useState("grid");
  const currentTime = new Date().toLocaleString();

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cameras, recordings..."
              className="pl-10 w-80 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="flex items-center space-x-2 border-l border-gray-600 pl-4">
            <span className="text-sm text-gray-400">View:</span>
            <Button
              variant={viewMode === "single" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("single")}
              className="h-8 w-8 p-0"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "quad" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("quad")}
              className="h-8 w-8 p-0"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>{currentTime}</span>
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Maximize className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {selectedCamera && (
        <div className="mt-3 p-2 bg-blue-900/30 border border-blue-700 rounded-lg">
          <p className="text-sm text-blue-300">
            Selected Camera: <span className="font-medium">{selectedCamera}</span>
          </p>
        </div>
      )}
    </div>
  );
};
