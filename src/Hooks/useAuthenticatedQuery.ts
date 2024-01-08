import { AxiosRequestConfig } from "axios";
import axioInstance from "../components/config/config.instance";
import { useQuery } from "@tanstack/react-query";
 interface IUseAuthenticatedQuery {
    queryKey:string[],
    url:string,
    config?: AxiosRequestConfig,
 }

const UseAuthenticatedQuery =(   {queryKey,url,config}:IUseAuthenticatedQuery)=>{
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axioInstance.get(url,config);
      return data;
    },
  })
};

export default UseAuthenticatedQuery;