// Seleção de elementos
const btnSalvar = document.getElementById("btnSalvar");
const btnRecuperar = document.getElementById("btnRecuperar");
const btnLimpar = document.getElementById("btnLimpar");
const statusDiv = document.getElementById("status");

// Funções
function salvarLocalizacao() {
  if (!navigator.geolocation) {
    atualizarStatus("❌ GPS não suportado", "red");
    return;
  }

  atualizarStatus("🛰️ Localizando...", "orange");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const dados = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        horario: new Date().toLocaleTimeString(),
      };
      localStorage.setItem("vaga_carro", JSON.stringify(dados));
      atualizarStatus(`✅ Vaga salva às ${dados.horario}`, "green");
    },
    (error) => {
      atualizarStatus("❌ Erro ao acessar GPS", "red");
      console.error(error);
    },
    { enableHighAccuracy: true },
  );
}

function irAteOCarro() {
  const vaga = localStorage.getItem("vaga_carro");
  if (!vaga) {
    atualizarStatus("⚠️ Nenhuma vaga salva!", "orange");
    return;
  }

  const { lat, lng } = JSON.parse(vaga);
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    "_blank",
  );
}

function limparHistorico() {
  if (confirm("Deseja apagar a localização salva?")) {
    localStorage.removeItem("vaga_carro");
    atualizarStatus("🗑️ Histórico limpo", "gray");
  }
}

function atualizarStatus(texto, cor) {
  statusDiv.innerText = texto;
  statusDiv.style.color = cor;
}

// Event Listeners (Gatilhos de clique)
btnSalvar.addEventListener("click", salvarLocalizacao);
btnRecuperar.addEventListener("click", irAteOCarro);
btnLimpar.addEventListener("click", limparHistorico);
