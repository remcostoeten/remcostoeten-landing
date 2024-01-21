import { useState } from 'react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'issues' },
    { id: 2, title: 'Task 2', status: 'issues' },
    { id: 3, title: 'Task 3', status: 'in progress' },
    { id: 4, title: 'Task 4', status: 'done' },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const newTasks = [...tasks];
      const activeTask = newTasks.find((task) => task.id === active.id);
      activeTask.status = over.id;
      setTasks(newTasks);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-row space-x-4">
        <div className="w-1/3 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Issues</h2>
          <div className="h-96 overflow-y-auto">
            <SortableContext items={tasks.filter((task) => task.status === 'issues')} strategy={rectSortingStrategy}>
              {tasks
                .filter((task) => task.status === 'issues')
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </SortableContext>
          </div>
        </div>
        <div className="w-1/3 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">In Progress</h2>
          <div className="h-96 overflow-y-auto">
            <SortableContext items={tasks.filter((task) => task.status === 'in progress')} strategy={rectSortingStrategy}>
              {tasks
                .filter((task) => task.status === 'in progress')
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </SortableContext>
          </div>
        </div>
        <div className="w-1/3 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Done</h2>
          <div className="h-96 overflow-y-auto">
            <SortableContext items={tasks.filter((task) => task.status === 'done')} strategy={rectSortingStrategy}>
              {tasks
                .filter((task) => task.status === 'done')
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </SortableContext>
          </div>
        </div>
      </div>
      <DragOverlay>
        {({ id, title }) => (
          <div className="z-50 bg-white shadow-lg rounded-lg p-4">{title}</div>
        )}
      </DragOverlay>
    </div>
  );
};

const Task = ({ task }) => {
  const { id, title } = task;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg shadow-lg p-4 mb-4 cursor-move"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};
