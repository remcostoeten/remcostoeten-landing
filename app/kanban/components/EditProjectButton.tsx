import React, { useEffect, useState } from "react";
import { Modal, Form, message, Input, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { updateProjectTitle } from "../utils/firestore";
import { useAuth } from "@/core/hooks/useAuth";
import { fetchProjects } from "../redux/projectsSlice";
import { useAppDispatch } from "../redux/store";


export const EditProjectButton: React.FC<{ projectTitle: string }> = ({
  projectTitle,
}) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<{ title: string }>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
      updateProjectTitle(user?.uid ?? "", projectId as string, values.title)
        .then(() => {
          messageApi.success("Updated!");
          dispatch(fetchProjects(user?.uid ?? ""));
          setShowModal(false);
        })
        .catch((e) => {
          messageApi.error("Failed!");
          console.error(e);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    });
  };

  useEffect(() => {
    form.resetFields();
  }, [projectTitle]);

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
  );
};
