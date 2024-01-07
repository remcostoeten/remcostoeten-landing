'use client'
import React, { useState } from 'react';
import axios from 'axios';

const IssueForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Replace with your GitHub repository information and personal access token
        const owner = 'remcostoeten';
        const repo = 'blog-remcostoetn';
        const token = 'github_pat_11ANYC3MQ0NmHoQ8HITt8t_twc3K4Alhc5XtAZSqKIMJeEaxG1';

        try {
            const response = await axios.post(
                `https://api.github.com/repos/${owner}/${repo}/issues`,
                {
                    title: title,
                    body: body,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Issue created successfully:', response.data);


        } catch (error) {
            console.error('Error creating GitHub issue:', error.message);


        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <br />
            <label>
                Body:
                <textarea value={body} onChange={handleBodyChange} />
            </label>
            <br />
            <button type="submit">Submit Issue</button>
        </form>
    );
};

export default IssueForm;
