"use client"

import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      "Bearer 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",
  },
})

export default client
