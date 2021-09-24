import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface PostState {
  id?: string,
  date: string,
  updatedDate: string | null,
  image: string,
  title: string,
  content: string,
}

type PostResponse = {
  post?: PostState,
  posts?: PostState[]
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi/" }),
  tagTypes: ["PostState"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostResponse, void>({
      query: () => "posts/",
      providesTags: ["PostState"],
    }),
    getPost: builder.query<PostResponse, string>({
      query: (id) => `posts/${id}`,
      providesTags: ["PostState"],
    }),
    addPost: builder.mutation<PostResponse, Partial<PostState>>({
      query: (body) => ({
        url: "posts/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PostState"],
    }),
    updatePost: builder.mutation<PostResponse, Partial<PostState>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        }
      },
      invalidatesTags: ["PostState"],
    }),
    deletePost: builder.mutation<PostResponse, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["PostState"],
    }),
  }),
})

export const { 
  useGetAllPostsQuery, 
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
