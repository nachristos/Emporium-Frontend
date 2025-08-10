import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "./use-auth-context"
import { get } from "../utils/fetch-client"

export const useListings = () => {
  const { token } = useAuthContext()
  
  return useQuery({
    
    queryKey: ['listings'],
    
    queryFn: async () => {
      const resp = await get(`/listing`, token)
      if (!resp) {
        throw new Error("Error retrieving listings")
      }
      return resp
    },
  })
}