"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { updateProjectTitle } from "@/core/database/firestore"
import { fetchProjects } from "@/core/redux/projectsSlice"
import { useAppDispatch } from "@/core/redux/store"
import { Button, Form, Input, Modal, message } from "antd"

import { useAuth } from "../../core/database/auth"

export const EditProjectButton: React.FC<{ projectTitle: string }> = ({
  projectTitle,
}) => {
  const { user } = useAuth()
  const router = useRouter()
  const { projectId } = router.query
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [form] = Form.useForm<{ title: string }>()
  const [messageApi, contextHolder] = message.useMessage()

  const handleOk = () => {
    setConfirmLoading(true)
    form.validateFields().then((values) => {
      updateProjectTitle(user?.uid ?? "", projectId as string, values.title)
        .then(() => {
          messageApi.success("Updated!")
          dispatch(fetchProjects(user?.uid ?? ""))
          setShowModal(false)
        })
        .catch((e) => {
          messageApi.error("Failed!")
          console.error(e)
        })
        .finally(() => {
          setConfirmLoading(false)
        })
    })
  }

  useEffect(() => {
    form.resetFields()
  }, [form, projectTitle])

  return (
    <>
      {contextHolder}
      <Button onClick={() => setShowModal(true)}>Edit Title</Button>
      <Modal
        open={showModal}
        confirmLoading={confirmLoading}
        onCancel={() => setShowModal(false)}
        onOk={handleOk}
      >
        <Form
          form={form}
          name="editProjectTitle"
          autoComplete="off"
          initialValues={{
            title: projectTitle,
          }}
        >
          <Form.Item
            className="mt-8"
            name="title"
            rules={[{ required: true, min: 1, max: 100 }]}
          >
            <Input placeholder="Project Title" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
