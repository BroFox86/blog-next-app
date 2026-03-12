// import { faker } from '@faker-js/faker'

// const { sentence, paragraphs } = faker.lorem

export let posts: PostState[] = [
  {
    id: '1',
    date: '2021-09-14',
    updatedDate: null,
    image: '/images/cover_1.jpg',
    title: 'Lorem ipsum dolor sit',
    content: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo doloremque, explicabo itaque neque deleniti architecto ut blanditiis minima voluptate sit molestiae consequuntur minus aspernatur repellat, velit, illum soluta voluptatum voluptas?</p>
      `,
  },
  {
    id: '2',
    date: '2021-08-24',
    updatedDate: null,
    image: '/images/cover_2.jpg',
    title: 'Illum soluta voluptatum voluptas',
    content: `
        <p>Nemo doloremque, explicabo itaque neque deleniti architecto ut blanditiis minima voluptate sit molestiae consequuntur minus aspernatur repellat, velit, illum soluta voluptatum voluptas</p>
      `,
  },
]

export const db = {
  getAllPosts: () => posts,

  getPost: (id: string) => {
    return posts.find(post => post.id === id)
  },

  addPost: (data: { date: string; image: string; title: string; content: string }) => {
    const newPost = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
    }

    posts = [newPost, ...posts]

    return newPost
  },

  updatePost: (id: string, data: { title: string; content: string }) => {
    posts = posts.map(post => (post.id === id ? { ...post, ...data } : post))

    return posts.find(post => post.id === id)
  },

  deletePost: (id: string) => {
    posts = posts.filter(post => post.id !== id)

    return { success: true }
  },

  searchPosts: (query: string) => {
    const string = query.toLowerCase()

    return posts.filter(post => {
      return post.title.toLowerCase().includes(string) || post.content.toLowerCase().includes(string)
    })
  },
}
