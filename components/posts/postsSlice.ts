import { createSlice, createAsyncThunk, AsyncThunk, nanoid } from "@reduxjs/toolkit"
import { fetchData } from "~/api/client"
import type { RootState } from "~/store"

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>

export interface PostState {
  id?: string,
  date: string,
  editedDate: string | null,
  image: string,
  title: string,
  content: string,
}

export interface PostsState {
  list: PostState[],
  status: "init" | "fetch" | "update" | "fulfilled"
}

const initialState: PostsState = {
  list: [],
  status: "init",
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchData("/fakeApi/posts", "GET")
  const posts = response.posts

  return posts
})

export const addPost = createAsyncThunk("posts/addPost", async (payload: {
  content: string,
  title: string
}) => {
  const updatedPayload: PostState = Object.assign(payload)
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  updatedPayload.id = nanoid()
  updatedPayload.date = dateFormatter.format(new Date())
  updatedPayload.image = "/images/cover-7.jpg"

  await fetchData("/fakeApi/posts/", "POST", updatedPayload)

  return updatedPayload
})

export const editPost = createAsyncThunk("posts/editPost", async (payload: {
  id: string,
  content: string,
  title: string
}) => {
  const id = payload.id
  const updatedPayload: PostState = Object.assign(payload)
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  })

  updatedPayload.editedDate = dateFormatter.format(new Date())

  await fetchData(`/fakeApi/posts/${id}`, "PUT", updatedPayload)

  return updatedPayload
})

export const deletePost = createAsyncThunk("posts/deletePost", async (id: string) => {
  await fetchData(`/fakeApi/posts/${id}`, "DELETE")

  return id
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "fetch"
      })
      
      // Add posts
      .addCase(addPost.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
      .addCase(addPost.pending, (state) => {
        state.status = "update"
      })

      // Edit posts
      .addCase(editPost.fulfilled, (state, action) => {
        const { id, title, content, editedDate } = action.payload
        const post = state.list.find(post => post.id === id)

        if (post) {
          post.title = title
          post.content = content
          post.editedDate = editedDate
        }
      })
      .addCase(editPost.pending, (state) => {
        state.status = "update"
      })

      // Delete posts
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload
        const updatedList = state.list.filter(post => post.id !== postId)
        state.list = updatedList
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "update"
      })
      // .addMatcher<PendingAction>(
      //   (action) => action.type.endsWith("/pending"),
      //   (state) => {
      //     state.status = ""
      //   }
      // )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "fulfilled"
        }
      )
  },
})

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.list.find((post) => post.id === postId)

export default postsSlice.reducer
