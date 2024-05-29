import rootApi from "./rootAPi"
import { useQuery } from 'react-query';

export const get = (key, url) => {
    return useQuery(key, 
        () => rootApi.get(url).then(res => res.data),
        {refetchOnWindowFocus: false}
    )
}