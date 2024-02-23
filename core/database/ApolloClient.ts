"use client"

import { useEffect } from "react"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const AUTH_API_KEY = process.env.NEXT_PUBLIC_GITHUB_TOKEN
console.log("AUTH_API_KEY:", AUTH_API_KEY) // Logs the environment variable
console.log(process.env.NEXT_PUBLIC_GITHUB_API_KEY, "github")
console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "firebase")
const AUTH_TOKEN_PREFIX = "Bearer"
const AUTH_TOKEN = `${AUTH_TOKEN_PREFIX} ${AUTH_API_KEY}`

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
  },
})

export default client
