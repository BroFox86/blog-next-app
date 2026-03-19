// import { faker } from '@faker-js/faker'

// const { sentence, paragraphs } = faker.lorem

export type Post = {
  id: string
  date: string
  editedDate?: string
  image: string
  title: string
  content: string
}

export const posts: Post[] = [
  {
    id: 'lorem-ipsum-dolor-sit-s74hfi',
    date: '2021-09-14',
    image: '/images/cover_1.jpg',
    title: 'Lorem ipsum dolor sit',
    content: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo doloremque, explicabo itaque neque deleniti architecto ut blanditiis minima voluptate sit molestiae consequuntur minus aspernatur repellat, velit, illum soluta voluptatum voluptas?</p>
      `
  },
  {
    id: 'illum-soluta-voluptatum-voluptas-5t648f',
    date: '2021-08-24',
    image: '/images/cover_2.jpg',
    title: 'Illum soluta voluptatum voluptas',
    content: `
        <p>Nemo doloremque, explicabo itaque neque deleniti architecto ut blanditiis minima voluptate sit molestiae consequuntur minus aspernatur repellat, velit, illum soluta voluptatum voluptas</p>
      `
  },
  {
    id: 'lorem-ipsum-consectetur-sit-g34hfy',
    date: '2021-09-12',
    image: '/images/cover_1.jpg',
    title: 'Lorem ipsum dolor sit',
    content: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo doloremque, explicabo itaque neque deleniti architecto ut blanditiis minima voluptate sit molestiae consequuntur minus aspernatur repellat, velit, illum soluta voluptatum voluptas?</p>
      `
  }
]

declare global {
  var posts: Post[]
}

global.posts = posts

export const db = {
  getAllPosts: () => global.posts,

  getPost: (id: string) => {
    return global.posts.find(post => post.id === id)
  },

  addPost: (data: { id: string; date: string; image: string; title: string; content: string }) => {
    const newPost = {
      // id: data.title,
      ...data
    }

    global.posts = [newPost, ...posts]

    return newPost
  },

  updatePost: (oldId: string, data: { id: string; editedDate: string; title: string; content: string }) => {
    global.posts = global.posts.map(post => (post.id === oldId ? { ...post, ...data } : post))

    return global.posts.find(post => post.id === oldId)
  },

  deletePost: (id: string) => {
    const deletedPost = global.posts.find(post => post.id === id)

    global.posts = global.posts.filter(post => post.id !== id)

    // return { success: true }
    return deletedPost
  },

  searchPosts: (query: string) => {
    const string = query.toLowerCase()

    return global.posts.filter(post => {
      return post.title.toLowerCase().includes(string) || post.content.toLowerCase().includes(string)
    })
  }
}
