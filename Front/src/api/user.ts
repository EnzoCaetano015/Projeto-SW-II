import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { User } from "./user.type"
import axios from "axios"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get<User[]>("http://localhost:3000/cadastro")
            return response.data
        },
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (user: User) => {
            const response = await axios.post("http://localhost:3000/cadastro", {
                name: user.name,
                idade: user.idade,
                email: user.email,
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (user: User) => {
            const response = await axios.put(`http://localhost:3000/cadastro/${user.id}`, {
                name: user.name,
                idade: user.idade,
                email: user.email,
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`http://localhost:3000/cadastro/${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}
