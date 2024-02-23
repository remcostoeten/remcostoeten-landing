// @ts-nocheck
import { DatePicker, Form, Select } from "antd"
import { Option } from "antd/es/mentions"
import moment from "moment"

import { Button } from "@/components/ui/button"
import InputWithLabel from "@/components/generics/InputWithELement"

import { useFirestoreForm } from "./useFirestormForm"

interface Option {
  value: string
  label: string
}

interface Field {
  type: "select" | "date" | string
  label: string
  name: string
  options?: Option[]
}

interface FirestormProps {
  initialState: any
  collectionRef: any
  formFields: Field[]
}

export default function FirestormForm({
  initialState,
  collectionRef,
  formFields,
}: FirestormProps) {
  const { state, handleChange, handleSubmit } = useFirestoreForm(
    initialState,
    collectionRef,
    formFields
  )

  return (
    <Form onFinish={handleSubmit}>
      {formFields.map((field, index) => {
        switch (field.type) {
          case "select":
            return (
              <Form.Item label={field.label}>
                <Select
                  value={state[field.name]}
                  onChange={(value: void) => handleChange(field.name, value)}
                >
                  {field.options?.map((option) => (
                    <Option value={option.value}>{option.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            )
          case "date":
            return (
              <Form.Item label={field.label}>
                <DatePicker
                  value={moment(state[field.name], "DD-MM-YYYY")}
                  onChange={(_: any, dateString: any) =>
                    handleChange(field.name, dateString)
                  }
                />
              </Form.Item>
            )
          default:
            return (
              <Form.Item label={field.label}>
                <InputWithLabel
                  label={field.label}
                  type={field.type || "text"}
                  value={state[field.name]}
                  onChange={(e) =>
                    handleChange(
                      field.name,
                      field.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                />
              </Form.Item>
            )
        }
      })}
      <Form.Item>
        <Button variant="outline">Submit</Button>
      </Form.Item>
    </Form>
  )
}
