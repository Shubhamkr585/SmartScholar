import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

import { API_BASE_URL } from '../api';

// Enum mapping for columns
const COLUMNS = {
  SAVED: { id: 'SAVED', title: 'Saved' },
  APPLIED: { id: 'APPLIED', title: 'Applied' },
  INTERVIEW: { id: 'INTERVIEW', title: 'Interview' },
  AWARDED: { id: 'AWARDED', title: 'Awarded' },
  REJECTED: { id: 'REJECTED', title: 'Rejected' }
};

interface Application {
  _id: string;
  scholarshipId: { title: string; provider: string };
  status: string;
  personalNotes?: string;
}

export default function KanbanBoard() {
  const { user } = useUser();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    // Demo userId logic
    try {
        const res = await axios.post(`${API_BASE_URL}/api/tracker`, { userId: "demo_user_123" }); // Replace with actual ID
        setApplications(res.data);
    } catch (err) {
        console.error("Error fetching applications", err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistic UI Update
    const newStatus = destination.droppableId;
    const updatedApps = applications.map(app => 
        app._id === draggableId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);

    // API Call
    try {
        await axios.put(`${API_BASE_URL}/api/tracker/${draggableId}`, { status: newStatus });
    } catch (err) {
        console.error("Failed to update status", err);
        fetchApplications(); // Revert on error
    }
  };

  const getAppsByStatus = (status: string) => applications.filter(app => app.status === status);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Application Tracker</h1>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Object.values(COLUMNS).map(col => (
            <div key={col.id} className="min-w-[300px] bg-gray-200 rounded-xl p-4 flex flex-col">
              <h3 className="font-bold text-gray-700 mb-4 flex justify-between">
                {col.title}
                <span className="bg-gray-300 text-xs px-2 py-1 rounded-full">{getAppsByStatus(col.id).length}</span>
              </h3>
              
              <Droppable droppableId={col.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-grow min-h-[100px]"
                  >
                    {getAppsByStatus(col.id).map((app, index) => (
                      <Draggable key={app._id} draggableId={app._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200 hover:shadow-md transition"
                          >
                            <h4 className="font-semibold">{app.scholarshipId?.title || "Unknown Scholarship"}</h4>
                            <p className="text-xs text-gray-500">{app.scholarshipId?.provider}</p>
                            {app.personalNotes && <p className="text-xs text-gray-400 mt-2 italic">"{app.personalNotes}"</p>}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
