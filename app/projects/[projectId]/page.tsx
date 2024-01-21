'use client';
import { EditProjectButton } from "@/app/kanban/components/EditProjectButton";
import { ItemCollection } from "@/app/kanban/components/ItemCollection";
import { NewTaskButton } from "@/app/kanban/components/NewTaskButton";
import { TaskEditModal } from "@/app/kanban/components/TaskEditModal";
import { fetchProjects } from "@/app/kanban/redux/projectsSlice";
import { useAppDispatch } from "@/app/kanban/redux/store";
import { taskMovePhase } from "@/app/kanban/redux/tasksSlice";
import { useProjectTitle, useTasks } from "@/app/kanban/utils";
import { updateTask, delProject } from "@/app/kanban/utils/firestore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/core/hooks/useAuth";
import { Item } from "@radix-ui/react-dropdown-menu";
import { EntityId } from "@reduxjs/toolkit/dist/entities/models";
import message from "antd/es/message";
import { Layout } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { OnDragEndResponder, DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { toast } from 'sonner'

const collectionTitles = [
    "backlog",
    "approved",
    "coding",
    "testing",
    "deployed",
];

export default function Project() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const projectTitle = useProjectTitle(projectId as string);
    const dispatch = useAppDispatch();
    const { tasksIds, loading, bucketSize } = useTasks(projectId as string);
    const [selectTaskId, setSelectTaskId] = useState<EntityId | null>(null);
    const [delLoading, setDelLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    // bucket startId and endId = buckets[i], buckets[i+1]
    const buckets = useMemo(() => {
        const v = [0, ...bucketSize];
        for (let i = 1; i < v.length; ++i) {
            v[i] = v[i - 1] + v[i];
        }
        return v;
    }, [bucketSize]);

    const handleDragEnd: OnDragEndResponder = (rst) => {
        // update the tasks locally and send a request to update remotely
        if (
            rst.source &&
            rst.destination &&
            rst.source.droppableId !== rst.destination.droppableId
        ) {
            const srcPhase = parseInt(rst.source.droppableId);
            const draggedTaskId = tasksIds.slice(
                buckets[srcPhase],
                buckets[srcPhase + 1]
            )[rst.source.index];
            const toPhase = parseInt(rst.destination.droppableId);
            dispatch(taskMovePhase({ id: draggedTaskId, to: toPhase }));
            updateTask(user!.uid, projectId as string, draggedTaskId, {
                phase: toPhase,
            }).catch((e) => {
                toast("Update Failed!"); // Changed from messageApi.error
                console.error(e);
                dispatch(taskMovePhase({ id: draggedTaskId, to: srcPhase }));
            });
        }
    };

    const handleDel = () => {
        setDelLoading(true);
        delProject(user?.uid ?? "", projectId as string)
            .then(() => {
                dispatch(fetchProjects(user?.uid ?? ""));
                router.push("/projects?del=1");
            })
            .catch((e) => {
                toast("Failed!"); // Changed from messageApi.error
                console.error(e);
            })
            .finally(() => {
                setDelLoading(false);
            });
    };

    return (
        <>
            <header className="flex items-center bg-gray-800 text-white">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                        <h3 className="text-lg">{projectTitle}</h3>
                        {loading && <div className="ml-4 animate-spin" />}
                    </div>
                    <div className="space-x-4">
                        <Button>Edit</Button>
                        <Button onClick={handleDel}>
                            Delete Project
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex space-x-4 overflow-x-auto bg-gray-900 p-8 text-white">
                {contextHolder}

                <DragDropContext onDragEnd={handleDragEnd}>
                    {collectionTitles.map((title, idx) => (
                        <Droppable droppableId={idx.toString()} key={`droppable-${title}`}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    key={title}
                                    {...provided.droppableProps}
                                    className="space-y-4"
                                >
                                    {tasksIds
                                        .slice(buckets[idx], buckets[idx + 1])
                                        .map((id, idx) => (
                                            <Draggable
                                                key={id}
                                                draggableId={id.toString()}
                                                index={idx}
                                            >
                                                {(provided) => (
                                                    <div
                                                        key={id}
                                                        onClick={() => setSelectTaskId(id)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="rounded border border-gray-200 p-4"
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </main>
            <footer className="bg-gray-800 text-white">
                <Button>New Task</Button>
                <TaskEditModal taskId={selectTaskId} setTaskId={setSelectTaskId} />
            </footer>
        </>
    );
}
