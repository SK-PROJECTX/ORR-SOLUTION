'use client'
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Calendar, Ellipsis, Filter, MenuIcon } from "lucide-react";

// Types
type Task = {
  id: string;
  title: string;
  team: string;
  days: number;
  comments: number;
  attachments: number;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type BoardData = {
  columns: Record<string, Column>;
};

// Dummy Data
const initialData: BoardData = {
  columns: {
    todo: {
      id: "todo",
      title: "To Do task",
      tasks: [
        {
          id: "1",
          title: "Webdev",
          team: "Cisco Team",
          days: 12,
          comments: 7,
          attachments: 8,
        },
        {
          id: "2",
          title: "Create a new theme",
          team: "Gento Team",
          days: 9,
          comments: 3,
          attachments: 5,
        },
        {
          id: "3",
          title: "Improve social banners",
          team: "Developing Team",
          days: 17,
          comments: 5,
          attachments: 9,
        },
      ],
    },
    progress: {
      id: "progress",
      title: "In Progress",
      tasks: [
        {
          id: "4",
          title: "Webdev",
          team: "Cisco Team",
          days: 12,
          comments: 7,
          attachments: 8,
        },
        {
          id: "5",
          title: "Create a new theme",
          team: "Gento Team",
          days: 9,
          comments: 3,
          attachments: 5,
        },
      ],
    },
    done: {
      id: "done",
      title: "Completed",
      tasks: [
        {
          id: "6",
          title: "Webdev",
          team: "Cisco Team",
          days: 12,
          comments: 7,
          attachments: 8,
        },
        {
          id: "7",
          title: "Create a new theme",
          team: "Gento Team",
          days: 9,
          comments: 3,
          attachments: 5,
        },
        {
          id: "8",
          title: "Improve social banners",
          team: "Developing Team",
          days: 17,
          comments: 5,
          attachments: 9,
        },
      ],
    },
  },
};

export default function OrganisationBoard() {
  const [data, setData] = React.useState<BoardData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setData({
        columns: {
          ...data.columns,
          [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
        },
      });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setData({
        columns: {
          ...data.columns,
          [sourceCol.id]: { ...sourceCol, tasks: sourceTasks },
          [destCol.id]: { ...destCol, tasks: destTasks },
        },
      });
    }
  };

  return (
    <>
    <div className="min-h-screen p-6 text-foreground">
      <h1 className="text-xl font-semibold text-primary my-6">Organisation-Level Views</h1>

      <div className="bg-card rounded-xl p-6 ">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-medium mb-1 text-foreground">Overview</h2>
            <p className="text-sm text-foreground opacity-70 mb-6">Edit or modify all card as you want</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User 1" className="w-10 h-10 rounded-full border border-foreground object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" alt="User 2" className="w-10 h-10 rounded-full border border-foreground object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 3" className="w-10 h-10 rounded-full border border-foreground object-cover" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User 4" className="w-10 h-10 rounded-full border border-foreground object-cover" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" alt="User 5" className="w-10 h-10 rounded-full border border-foreground object-cover" />
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-background font-bold">+</button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 lg:justify-between">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center bg-secondary border border-lemon rounded-lg px-4 py-2 w-full lg:w-auto">
              <span className="mr-2 text-foreground opacity-70">🔍</span>
              <input className="bg-transparent w-full outline-none text-foreground" placeholder="Search projects" />
            </div>

            <div className="flex items-center bg-secondary border border-primary rounded-lg px-4 py-2 w-full lg:w-auto">
              <span className="mr-2 text-primary"><Calendar/></span>
              <input className="bg-transparent w-full outline-none text-foreground" type="date" />
            </div>
          </div>

          <button className="flex items-center gap-2 text-primary justify-center lg:justify-start">
            <span className=""><Filter size={20}/></span> Apply Filter
          </button>
        </div>

        {/* Kanban */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(data.columns).map(([columnId, column]) => (
              <div key={columnId} className="bg-secondary rounded-xl">
                <div className="bg-background px-6 py-4 rounded-t-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="text-primary font-semibold">{column.title}</h3>
                    <Ellipsis className="text-primary"/> 
                  </div>
                </div>
                <div className="px-4 pt-4">
                  <button className="w-full py-2 border-2 border-dashed bg-card rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2" style={{borderColor: 'var(--color-lemon)', color: 'var(--color-lemon)', opacity: 0.7}}>
                    <span className="text-lg">+</span>
                  </button>
                </div>
                <div className="p-4">

                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4 min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-card p-4 rounded-lg "
                              >
                                <h4 className="font-semibold mb-1 text-foreground">{task.title}</h4>
                                <p className="text-xs text-foreground opacity-60 mb-2">👥 {task.team}</p>

                                <div className="flex items-center justify-between text-xs text-foreground opacity-70">
                                  <span className="flex items-center gap-1">⏱ {task.days} Days</span>
                                  <span className="flex items-center gap-2">
                                    📎 {task.attachments} 💬 {task.comments}
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
    </>
  );
}
