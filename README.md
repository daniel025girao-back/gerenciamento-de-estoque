# gerenciamento-de-estoque
Gerenciamento de estoque com uso de JavaScript para gerenciar produtos em um estoque, utilizando a API REST do Supabase.

 Sistema de Gestão de Estoque API

Este projeto consiste em um sistema de backend desenvolvido em JavaScript para gerenciar um inventário de produtos. Ele utiliza o Supabase como plataforma para persistência de dados via API REST.

 🚀 Funcionalidades Principais

CRUD Completo: Cadastro, Leitura, Atualização e Deleção de produtos.
Validação de Dados: Proteção contra cadastro de produtos com preços inválidos (≤ 0).
Análise Financeira: Cálculo automático do valor total do patrimônio em estoque.

  Tecnologias:
 JavaScript (ES6+)
 Supabase (PostgreSQL + PostgREST)
Fetch API para comunicação assíncrona.

 Uso da API REST (Supabase)

As rotas foram configuradas utilizando os parâmetros de consulta do PostgREST para otimizar a performance:

| Método | Endpoint | Função JS | Objetivo |
| :--- | :--- | :--- | :--- |
| POST | `/produtos` | `cadastroProduto` | Insere um novo produto no banco. |
| GET| `/produtos?select=*` | `getProduto` | Busca todos os dados da tabela. |
| GET | `/produtos?quantidade=lt.5` | `estoqueBaixo` | Filtra produtos com estoque menor que 5. |
| PATCH | `/produtos?id=eq.{id}` | `updateProduto` | Atualiza a quantidade de um item específico. |
| DELETE | `/produtos?id=eq.{id}` | `deleteProduto` | Remove um item através do seu ID. |



  Como Testar (Fluxo de Venda)

Para simular o funcionamento do sistema em um cenário de venda real, siga estes passos no seu console:

Passo 1: Consultar o Produto
Busque o item desejado para verificar se ele existe e qual sua quantidade atual.
javascript:

getProduto();
