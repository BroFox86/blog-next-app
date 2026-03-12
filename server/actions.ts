import { db } from './db'

export function getAllPostsAction() {
  return db.getAllPosts()
}

export function getPostAction(id) {
  return db.getPost(id)
}

export function addPostAction({ date, image, title, content }) {
  db.addPost({ date, image, title, content })
}

export function updatePostAction({ id, title, content }) {
  db.updatePost(id, { title, content })
}

export function searchPostAction(query) {
  return db.searchPosts(query)
}

export function deletePostAction(id) {
  db.deletePost(id)
}
