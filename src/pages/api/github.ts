import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
})

const typeDefs = gql`
  type Query {
    viewer: User
  }

  type User {
    login: String
    avatarUrl: String
  }
`

const resolvers = {
  Query: {
    viewer: async () => {
      const { data } = await client.query({
        query: gql`
          query Viewer {
            viewer {
              login
              avatarUrl
            }
          }
        `,
      })

      return data.viewer
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

export default server.createHandler({ path: '/api/github' })
