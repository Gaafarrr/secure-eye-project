
import { useState } from "react";
import { CameraFeed } from "@/components/CameraFeed";

interface CameraGridProps {
  selectedCamera: string | null;
  setSelectedCamera: (camera: string | null) => void;
}

export const CameraGrid = ({ selectedCamera, setSelectedCamera }: CameraGridProps) => {
  const cameras = [
    { id: "CAM-001", name: "Main Entrance", location: "Front Door", status: "online" as const },
    { id: "CAM-002", name: "Parking Lot", location: "Exterior", status: "online" as const },
    { id: "CAM-003", name: "Reception Area", location: "Lobby", status: "online" as const },
    { id: "CAM-004", name: "Server Room", location: "IT Floor", status: "offline" as const },
    { id: "CAM-005", name: "Emergency Exit", location: "Back Door", status: "online" as const },
    { id: "CAM-006", name: "Warehouse", location: "Storage", status: "online" as const },
    { id: "CAM-007", name: "Office Floor", location: "2nd Floor", status: "recording" as const },
    { id: "CAM-008", name: "Loading Dock", location: "Rear", status: "online" as const },
  ];

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
        {cameras.map((camera) => (
          <CameraFeed
            key={camera.id}
            camera={camera}
            isSelected={selectedCamera === camera.id}
            onSelect={() => setSelectedCamera(camera.id === selectedCamera ? null : camera.id)}
          />
        ))}
      </div>
    </div>
  );
};
