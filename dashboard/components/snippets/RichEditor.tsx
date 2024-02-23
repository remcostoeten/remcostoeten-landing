'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';

import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function RichEditor() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(errors);

    const options = {
        toolbarButtons: ['bold', 'italic', 'underline', 'alignRight', 'alignCenter', 'alignLeft', 'outdent', 'indent', 'undo', 'redo', 'clearFormatting', 'selectAll'],
        pluginsEnabled: ['align', 'charCounter'],
        charCounterMax: 140
    }

    return (
        <form
            className="w-full max-w-5xl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='mb-5'>
                <label
                    htmlFor='message'
                    className='mb-3 block text-base font-medium text-black'
                >
                    Message
                </label>
                <Controller name="message" rules={{ required: true }} control={control} defaultValue="" render={({ field }) => (
                    <FroalaEditorComponent
                        tag="textarea"
                        model={field.value}
                        onModelChange={field.onChange}
                        config={options}
                    />)}
                />
            </div>

            <div>
                <button className='hover:shadow-form rounded-md bg-white border py-3 px-8 text-base font-semibold outline-none text-gray-700'>
                    Submit
                </button>
            </div>
        </form>b
    );
}