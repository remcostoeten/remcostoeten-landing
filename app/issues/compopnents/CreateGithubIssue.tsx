import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { createGithubIssue } from '@/core/mutations/CreateGithubIssue'
import React, { useState } from 'react'

export default function CreateIssueDialog() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [assignees, setAssignees] = useState('')
    const [labels, setLabels] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const assigneesArray = assignees.split(',').map((item) => item.trim())
        const labelsArray = labels.split(',').map((item) => item.trim())

        try {
            await createGithubIssue(title, body, assigneesArray, labelsArray)
            alert('Issue created successfully.')
        } catch (error) {
            alert('Failed to create issue: ' + error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <Dialog className="rounded-lg bg-white p-4 shadow-lg">
                <DialogTrigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Open
                </DialogTrigger>
                <DialogContent className="p-4">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="text-lg font-bold">
                            <DialogTitle>Create a new issue</DialogTitle>
                        </DialogHeader>
                        <input
                            className="mt-4 block w-full rounded border p-2"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className="mt-4 block w-full rounded border p-2"
                            placeholder="Description"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <input
                            className="mt-4 block w-full rounded border p-2"
                            type="text"
                            placeholder="Assignees (comma-separated usernames)"
                            value={assignees}
                            onChange={(e) => setAssignees(e.target.value)}
                        />
                        <input
                            className="mt-4 block w-full rounded border p-2"
                            type="text"
                            placeholder="Labels (comma-separated)"
                            value={labels}
                            onChange={(e) => setLabels(e.target.value)}
                        />
                        <button className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600" type="submit">
                            Create Issue
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}