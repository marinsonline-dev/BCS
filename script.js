let respostas = [];

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
  respostas = [];

  mostrarPergunta();
}

// PERGUNTA
function mostrarPergunta() {
  document.getElementById("pergunta").innerText = perguntas[perguntaAtual];
  atualizarProgresso();
}

// RESPONDER
function responder(valor) {
  pontuacao += valor;
  respostas.push(valor);
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

  let porcentagem = Math.round((pontuacao / (perguntas.length * 2)) * 100);
  document.getElementById("porcentagem").innerText = porcentagem + "%";

  let titulo = "";
  let descricao = "";
  let resumo = "";

  if (pontuacao <= 4) {
    titulo = "🔴 Diagnóstico crítico";
    descricao = "Falhas graves identificadas.";
    resumo = "Prioridade total: organize sua operação imediatamente.";
  } 
  else if (pontuacao <= 7) {
    titulo = "🟡 Atenção operacional";
    descricao = "Pontos importantes de melhoria.";
    resumo = "Seu negócio tem potencial, mas precisa de ajustes.";
  } 
  else {
    titulo = "🟢 Operação saudável";
    descricao = "Boa estrutura operacional.";
    resumo = "Hora de escalar e otimizar.";
  }

  document.getElementById("tituloResultado").innerText = titulo;
  document.getElementById("descricaoResultado").innerText = descricao;
  document.getElementById("resumo").innerText = resumo;

  gerarRecomendacoes();
  criarGrafico();
}

// RECOMENDAÇÕES
function gerarRecomendacoes() {
  let lista = "";
  let plano = "";

  if (respostas[0] === 0) {
    lista += "<li>🔴 Estoque desorganizado</li>";
    plano += "<li>Implementar controle de estoque</li>";
  }

  if (respostas[1] === 0) {
    lista += "<li>🔴 Falta de controle de custos</li>";
    plano += "<li>Criar planilha de custos</li>";
  }

  if (respostas[2] === 0) {
    lista += "<li>🟡 Retrabalho elevado</li>";
    plano += "<li>Melhorar processos internos</li>";
  }

  if (respostas[3] === 0) {
    lista += "<li>🔴 Financeiro desorganizado</li>";
    plano += "<li>Organizar fluxo de caixa</li>";
  }

  if (respostas[4] === 0) {
    lista += "<li>🟡 Processos indefinidos</li>";
    plano += "<li>Padronizar operações</li>";
  }

  if (lista === "") {
    lista = "<li>🟢 Operação saudável</li>";
    plano = "<li>Focar em crescimento</li>";
  }

  document.getElementById("recomendacoes").innerHTML = lista;
  document.getElementById("planoAcao").innerHTML = plano;
}

// GRÁFICO
function criarGrafico() {
  let ctx = document.getElementById("grafico").getContext("2d");

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pontuação", "Restante"],
      datasets: [{
        data: [pontuacao, (perguntas.length * 2) - pontuacao],
        backgroundColor: ["#4dabf7", "#444"]
      }]
    }
  });
}

// REINICIAR
function reiniciar() {
  document.getElementById("resultado").style.display = "none";
  document.getElementById("questionario").style.display = "block";

  pontuacao = 0;
  perguntaAtual = 0;
  respostas = [];

  mostrarPergunta();
}

// PROGRESSO
function atualizarProgresso() {
  let barra = document.getElementById("barra");
  let progresso = (perguntaAtual / perguntas.length) * 100;
  barra.style.width = progresso + "%";
}
