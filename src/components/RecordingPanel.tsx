
import { useState } from "react";
import { 
  Play, 
  Download, 
  Trash2, 
  Calendar, 
  Clock,
  Video,
  Search,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const RecordingPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const recordings = [
    { 
      id: "REC-001", 
      camera: "CAM-001", 
      name: "Main Entrance", 
      startTime: "09:15:30", 
      duration: "02:45:12", 
      size: "1.2 GB",
      type: "Motion",
      date: "2024-01-15"
    },
    { 
      id: "REC-002", 
      camera: "CAM-003", 
      name: "Reception Area", 
      startTime: "10:22:15", 
      duration: "01:15:45", 
      size: "0.8 GB",
      type: "Scheduled",
      date: "2024-01-15"
    },
    { 
      id: "REC-003", 
      camera: "CAM-005", 
      name: "Emergency Exit", 
      startTime: "14:30:00", 
      duration: "00:05:30", 
      size: "0.1 GB",
      type: "Alert",
      date: "2024-01-15"
    },
    { 
      id: "REC-004", 
      camera: "CAM-007", 
      name: "Office Floor", 
      startTime: "16:45:22", 
      duration: "03:22:18", 
      size: "2.1 GB",
      type: "Continuous",
      date: "2024-01-15"
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Motion": return "bg-blue-900 text-blue-300";
      case "Alert": return "bg-red-900 text-red-300";
      case "Scheduled": return "bg-green-900 text-green-300";
      case "Continuous": return "bg-purple-900 text-purple-300";
      default: return "bg-gray-900 text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Recording Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Camera</label>
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="All Cameras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cameras</SelectItem>
                  <SelectItem value="cam-001">Main Entrance</SelectItem>
                  <SelectItem value="cam-002">Parking Lot</SelectItem>
                  <SelectItem value="cam-003">Reception Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Type</label>
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="motion">Motion</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="continuous">Continuous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search recordings..."
                  className="pl-10 bg-gray-700 border-gray-600"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recordings List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Recordings</span>
            </div>
            <span className="text-sm text-gray-400">{recordings.length} recordings found</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gray-800 rounded flex items-center justify-center">
                    <Video className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{recording.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(recording.type)}`}>
                        {recording.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{recording.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{recording.startTime}</span>
                      </span>
                      <span>Duration: {recording.duration}</span>
                      <span>Size: {recording.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
