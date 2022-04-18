let mensagens = [];    
let usuarios = []; 

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
    console.log(erro.response.status); 
    if(erro.response.status === 400) { 
        alert("Usuário online já existente"); 
        window.location.reload();
    }
} 

buscarMensagens();
setInterval(manterConexao,3000);

function manterConexao() { 
    const nome = document.querySelector(".telaEntrada > input").value; 
    const online = { 
        name: nome
    };  

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',online); 

    if(online.name === "") { 
        promise.catch(desconectado); 
    } else { 
        promise.then(conectado);
    }
} 

function conectado() { 
    console.log("usuario conectado"); 
    buscarMensagens();
} 

function desconectado(erro) { 
    console.log("usuario desconectado"); 
} 

function buscarMensagens() {  
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages'); 

    promise.then(carregaDados);  
} 

function carregaDados(response) {  
    mensagens = response.data; 
    criaMensagem();
}


function criaMensagem () {    
    const nome = document.querySelector(".telaEntrada > input").value;
    const lista = document.querySelector("ul"); 
    lista.innerHTML = "";  
    
    for(let i=0; i<mensagens.length; i++) { 
    
        if(mensagens[i].type === "status") {
            lista.innerHTML += 
                `<li class="mensagemEntrada"><a>(${mensagens[i].time})</a><span>${mensagens[i].from}</span> para <span>${mensagens[i].to}</span>${mensagens[i].text}</li> 
                `;   
        } else if(mensagens[i].type === "message") {
        lista.innerHTML += 
            `<li class="mensagemTodos"><a>(${mensagens[i].time})</a><span>${mensagens[i].from}</span> para <span>${mensagens[i].to}</span>${mensagens[i].text}</li> 
            `;  
        } else if(mensagens[i].type === "private_message" && mensagens[i].to === nome) { 
            lista.innerHTML += 
            `<li class="mensagemPrivada"><a>(${mensagens[i].time})</a><span>${mensagens[i].from}</span> para <span>${mensagens[i].to}</span>${mensagens[i].text}</li> 
            `;  
        }
    }
}   

function adicionarMensagens() {  
    console.log("enviouu");
    const nome = document.querySelector(".telaEntrada > input").value;
    const novaMensagem = {  
        from:  nome,
        to: "Todos",
        text: document.querySelector(".enviarMensagem > input").value, 
        type: "message"
    }; 

    mensagens.push(novaMensagem);  

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMensagem); 
    
    promise.then(criaMensagem());
    promise.catch(erroEnvio);
} 

function erroEnvio() { 
    window.location.reload();
}

function participantesAtivos() { 
    console.log("Clicouuuuuuu");
    document.querySelector(".escolhaParticipantes").classList.remove("escondido"); 
    document.querySelector(".telaDeEscolha").classList.remove("escondido"); 

    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");  

    promise.then(listaParticipantes); 
}  

function listaParticipantes(response) { 
    usuarios = response.data;  
    console.log(usuarios);
    const lista = document.querySelector(".usuariosAtivos"); 
    lista.innerHTML = ` 
            <img src="imagens/Vector.png">
            <div class="atividade" onclick="selecaoParticipantes(this)">
            <h3>Todos</h3> 
            <img src="imagens/ok.png" class="ok escondido">` 
    
    for(let i=0; i<usuarios.length; i++) { 
        lista.innerHTML += `
            <img src="imagens/icone.png">
            <div class="atividade" onclick="selecaoParticipantes(this)">
            <h3>${usuarios[i].name}</h3> 
            <img src="imagens/ok.png" class="ok escondido">`
    }

}

function selecaoParticipantes() {  
    console.log("UHULLLLL"); 
    document.querySelector(".atividade .ok").classList.toggle("escondido");
} 

function saida() { 
    document.querySelector(".telaDeEscolha").classList.add("escondido"); 
    document.querySelector(".escolhaParticipantes").classList.add("escondido");
}