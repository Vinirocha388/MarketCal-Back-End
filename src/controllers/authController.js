import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      console.log('📋 Requisição: Listar usuários');
      const users = await userModel.findAll();
      res.json(users);
    } catch (error) {
      console.error('❌ Erro no controller getAllUsers:', error.message);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    try {
      console.log('📋 Requisição: Registrar usuário');
      const { name, email, password } = req.body;

      // Verifica se todos os campos foram preenchidos
      if (!name || !email || !password) {
        console.log('⚠ Campos obrigatórios faltando');
        return res.status(400).json({ error: "Preencha todos os campos!" });
      }

      // Verifica se o email já está em uso
      const userExists = await userModel.findByEmail(email);
      if (userExists) {
        console.log('⚠ Email já cadastrado:', email);
        return res.status(400).json({ error: "Email já cadastrado!" });
      }

      // Criptografa a senha
      console.log('🔐 Criptografando senha...');
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      console.log('✓ Usuário registrado com sucesso!');
      res.status(201).json({ 
        message: "Usuário criado com sucesso!", 
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      });
    } catch (error) {
      console.error('❌ Erro no controller register:', error.message);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  // Login do usuário
  async login(req, res) {
    try {
      console.log('📋 Requisição: Login');
      const { email, password } = req.body;

      // Verifica se email e senha foram informados
      if (!email || !password) {
        console.log('⚠ Email ou senha não informados');
        return res.status(400).json({ error: "Informe email e senha" });
      }

      // Busca o usuário pelo email
      const user = await userModel.findByEmail(email);
      if (!user) {
        console.log('⚠ Usuário não encontrado:', email);
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Verifica se a senha está correta
      console.log('🔐 Verificando senha...');
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        console.log('⚠ Senha incorreta');
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Cria o token
      console.log('🔑 Gerando token JWT...');
      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" }
      );

      console.log('✓ Login realizado com sucesso!');
      res.json({ 
        message: "Login realizado!", 
        token, 
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error('❌ Erro no controller login:', error.message);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

export default new AuthController();
