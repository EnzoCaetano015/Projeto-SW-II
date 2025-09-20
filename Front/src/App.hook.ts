import { useState } from "react"
import { useCreateUser, useDeleteUser, useGetUsers, useUpdateUser } from "./api/user"

export const useApp = () => {
    const { data: users, isPending: buscandoUsers } = useGetUsers()
    const deleteUser = useDeleteUser()
    const createUser = useCreateUser()
    const updateUser = useUpdateUser()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingUser, setEditingUser] = useState<any | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        idade: "",
        email: "",
    })

    return {
        users,
        buscandoUsers,
        deleteUser,
        createUser,
        updateUser,
        editingUser,
        setEditingUser,
        formData,
        setFormData,
    }
}
