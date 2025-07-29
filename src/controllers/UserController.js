import { UserService } from "../services/UserService"

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (req, res) => {
        try {
            const response = await this.userService.getUsers();
            res.status(200).json({ message: "Users fetched successfully", status: "ok", data: response });
        } catch (error) {
            res.status(404).json({ message: "No users found", status: "error" });
        }
    }

    getUser = async (req, res) => {
        try {
            const response = await this.userService.getUser(req.params.id);
            return res.status(200).josn({ status: "ok", response });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    createUser = async (req, res) => {
        try {
            const response = await this.userService.createUser(req.body);
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    loginUser = async (req, res) => {
        try {
            const token = await this.userService.loginUser(req.body);

            return res
                .cookie("token", token, { httpOnly: true, sameSite: "strict" })
                .status(200)
                .json({ status: "ok", message: "Login successful", token });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message });
        }
    }

    updateUser = async (req, res) => {
        const userId = req.user._id
        const id = req.params.id;

        if (userId === id) {
            try {
                const response = await this.userService.updateUser(req.params.id, req.body);
                res.status(200).json({ message: "User updated successfully", status: "ok", data: response });
            } catch (error) {
                console.error("Error updating User:", error);
                res.status(500).json({ message: "Internal Server Error", status: "error" });
            }
        }
        return res.status(401).json({ message: "You are not authorized to edit this user" })
    }

    deleteUser = async (req, res) => {
        const id = req.params.id;
        const userId = req.user._id;

        if (userId == id) {
            try {
                await this.userService.deleteUser(req.params.id);
                res.status(200).json({ message: "User deleted successfully", status: "ok" });
            } catch (error) {
                console.error("Error deleting User:", error);
                res.status(500).json({ message: "Internal Server Error", status: "error" });
            }
        }
        return res.status(401).json({ message: "You are not authorized to delete this user" })
    }
}

export { UserController }