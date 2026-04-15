const SUPABASE_URL = 'SUA_SUPABASE_URL';
const SUPABASE_KEY = 'SUA_SUPABASE_KEY_AQUI';

const URL = `${SUPABASE_URL}/rest/v1/produtos?quantidade=lt.5).`;


const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation' 
};

async function postProduto(nome, categoria, quantidade, preco) {
    try {
        const res = await fetch(SUPABASE_URL, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation' 
            },
            body: JSON.stringify({
                nome: nome,
                categoria: categoria,
                quantidade: quantidade, 
                preco: preco           
            })
        });

        

if (!res.ok) {
    
    const erroDetalhado = await res.json();
    console.log("Erro detalhado do Supabase:", erroDetalhado);
    return;
}

        
        const data = await res.json();
        console.log("Produto salvo!", data);

    } catch (erro) {
        console.error("Erro de conexão:", erro);
    }
}

async function getProduto() {
    try {
        
        const res = await fetch(`${SUPABASE_URL}?select=*`, {
            method: 'GET',
            headers: HEADERS
        });

        
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.statusText}`);
        }

        const data = await res.json();
        
        console.log("Lista de Alunos: ", data);
        return data; 

    } catch (error) {
        
        console.error('Erro no get:', error);
    }
}

async function updateProduto(id, novaquantidade) {
    try {
        
        const res = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: 'PATCH', 
            headers: HEADERS, 
            body: JSON.stringify({
                quantidade: novaquantidade
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("Erro ao atualizar:", errorData);
            return;
        }

        console.log(`Produto ${id} atualizado para ${novaquantidade}!`);
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
};

async function deleteProduto(id) {
    try {
        const res = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: 'DELETE',
            headers: HEADERS
        });

        if (res.ok) {
            console.log(` ${id} deletado com sucesso!`);
        } else {
            const data = await res.json();
            console.error("Erro ao deletar:", data);
        }
    } catch (erro) {
        console.error("Erro no delete:", erro);
    }
};

async function estoqueBaixo() {
    try {
      
      const res = await fetch(`${SUPABASE_URL}?quantidade=lt.5`, {
        method: 'GET',
        headers: HEADERS
      });
  
      const produtos = await res.json();
  
      console.log("ALERTA: ESTOQUE BAIXO");
      if (produtos.length === 0) {
        console.log("Nenhum produto com estoque crítico.");
      } else {
        produtos.forEach(p => {
          console.warn(`Produto: ${nome} | Qtd Atual: ${quantidade}`);
        });
      }
    } catch (erro) {
      console.error("Erro ao buscar alerta:", erro);
    }
}; 

async function cadastroProduto(nome, preco, quantidade) {
    
    if (preco <= 0) {
      console.error("Erro: O preço deve ser maior que zero.");
      return; 
    }
  
    try {
      const res = await fetch(SUPABASE_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ nome, preco, quantidade })
      });
  
      if (res.ok) console.log("Produto cadastrado!");
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
};

async function calcularPatrimonio() {
    try {
      const res = await fetch(SUPABASE_URL, {
        method: 'GET',
        headers: HEADERS
      });
  
      const produtos = await res.json();
      let valorTotalEstoque = 0;
  
      for (let produto of produtos) {
        const valorDesteProduto = produto.preco * produto.quantidade
        valorTotalEstoque = valorTotalEstoque + valorDesteProduto;
      }
  
      console.log(`Patrimônio total: R$ ${valorTotalEstoque.toFixed(2)}`);
  
    } catch (erro) {
      console.error("Erro ao calcular patrimônio:", erro);
    }
};

calcularPatrimonio();
postProduto();
get();
deleteProduto();
cadastroProduto();
