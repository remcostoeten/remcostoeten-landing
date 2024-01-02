"use client"

import React, { Suspense } from "react"

const RowUi = React.lazy(() => import('./RowUi'));

export default function RowData() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RowUi
                taskId="TASK-62"
                dates={["2021-10-02"]}
                label="UI"
                title="Style blog syntax highlight."
                priority="Medium"
                status="Todo"
                onCheckboxChange={() => {
                    console.log(`Checkbox for task  changed`)
                }}
            />
        </Suspense>
    )
}