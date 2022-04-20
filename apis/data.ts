import { create } from "apisauce";

const api = create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const getData = async(queryOptions: [string, any]) => {
    api.setBaseURL(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    const [key, {paginationNumber}] = queryOptions
    if(paginationNumber) return await api.get(`/?results=${paginationNumber}`)
}

export const getDatum = async(queryOptions: [string, any]) => {
    api.setBaseURL(`${process.env.NEXT_PUBLIC_ALTERNATE_BASE_URL}`);
    const [ key, { id } ] = queryOptions
    if(id) return await api.get(`/photos/${id}`)
}

