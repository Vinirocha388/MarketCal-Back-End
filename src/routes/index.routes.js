import express from "express";

// Importar rotas
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import socialRouter from "./social.routes.js";
import postsRouter from "./posts.routes.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);

// Middleware de autenticação para rotas abaixo
router.use(authMiddleware);

// Rotas protegidas
router.use("/users", usersRouter);
router.use("/social-accounts", socialRouter);
router.use("/posts", postsRouter);

export default router;