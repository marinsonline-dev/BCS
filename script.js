let perguntas = [
  "Você controla o estoque da sua empresa?",
  "Você sabe exatamente seus custos mensais?",
  "Existe muito retrabalho na sua operação?",
  "Você possui controle financeiro organizado?",
  "Seus processos são bem definidos?"
];

let perguntaAtual = 0;
let pontuacao = 0;
let grafico;

// INICIAR
function iniciar() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("questionario").style.display = "block";

  perguntaAtual = 0;
  pontuacao = 0;

  mostrarPergunta();
}

// MOSTRAR PERGUNTA
function mostrarPergunta() {
  document.getElementById("pergunta").innerText = perguntas[perguntaAtual];
  atualizarProgresso();
}

// RESPONDER
function responder(valor) {
  pontuacao += valor;
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

// RESULTADO
function mostrarResultado() {
  document.getElementById("questionario").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  let titulo = "";
  let descricao = "";

  if (pontuacao <= 4) {
    titulo = "🔴 Alto risco operacional";
    descricao = "Sua empresa apresenta falhas críticas.";
  } 
  else if (pontuacao <= 7) {
    titulo = "🟡 Atenção necessária";
    descricao = "Existem pontos de melhoria.";
  } 
  else {
    titulo = "🟢 Empresa saudável";
    descricao = "Sua empresa está bem estruturada.";
  }

  document.getElementById("tituloResultado").innerText = titulo;
  document.getElementById("descricaoResultado").innerText = descricao;

  criarGrafico();
}

// GRÁFICO
function criarGrafico() {
  let ctx = document.getElementById("grafico").getContext("2d");

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pontuação", "Restante"],
      datasets: [{
        data: [pontuacao, (perguntas.length * 2) - pontuacao],
        backgroundColor: ["#4dabf7", "#444"]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      }
    }
  });
}

// REINICIAR
function reiniciar() {
  pontuacao = 0;
  perguntaAtual = 0;

  document.getElementById("resultado").style.display = "none";
  document.getElementById("inicio").style.display = "none";
  document.getElementById("questionario").style.display = "block";

  mostrarPergunta();
}

// PROGRESSO
function atualizarProgresso() {
  let barra = document.getElementById("barra");

  if (barra) {
    let progresso = (perguntaAtual / perguntas.length) * 100;
    barra.style.width = progresso + "%";
  }
}