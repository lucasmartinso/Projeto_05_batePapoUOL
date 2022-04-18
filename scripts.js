let mensagens = [];    
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

function desconectado() { 
    console.log("usuario desconectado");
} 

function buscarMensagens() {  
    console.log("atualizando");
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages'); 

    promise.then(carregaDados);  
} 

function carregaDados(response) {  
    mensagens = response.data; 
    console.log(mensagens);
    criaMensagem();
}


function criaMensagem () { 
    console.log(mensagens);   
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
        } else if(mensagens[i].type === "private_message") { 
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