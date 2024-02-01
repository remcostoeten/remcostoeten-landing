'use client'
// GitlabCommits.tsx
import { useState, useEffect } from 'react';

const GitlabCommits = () => {
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      const username = 'remcostoeten';
      const accessToken = process.env.NEXT_PUBLIC_GITLAB_ACCESS_TOKEN;

      try {
        const response = await fetch(`https://gitlab.com/api/v4/users/${username}/events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        const commitEvents = data.filter((event) => event.action_name === 'pushed to');
        setCommits(commitEvents.slice(0, 50));
      } catch (error) {
        setError('Error fetching GitLab commit data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>GitLab Commit Activity</h1>
      {commits.map((commit) => (
        <CommitCard key={commit.id} commit={commit} />
      ))}
    </div>
  );
};

const CommitCard = ({ commit }) => (
  <div className="border p-4 my-4">
    <p>{commit.project ? commit.project.name : 'Unknown Project'}</p>
    <p>{commit.target ? commit.target.title : 'Unknown Title'}</p>
    {/* Add more details as needed */}
  </div>
);

export default GitlabCommits;
