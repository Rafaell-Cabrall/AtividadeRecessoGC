const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Diretório onde os dados serão armazenados
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware para processar JSON
app.use(express.json());
app.use(express.static('views')); // Para servir arquivos HTML

// Rota para listar todas as tarefas
app.get('/tasks', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') return res.json([]); // Arquivo não existe
            return res.status(500).json({ error: 'Erro ao ler os dados' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const newTask = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let tasks = [];
        if (!err) tasks = JSON.parse(data || '[]');

        tasks.push(newTask);
        fs.writeFile(DATA_FILE, JSON.stringify(tasks), (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao salvar a tarefa' });
            res.status(201).json(newTask);
        });
    });
});

// Rota para excluir todas as tarefas (opcional)
app.delete('/tasks', (req, res) => {
    fs.writeFile(DATA_FILE, '[]', (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao limpar as tarefas' });
        res.status(204).end();
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
