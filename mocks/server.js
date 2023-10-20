import { createServer, Model } from 'miragejs'

import { posts } from '~/mocks/posts'

export function createMirageServer({ environment = 'test' } = {}) {
  const TIMING = 0
  const server = createServer({
    environment,

    models: {
      post: Model,
    },

    seeds(server) {
      server.create('post', posts[0])
      server.create('post', posts[1])
      server.create('post', posts[2])
      server.create('post', posts[3])
      server.create('post', posts[4])
      server.create('post', posts[5])
      server.create('post', posts[6])
      server.create('post', posts[7])
    },

    routes() {
      this.namespace = 'fakeApi'

      this.get(
        '/posts',
        schema => {
          return schema.posts.all()
        },
        { timing: TIMING },
      )

      this.get(
        '/posts/:id',
        (schema, request) => {
          const id = request.params.id
          return schema.posts.find(id)
        },
        { timing: TIMING },
      )

      this.post(
        '/posts',
        (schema, request) => {
          const attrs = JSON.parse(request.requestBody)

          return schema.posts.create(attrs)
        },
        { timing: TIMING },
      )

      this.put(
        '/posts/:id',
        function (schema, request) {
          const id = request.params.id
          // const attrs = this.normalizedRequestAttrs()
          const attrs = JSON.parse(request.requestBody)

          return schema.posts.find(id).update(attrs)
        },
        { timing: TIMING },
      )

      this.del(
        '/posts/:id',
        (schema, request) => {
          const id = request.params.id

          return schema.posts.find(id).destroy()
        },
        { timing: TIMING },
      )

      this.namespace = ''

      this.passthrough()
    },
  })

  return server
}
