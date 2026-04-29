import { getItem } from "../../../shared/services/clothes_api";

export const useClothing = () => {
  const query = useQuery({
    queryKey : ['clothing', id],
    queryFn: () => {
      getItem(id)
    } 
  })
  
  return {
    query
  }
}