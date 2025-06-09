
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { CameraGrid } from "@/components/CameraGrid";
import { TopBar } from "@/components/TopBar";
import { StatusPanel } from "@/components/StatusPanel";
import { RecordingPanel } from "@/components/RecordingPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Index = () => {
  const [activePanel, setActivePanel] = useState("live");
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const { hasPermission } = useAuth();

  const renderMainContent = () => {
    switch (activePanel) {
      case "live":
        return (
          <ProtectedRoute permission="canViewLive">
            <CameraGrid selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />
          </ProtectedRoute>
        );
      case "recordings":
        return (
          <ProtectedRoute permission="canViewRecordings">
            <RecordingPanel />
          </ProtectedRoute>
        );
      case "status":
        return <StatusPanel />;
      case "settings":
        return (
          <ProtectedRoute permission="canAccessSettings">
            <SettingsPanel />
          </ProtectedRoute>
        );
      default:
        return (
          <ProtectedRoute permission="canViewLive">
            <CameraGrid selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />
          </ProtectedRoute>
        );
    }
  };

  // Filter sidebar options based on permissions
  const getFilteredSidebarOptions = () => {
    const options = [];
    
    if (hasPermission('canViewLive')) {
      options.push('live');
    }
    
    if (hasPermission('canViewRecordings')) {
      options.push('recordings');
    }
    
    options.push('status'); // Status is available to all users
    
    if (hasPermission('canAccessSettings')) {
      options.push('settings');
    }
    
    return options;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar 
        activePanel={activePanel} 
        setActivePanel={setActivePanel}
        availableOptions={getFilteredSidebarOptions()}
      />
      <div className="flex-1 flex flex-col">
        <TopBar selectedCamera={selectedCamera} />
        <main className="flex-1 p-4">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
