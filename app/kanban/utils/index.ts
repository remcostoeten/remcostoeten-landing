'use client';
import { useEffect } from "react";

import { TaskStatus, Task } from "@/core/types/kanban";
import { useAuth } from "@/core/hooks/useAuth";
import { selectProjects, fetchProjects } from "../redux/projectsSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { tasksSelectors, selectTasksLoading, selectTasksBucketSize, fetchTasks } from "../redux/tasksSlice";

const taskStatusIdx: { [x in TaskStatus]: number } = {
    closed: 0,
    open: 1,
};
export const cmpTaskStatus = (a: Task, b: Task) => {
    return taskStatusIdx[b.status] - taskStatusIdx[a.status];
};

export const useProjectTitle = (projectId: string) => {
    const { projects } = useAppSelector(selectProjects);
    const project = projects.find((v) => v.id === projectId);
    return project?.title ?? "";
};

export const useProjects = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const { projects, loading } = useAppSelector(selectProjects);

    useEffect(() => {
        if (user?.uid) dispatch(fetchProjects(user.uid));
    }, [user]);

    return { projects, loading };
};

export const useTasks = (projectId: string) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const tasksIds = useAppSelector(tasksSelectors.selectIds);
    const loading = useAppSelector(selectTasksLoading);
    const bucketSize = useAppSelector(selectTasksBucketSize);

    useEffect(() => {
        if (user?.uid) dispatch(fetchTasks({ userId: user.uid, projectId }));
    }, [user, dispatch, projectId]);

    return { tasksIds, loading, bucketSize };
};
