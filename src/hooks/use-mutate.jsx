import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./use-auth-context";
import { del, post, put } from "../utils/fetch-client";

export const useMutate = (url, onSuccess = () => [], onError = () => []) => {
  const { token } = useAuthContext();

  const create = useMutation({
    mutationFn: async (data) => {
      return await post(url, data, token)
    },
    onSuccess: (resp) => {
      onSuccess(resp);
    },
    onError: (error) => {
      onError(error);
    }
  }).mutate
  
  const update = useMutation({
    mutationFn: async (data) => {
      return await put(url, data, token)
    },
    onSuccess: (resp) => {
      onSuccess(resp);
    },
    onError: (error) => {
      onError(error);
    }
  }).mutate
  
    const destroy = useMutation({
    mutationFn: async () => {
      return await del(url, token)
    },
    onSuccess: (resp) => {
      onSuccess(resp);
    },
    onError: (error) => {
      onError(error);
    }
  }).mutate

  return { create, update, destroy  };
}