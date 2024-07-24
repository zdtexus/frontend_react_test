import { api } from "./api"
import type { Like } from "../types"

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "/like",
        method: "POST",
        body,
      }),
    }),
    unLikePost: builder.mutation<void, string>({
      query: id => ({
        url: `/like/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnLikePostMutation } = likeApi
export const {
  endpoints: { likePost, unLikePost },
} = likeApi
