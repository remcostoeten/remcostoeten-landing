"use client"

import client from "@/core/database/ApolloClient"
import { ApolloProvider } from "@apollo/client"

export default function ApolloWrapper({ children }: any) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
