import { createServer, Model } from "miragejs"
import { posts } from "~/components/posts/posts"

// Borrowed from: miragejs.com/quickstarts/nextjs/develop-an-app/
export function makeServer({ environment = "test" } = {}) {
  const TIMING = 2000
  const server = createServer({

    environment,

    models: {
      post: Model,
    },

    seeds(server) {
      server.create("post", posts[0])
      server.create("post", posts[1])
      server.create("post", posts[2])
      server.create("post", posts[3])
      server.create("post", posts[4])
      server.create("post", posts[5])
      server.create("post", posts[6])
      server.create("post", posts[7])
    },

    routes() {
      this.namespace = "fakeApi"
      
      // Solution: github.com/vercel/next.js/issues/16874#issuecomment-723488275
      this.passthrough((request) => {
        if (request.url === "/_next/static/development/_devPagesManifest.json") {
          return true
        }
      })

      this.get("/posts", (schema) => {
        return schema.posts.all()
      }, { timing: TIMING })
      
      this.post("/posts", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        return schema.posts.create(attrs )
      }, { timing: TIMING })
      
      this.put("/posts/:id", function(schema, request) {
        const id = request.params.id
        // const attrs = this.normalizedRequestAttrs()
        const attrs = JSON.parse(request.requestBody)

        return schema.posts.find(id).update(attrs)
      }, { timing: TIMING })

      this.del("/posts/:id", (schema, request) => {
        const id = request.params.id
      
        return schema.posts.find(id).destroy()
      }, { timing: TIMING })
    },
  })

  return server
}
