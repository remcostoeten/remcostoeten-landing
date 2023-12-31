import React from 'react';
import { TasksTableShell } from "./components/tasks-table-shell";
import { Shell } from "./components/shell";

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ searchParams }) => {
  const labels = [
    "bug",
    "feature",
    "documentation",
  ];

  const allTasks = Array.from({ length: 20 }, (_, i) => ({
    id: `255449078432480${24 + i}`,
    code: `TASK-${5018 + i}`,
    title: `Task title ${i + 1}`,
    status: 'todo',
    label: labels[Math.floor(Math.random() * labels.length)],
  }));

  const totalTasks = allTasks.length;
  const limit = 10; // Set your limit here
  const pageCount = Math.ceil(totalTasks / limit);

  return (
    <Shell>
      <TasksTableShell data={allTasks} pageCount={pageCount} />
    </Shell>
  );
};

export default IndexPage;