import { useMemo } from "react"
import {
    Button,
    CssBaseline,
    IconButton,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
    alpha,
    Paper,
    Skeleton,
    Tooltip,
} from "@mui/material"
import { Pen, Trash, User } from "lucide-react"
import "./App.css"
import { useApp } from "./App.hook"

export const App = () => {
    const {
        users,
        buscandoUsers,
        deleteUser,
        createUser,
        updateUser,
        editingUser,
        setEditingUser,
        formData,
        setFormData,
    } = useApp()

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "dark",
                    primary: { main: "#7af7c8" },
                    secondary: { main: "#a077ff" },
                    background: {
                        default: "#0a0d12",
                        paper: alpha("#ffffff", 0.06),
                    },
                },
                shape: { borderRadius: 18 },
                typography: {
                    h4: { fontWeight: 700, letterSpacing: 0.2 },
                    h5: { fontWeight: 600 },
                },
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                                border: "1px solid rgba(255,255,255,0.25)",
                                backdropFilter: "blur(16px)",
                            },
                        },
                    },
                    MuiTextField: {
                        defaultProps: {
                            variant: "filled",
                            fullWidth: true,
                        },
                        styleOverrides: {
                            root: {
                                borderRadius: 14,
                                overflow: "hidden",
                                background: "linear-gradient(180deg, #ffffff10, #ffffff05)",
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: "none",
                                fontWeight: 700,
                                letterSpacing: 0.3,
                            },
                        },
                    },
                },
            }),
        []
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Stack
                className="container"
                direction={{ xs: "column", md: "row" }}
                gap={4}
            >
                <Paper
                    className="card glass"
                    elevation={0}
                    sx={{ flex: 1, minWidth: 340, maxHeight: 380 }}
                >
                    <Stack
                        component="form"
                        gap={2}
                        onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.currentTarget)
                            const user = {
                                id: editingUser?.id as string | undefined,
                                name: formData.get("name") as string,
                                idade: formData.get("idade") as string,
                                email: formData.get("email") as string,
                            }
                            if (editingUser) {
                                updateUser.mutate(user, {
                                    onSuccess: () => {
                                        setEditingUser(null)
                                        setFormData({ name: "", idade: "", email: "" })
                                    },
                                })
                            } else {
                                createUser.mutate(user, {
                                    onSuccess: () => setFormData({ name: "", idade: "", email: "" }),
                                })
                            }
                        }}
                    >
                        <Typography
                            variant="h5"
                            textAlign="center"
                            className="title-glow"
                        >
                            {editingUser ? "Editar Usuário" : "Cadastro de Usuários"}
                        </Typography>

                        <TextField
                            label="Nome"
                            name="name"
                            placeholder="Digite seu nome"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />

                        <TextField
                            label="Idade"
                            name="idade"
                            placeholder="Digite sua idade"
                            type="number"
                            value={formData.idade}
                            onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                            onScroll={(e) => (e.target as HTMLElement).blur()}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            placeholder="Digite seu email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />

                        <Button
                            className="btn-glass"
                            variant="contained"
                            type="submit"
                            disabled={createUser.isPending}
                            size="large"
                            sx={{
                                alignSelf: "center",
                                px: 4,
                                py: 1.25,
                                background: "linear-gradient(90deg, #7af7c8, #a3ffe4)",
                                color: "#0a0d12",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #99ffd9, #7af7c8)",
                                },
                            }}
                        >
                            {editingUser
                                ? updateUser.isPending
                                    ? "Salvando..."
                                    : "Salvar Alterações"
                                : createUser.isPending
                                ? "Cadastrando..."
                                : "Cadastrar"}
                        </Button>
                    </Stack>
                </Paper>

                <Paper
                    className="userlist glass"
                    elevation={0}
                    sx={{
                        flex: 1,
                        gap: 2,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 600,
                    }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        className="title-glow"
                    >
                        Usuários <User className="icon-glow" />
                    </Typography>

                    {buscandoUsers && (
                        <Stack
                            gap={1}
                            sx={{ p: 2 }}
                        >
                            <Skeleton
                                variant="rounded"
                                height={72}
                            />
                            <Skeleton
                                variant="rounded"
                                height={72}
                            />
                            <Skeleton
                                variant="rounded"
                                height={72}
                            />
                        </Stack>
                    )}

                    {!buscandoUsers && users?.length === 0 && (
                        <Typography className="title-glow">Nenhum usuário cadastrado ainda.</Typography>
                    )}

                    {!buscandoUsers && users!.length > 0 && (
                        <Stack
                            gap={1.5}
                            sx={{ p: 2 }}
                        >
                            {users!.map((u) => (
                                <Stack
                                    key={u.id}
                                    className="userCard"
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        background: "linear-gradient(180deg, #ffffff18, #ffffff0a)",
                                        border: "1px solid rgba(255,255,255,0.25)",
                                    }}
                                >
                                    <Stack>
                                        <Typography variant="h6">Nome: {u.name}</Typography>
                                        <Typography variant="h6">Idade: {u.idade}</Typography>
                                        <Typography variant="h6">Email: {u.email}</Typography>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        gap={1}
                                        alignItems="center"
                                    >
                                        <Tooltip
                                            title="Editar usuário"
                                            arrow
                                        >
                                            <IconButton
                                                className="btn-glass"
                                                size="large"
                                                sx={{
                                                    background:
                                                        "linear-gradient(180deg, #ffffff18, #ffffff0a)",
                                                    border: "1px solid rgba(255,255,255,0.25)",
                                                }}
                                                onClick={() => {
                                                    setEditingUser(u)
                                                    setFormData({
                                                        name: u.name,
                                                        idade: u.idade,
                                                        email: u.email,
                                                    })
                                                }}
                                            >
                                                <Pen />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip
                                            title="Deletar usuário"
                                            arrow
                                        >
                                            <IconButton
                                                className="btn-glass"
                                                size="large"
                                                sx={{
                                                    background:
                                                        "linear-gradient(180deg, #ffffff18, #ffffff0a)",
                                                    border: "1px solid rgba(255,255,255,0.25)",
                                                }}
                                                onClick={() => deleteUser.mutate(u.id!)}
                                            >
                                                <Trash />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Paper>
            </Stack>
        </ThemeProvider>
    )
}
