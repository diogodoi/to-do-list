# To-Do List Application

Esta é uma aplicação simples para gerenciamento de tarefas construída com Node.js, Express, MongoDB e Redis. Ela permite que os usuários criem, atualizem e excluam tarefas, com armazenamento persistente e suporte a autenticação.

## Tecnologias Utilizadas

Node.js

Express.js

MongoDB (para armazenamento de dados)

Redis (para cache e sessões)

JWT (para autenticação segura)

Pré-requisitos
Node.js (versão 16 ou superior)

MongoDB (local ou em nuvem)

Redis (local ou em nuvem)

Docker (opcional para containerização)

## Como Instalar e Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/diogodoi/to-do-list.git
   cd to-do-list
   ```
2. Instale as dependências:

```bash
npm install
```
3. Configure as variaveis de ambiente no arquivo .env:
```bash 
PORT_BD=3000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=sua_chave_secreta
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

4. Execute o servidor:

````bash
npm run dev
````

5. Acesse a aplicação no navegador ou em ferramentas como Postman:

http://localhost:3000

6. Utilize a API para:
- Registrar usuário: `POST /api/users/register`
- Realizar o login: `POST /api/users/login`
- Realizar o logout: `POST /api/users/logout`
- Criar uma tarefa: `POST /tasks`
- Listar tarefas: `GET /tasks`
- Atualizar uma tarefa: `PUT /tasks/:id`
- Deletar uma tarefa: `DELETE /tasks/:id`

