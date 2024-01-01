'use client';

import React from 'react'
import RowUi from './RowUi';

export default function RowData() {
    return (
        <>
            <RowUi
                taskId="TASK-62"
                dates={['2021-10-02']}
                label="UI"
                title="Style blog syntax highlight."
                priority="Medium"
                status="Todo"
                onCheckboxChange={() => {
                    console.log(`Checkbox for task  changed`);
                }}
            /></>
    )
}
