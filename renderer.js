var loki = require('lokijs');

let clientes; // agora acessível globalmente
let produtos;
let vendas;


// Cria o banco de dados
const db = new loki('db.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
  persistenceMethod: 'fs'
});

// Torna o banco acessível globalmente (Vue acessa via window.db)
window.db = db;

// Função chamada após o banco ser carregado
function databaseInitialize() {
    // Garantir que as coleções existam
    let clientes = db.getCollection('clientes');
    let produtos = db.getCollection('produtos');
    let vendas = db.getCollection('vendas')
  
    if (!clientes) {
      clientes = db.addCollection('clientes');
    }
    
    if (!produtos) {
      produtos = db.addCollection('produtos');
    }

    if (!vendas) {
        vendas = db.addCollection('vendas');
      }
    
    return db; // Retorna o banco inicializado
    
  }

// Função utilitária para executar código após DOM pronto
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Código que espera o DOM e o banco estarem prontos
ready(function () {
  document.querySelector('#cadastrar').addEventListener('click', function (e) {
    e.preventDefault();

    // Espera o banco ter sido carregado antes de usar
    if (!clientes) {
      alert("Banco de dados ainda não carregado.");
      return;
    }

    let data = {
      nome: document.querySelector('#nome').value,
      sobrenome: document.querySelector('#sobrenome').value,
      cpf: document.querySelector('#cpf').value,
      telefone: document.querySelector('#telefone').value,
      email: document.querySelector('#email').value
    };

    clientes.insert(data);
    document.querySelector("#cadastro-cliente").reset();

    db.saveDatabase(function (err) {
      if (err) {
        console.error("Erro ao salvar:", err);
        alert("Erro ao salvar os dados!");
      } else {
        alert("Dados salvos com sucesso!");
      }
    });
  });
});

ready(function () {
    // Seu código existente para clientes...
    
    // Adicione este listener para o cadastro de produtos
    document.querySelector('#cadastrar-produto').addEventListener('click', function(e) {
      e.preventDefault();
      
      if (!produtos) {
        alert("Banco de dados ainda não carregado.");
        return;
      }
      
      let produtoData = {
        nome: document.querySelector('#produto-nome').value,
        preco: parseFloat(document.querySelector('#produto-preco').value),
        quantidade: parseInt(document.querySelector('#produto-quantidade').value)
      };
      
      produtos.insert(produtoData);
      
      db.saveDatabase(function(err) {
        if (err) {
          console.error("Erro ao salvar produto:", err);
          alert("Erro ao salvar o produto!");
        } else {
          alert("Produto cadastrado com sucesso!");
          document.querySelector("#form-produto").reset();
        }
      });
    });
  });

  ready(function () {
    // Adicione este listener para o cadastro de produtos
    document.querySelector('#cadastrar-venda').addEventListener('click', function(e) {
      e.preventDefault();
      
      if (!vendas) {
        alert("Banco de dados ainda não carregado.");
        return;
      }
      
      let vendaData = {
        cliente: document.querySelector('#venda-cliente').value,
        produto: document.querySelector('#venda-produto').value,
        preco: parseFloat(document.querySelector('#venda-preco').value),
        quantidade: parseInt(document.querySelector('#venda-quantidade').value)
      };
      
      vendas.insert(vendaData);
      
      db.saveDatabase(function(err) {
        if (err) {
          console.error("Erro ao salvar produto:", err);
          alert("Erro ao salvar o produto!");
        } else {
          alert("Produto cadastrado com sucesso!");
          document.querySelector("#form-produto").reset();
        }
      });
    });
  });
