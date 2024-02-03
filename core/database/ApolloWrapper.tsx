'use client';
import { ApolloProvider } from '@apollo/client';

import { ReactNode } from 'react';
import client from "@/core/database/ApolloClient"

export default function ApolloWrapper({ children }: ReactNode) {
    return (
        <ApolloProvider client={client}>{children}</ApolloProvider>
    )
}
