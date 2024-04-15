"use client";

import { useMemo } from "react";
import { GET_GITHUB_CONTRIBUTION_STATS } from "@/core/queries/GET_GITHUB_CONTRIBUTIONS";
import { useQuery } from "@apollo/client";

import { GithubStatisticsSkeleton } from "@/components/effects/Skeleton";

import OverviewItem from "./OverviewItem";
import { AnimatedLink } from "../../Link";
import SectionHeading from "../../layout/SectionHeading";
import SectionSubHeading from "../../layout/SectionSubHeading";
import { Icons } from "@/components/icons";

export default function GithubContributionCards() {
    const { loading, error, data } = useQuery(GET_GITHUB_CONTRIBUTION_STATS, {
        variables: { username: "remcostoeten" },
    });
    const totalCommits = useMemo(() => {
        return data?.user.repositories.nodes.reduce(
            (
                total: any,
                repo: { defaultBranchRef: { target: { history: { totalCount: any } } } }
            ) => {
                return total + (repo.defaultBranchRef?.target.history.totalCount || 0);
            },
            0
        );
    }, [data]);

    const languageCounts = useMemo(() => {
        return data?.user.repositories.nodes.reduce((counts, repo) => {
            if (repo.languages) {
                repo.languages.nodes.forEach((language) => {
                    counts[language.name] = (counts[language.name] || 0) + 1;
                });
            }
            return counts;
        }, {});
    }, [data]);

    const amountOfLanguages = useMemo(() => {
        return languageCounts ? Object.keys(languageCounts).length : 0;
    }, [languageCounts]);

    const averageCommits = useMemo(() => {
        return totalCommits !== null ? totalCommits / 365 : null;
    }, [totalCommits]);

    const highestDay = useMemo(() => {
        let highestCommitsDay = null;
        data?.user?.contributionsCollection.contributionCalendar.weeks.forEach(
            (week) => {
                week.contributionDays.forEach((day) => {
                    if (
                        !highestCommitsDay ||
                        day.contributionCount > highestCommitsDay.contributionCount
                    ) {
                        highestCommitsDay = day;
                    }
                });
            }
        );
        return highestCommitsDay?.contributionCount;
    }, [data]);

    if (error) return <p>Error: {error.message}</p>;
    if (loading)
        return (
            <>
                <SectionHeading
                    title="Github activity"
                    icon={<Icons.code className="mr-1" />}
                />
                <SectionSubHeading>
                    <p className="dark:text-neutral-400">
                        You could say I have written a line or two of code. This is solely
                        hobby, work activity is over at Gitlab.
                    </p>
                </SectionSubHeading>
                <GithubStatisticsSkeleton />
            </>
        );

    return (
        <>
            <SectionHeading
                title="Github activity"
                icon={<Icons.code className="mr-1" />}
            />
            <SectionSubHeading>
                <p className="dark:text-neutral-400">
                    You could say I have written a line or two of code. This is solely
                    hobby, code I write for work is over at{" "}
                    <AnimatedLink href="https://gitlab.com/remcostoeten" target="_blank">
                        GitLab
                    </AnimatedLink>
                </p>
            </SectionSubHeading>

            <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-4">
                <OverviewItem
                    label="Total"
                    value={totalCommits !== null ? totalCommits : "Loading..."}
                />
                <OverviewItem
                    label="Average per day"
                    value={averageCommits !== null ? averageCommits : "Loading..."}
                    unit="/ day"
                />
                <OverviewItem
                    label="Best day"
                    value={highestDay !== null ? highestDay : "Loading..."}
                />
                <OverviewItem
                    label="Languages"
                    value={highestDay !== null ? amountOfLanguages : "Loading..."}
                />
            </div>
        </>
    );
}
