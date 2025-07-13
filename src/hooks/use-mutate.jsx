import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./use-auth-context";
import { post, put } from "../utils/fetch-client";

export const useMutate = (url) => {
  const { token } = useAuthContext();

  const create = useMutation({
    mutationFn: async (data) => {
      return await post(url, data, token)
    },
  })
  
  const update = useMutation({
    mutationFn: async (data) => {
      return await put(url, data, token)
    },
  })

  return { create, update };
}