var loki = require('lokijs');

let clientes; // agora acessível globalmente

// Cria o banco de dados
var db = new loki('db.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

// Função chamada após o banco ser carregado
function databaseInitialize() {
  clientes = db.getCollection('clientes');

  if (clientes === null) {
    clientes = db.addCollection('clientes');
  }
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
      cpf: document.querySelector('#cpf').value,
      telefone: document.querySelector('#telefone').value
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
