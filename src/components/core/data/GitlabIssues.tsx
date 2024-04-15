"use client";

import fetchGitlabIssues from "@/core/queries/fetchGitLabIssues";
import { useEffect, useState } from "react";

export default function GitlabIssues() {
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const getAssignedIssues = async () => {
      const issues = await fetchGitlabIssues();
      setAssignedIssues(issues.commits);
    };

    getAssignedIssues();
  }, []);

  useEffect(() => {
    const getCommits = async () => {
      const issues = await fetchGitlabIssues();
      setCommits(issues.commits);
    };

    getCommits();
  }, []);

  return (
    <>
      <h1>GitLab Assigned Issues</h1>
      <ul>
        {assignedIssues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
      <h1>GitLab Commits</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.id}>{commit.message}</li>
        ))}
      </ul>
    </>
  );
}
