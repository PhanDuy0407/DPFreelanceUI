import rootApi from "./rootAPi"

export const get = async (url) => {
    const response = await rootApi.get(url);
    return response
}