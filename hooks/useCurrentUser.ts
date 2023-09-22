import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () =>{

    //swr is going to fetch /api/current using axios method mentioned in fetcher and store it in its global store
    //Alternative to redux.
    
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;