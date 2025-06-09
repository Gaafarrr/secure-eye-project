
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { CameraGrid } from "@/components/CameraGrid";
import { TopBar } from "@/components/TopBar";
import { StatusPanel } from "@/components/StatusPanel";
import { RecordingPanel } from "@/components/RecordingPanel";
import { SettingsPanel } from "@/components/SettingsPanel";

const Index = () => {
  const [activePanel, setActivePanel] = useState("live");
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const renderMainContent = () => {
    switch (activePanel) {
      case "live":
        return <CameraGrid selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />;
      case "recordings":
        return <RecordingPanel />;
      case "status":
        return <StatusPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <CameraGrid selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
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
