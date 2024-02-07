'use client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Bearer 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',
    },
});

export default client;

