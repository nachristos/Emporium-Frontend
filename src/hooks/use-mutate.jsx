import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./use-auth-context";
import { post, put } from "../utils/fetch-client";

export const useMutate = (url, onSuccess = () => []) => {
  const { token } = useAuthContext();

  const create = useMutation({
    mutationFn: async (data) => {
      return await post(url, data, token)
    },
    onSuccess: (resp) => {
      onSuccess(resp);
    }
  }).mutate
  
  const update = useMutation({
    mutationFn: async (data) => {
      return await put(url, data, token)
    },
    onSuccess: (resp) => {
      onSuccess(resp);
    }
  }).mutate

  return { create, update };
}