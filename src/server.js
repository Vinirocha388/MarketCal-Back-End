import express from "express";
import cors from "cors";

import router from "./routes/index.routes.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 4001;

// Configuração do parser JSON com tratamento de erros
app.use(express.json());

// Middleware para tratamento de erros de parsing JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('❌ Erro de parsing JSON:', err.message);
    console.error('📦 Body recebido:', req.body);
    return res.status(400).json({ 
      error: 'JSON inválido',
      message: 'Verifique se o JSON está formatado corretamente',
      details: err.message 
    });
  }
  next();
});

app.use("/", router);
app.listen(port, () => {
  console.log(`Postagens publicadas na porta: ${port}`);
});