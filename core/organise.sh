#!/bin/bash

# Define folders
folders=(
	"utils"
	"redux"
	"hooks"
	"types"
	"lib"
)

# Create subfolders
for folder in "${folders[@]}"; do
	mkdir -p "$folder"
done

# Move files to respective subfolders
mv about.ts fetchGithubIssues.ts next-link.ts tasksSlice.ts utils/
mv ApolloClient.ts fetchGitLabIssues.ts NODE_MODULES_PATCHES themeSlice.ts lib/
mv ApolloWrapper.tsx fetchGitlabIssue.ts oldfolders time-of-the-day.ts lib/
mv auth.tsx firebaseAdmin.ts prisma.ts types/
mv bezier-curves.ts firebase.ts projectsSlice.ts hooks/
mv clsx.ts firestore.ts queries hooks/
mv compress-images.sh fonts.ts redux/
mv config GET_GITHUB_CONTRIBUTIONS.ts ReduxProvider.tsx redux/
mv countryToFlag.ts google.ts signin-providers.ts hooks/
mv database hooks/
mv fetcher.ts move_to_cur_dir_recursive.py hooks/
mv fetcher.ts.txt store.ts
mv site_helpers_metrics.ts site.ts hooks/
mv utils.ts utils/
mv use-debounce.ts useDeleteDoc.ts useMdx.ts hooks/
mv useMutationObserver.ts useTags.ts hooks/
mv vercel-speed-insight.ts site.ts

echo "Files organized into subfolders successfully."
