import rootApi from "./rootAPi"
import { useQuery, useMutation } from 'react-query';

export const get = (key, url, params = {}, options = {}) => {
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return useQuery(key, 
        () => rootApi.get(`${url}?${queryString}`).then(res => res.data),
        {refetchOnWindowFocus: false, retry: 0, ...options}
    )
}

export const post = () => {
    return useMutation(({url, data}) => rootApi.post(url, data))
}

export const put = () => {
    return useMutation(({url, data}) => rootApi.put(url, data))
}

export const deleteMutate = () => {
    return useMutation(({url}) => rootApi.delete(url))
}