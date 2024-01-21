'use client';
import React from "react";
import { Typography, theme, Rate } from "antd";
import { useAppSelector } from "@/core/redux/store";
import { tasksSelectors } from "@/core/redux/tasksSlice";
import dayjs from "dayjs";
import { TaskLabel } from "@/core/types/kanban";
import { EntityId } from "@reduxjs/toolkit/dist/entities/models";

const { Title, Text, Paragraph } = Typography;

const labelColor: { [x in TaskLabel]: { dot: string; bg: string } } = {
  bug: { dot: "bg-pink-500/70", bg: "bg-pink-100/30" },
  feature: { dot: "bg-cyan-500/70", bg: "bg-cyan-100/30" },
  enhancement: { dot: "bg-yellow-500/70", bg: "bg-yellow-100/30" },
};

// eslint-disable-next-line react/display-name
export const Item = React.forwardRef<
  HTMLDivElement,
  { id: EntityId; onClick: () => void;[x: string]: any }
>(({ id, onClick, ...props }, ref) => {
  const { token } = theme.useToken();
  const task = useAppSelector((state) => tasksSelectors.selectById(state, id));

  const dateText = (() => {
    const create = dayjs(task?.createDate).format("MMM DD");
    const due = task?.due ? dayjs(task.due).format("MMM DD") : "";
    return `${create}${due && ` - ${due}`}`;
  })();

  if (!task) return null;

  const labelBg = labelColor[task.label] ? labelColor[task.label].bg : "bg-gray-100/30";
  const labelDot = labelColor[task.label] ? labelColor[task.label].dot : "bg-gray-500/70";

  return (
    <div
      ref={ref}
      className={`w-full rounded p-4 shadow ${task.status === "closed" && "opacity-40"
        }`}
      {...props}
      style={{ backgroundColor: token.colorBgBase, ...props.style }}
      onClick={onClick}
    >
      <Title level={5}>{task.title}</Title>
      {task.description && (
        <Paragraph ellipsis={{ rows: 2 }}>{task.description}</Paragraph>
      )}
      {Boolean(task.priority && task.priority > 0) && (
        <Rate
          className="relative left-0 top-0 my-[-8px] origin-top-left scale-50"
          value={task.priority}
          disabled
        />
      )}

      <div className="flex items-center justify-between">
        <Text className="text-xs opacity-50">{dateText}</Text>
        <Text
          className={`flex items-center rounded ${labelBg} px-2 text-xs font-medium`}
        >
          <div
            className={`${labelDot} mr-1 size-1 rounded-full`}
          />
          {task.label}
        </Text>
      </div>
    </div>
  );
});