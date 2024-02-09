'use client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_API_KEY;

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${GITHUB_PAT}`,
    },
});

export default client;
