import { useMemo, useState } from "react"
import { useRouter } from "next/router"
import { fetchProjects } from "@/core/redux/projectsSlice"
import { useAppDispatch } from "@/core/redux/store"
import { taskMovePhase } from "@/core/redux/tasksSlice"
import { EntityId } from "@reduxjs/toolkit"
import {
  Button,
  Popconfirm,
  Space,
  Spin,
  Typography,
  message,
  theme,
} from "antd"
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd"

import { delProject, updateTask } from "@/core/lib/database/firestore"
import { EditProjectButton } from "@/components/kanban/EditProjectButton"
import { Item } from "@/components/kanban/Item"
import { ItemCollection } from "@/components/kanban/ItemCollection"
import { NewTaskButton } from "@/components/kanban/NewTaskButton"
import { TaskEditModal } from "@/components/kanban/TaskEditModal"

import { useProjectTitle, useTasks } from "../../utils/index"

const { Title } = Typography

const collectionTitles = [
  "backlog",
  "approved",
  "coding",
  "testing",
  "deployed",
]

export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const projectTitle = useProjectTitle(projectId as string)
  const { token } = theme.useToken()
  const dispatch = useAppDispatch()
  const { tasksIds, loading, bucketSize } = useTasks(projectId as string)
  const [messageApi, contextHolder] = message.useMessage()
  const [selectTaskId, setSelectTaskId] = useState<EntityId | null>(null)
  const [delLoading, setDelLoading] = useState<boolean>(false)

  // bucket startId and endId = buckets[i], buckets[i+1]
  const buckets = useMemo(() => {
    const v = [0, ...bucketSize]
    for (let i = 1; i < v.length; ++i) {
      v[i] = v[i - 1] + v[i]
    }
    return v
  }, [bucketSize])

  const handleDragEnd: OnDragEndResponder = (rst) => {
    // update the tasks locally and send a request to update remotely
    if (
      rst.source &&
      rst.destination &&
      rst.source.droppableId !== rst.destination.droppableId
    ) {
      const srcPhase = parseInt(rst.source.droppableId)
      const draggedTaskId = tasksIds.slice(
        buckets[srcPhase],
        buckets[srcPhase + 1]
      )[rst.source.index]
      const toPhase = parseInt(rst.destination.droppableId)
      dispatch(taskMovePhase({ id: draggedTaskId, to: toPhase }))
      updateTask(user!.uid, projectId as string, draggedTaskId, {
        phase: toPhase,
      }).catch((e) => {
        messageApi.error("Update Failed!")
        console.error(e)
        dispatch(taskMovePhase({ id: draggedTaskId, to: srcPhase }))
      })
    }
  }

  const handleDel = () => {
    setDelLoading(true)
    delProject(user?.uid ?? "", projectId as string)
      .then(() => {
        dispatch(fetchProjects(user?.uid ?? ""))
        router.push("/projects?del=1")
      })
      .catch((e) => {
        messageApi.error("Failed!")
        console.error(e)
      })
      .finally(() => {
        setDelLoading(false)
      })
  }

  return (
    <>
      <header
        className="flex items-center"
        style={{ backgroundColor: token.colorBgBase }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Title level={3}>{projectTitle}</Title>
            {loading && <Spin className="ml-4" />}
          </div>
          <Space>
            <EditProjectButton projectTitle={projectTitle} />
            <Popconfirm title="Delete the task" onConfirm={handleDel}>
              <Button danger loading={delLoading}>
                Delete Project
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </header>
      <main
        className="flex space-x-4 overflow-x-auto p-8"
        style={{ backgroundColor: token.colorBgBase }}
      >
        {contextHolder}

        <DragDropContext onDragEnd={handleDragEnd}>
          {collectionTitles.map((title, idx) => (
            <Droppable droppableId={idx.toString()} key={`droppable-${title}`}>
              {(provided) => (
                <ItemCollection
                  ref={provided.innerRef}
                  key={title}
                  title={title}
                  {...provided.droppableProps}
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
                          <Item
                            key={id}
                            id={id}
                            onClick={() => setSelectTaskId(id)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ItemCollection>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </main>
      <footer style={{ backgroundColor: token.colorBgBase }}>
        <NewTaskButton />
        <TaskEditModal taskId={selectTaskId} setTaskId={setSelectTaskId} />
      </footer>
    </>
  )
}
