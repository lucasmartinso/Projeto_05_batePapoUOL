const mensagens = [];    
const usuarios = []; 

function reconheceUsuario() { 
    const nome = document.querySelector(".telaEntrada > input").value; 
    const novoUsuario = { 
        name: nome
    };  

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',novoUsuario); 

    promise.then(entrarSala); 
    promise.catch(erroUsuario);
    //usuarios.push(novoUsuario);
}

function entrarSala(response) { 
    const nome = document.querySelector(".telaEntrada > input").value;  
    console.log(response.status);
    document.querySelector(".telaEntrada").classList.add("escondido"); 
    const lista = document.querySelector("ul"); 
    lista.innerHTML += 
      `<li class="mensagemEntrada"><span>${nome}</span> entrou na sala...</li> 
      `;  
}  

function erroUsuario(erro) { 
    console.log(erro.response); 
    if(erro.response.status === 400) { 
        alert("Usuário online já existente");
    }
} 

setInterval(manterConexao,5000);

function manterConexao() { 
    const nome = document.querySelector(".telaEntrada > input").value; 
    const online = { 
        name: nome
    };  

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',online); 

    if(online.name === null) { 
        promise.catch(desconectado); 
    } else { 
        promise.then(conectado);
    }
} 

function conectado() { 
    console.log("usuario conectado");
} 

function desconectado() { 
    console.log("usuario conectado");
} 

function buscarMensagens() { 
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages"); 

    promise.then(carregaDados); 
    promise.catch(); 
} 

function carregaDados(response) { 
    mensagens = response.data; 
    criaMensagem();
}


function criaMensagem () {   
    const lista = document.querySelector("ul"); 
    lista.innerHTML = `<li class="mensagemEntrada"><span>${nome}</span> entrou na sala...</li> `;  

    for(let i=0; i<mensagens.length; i++) {
    lista.innerHTML += 
        `<li class="mensagem">${mensagens[i].time}<span>${mensagens[i].from}</span>${mensagens[i].text}</li> 
        `;   
    }
}  

function participantesAtivos() { 
    console.log("Clicouuuuuuu");
    document.querySelector(".escolhaParticipantes").classList.remove("escondido"); 
    document.querySelector(".telaDeEscolha").classList.remove("escondido");
} 

function selecaoParticipantes() {  
    console.log("UHULLLLL"); 
    document.querySelector(".atividade .ok").classList.toggle("escondido");
}