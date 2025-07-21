const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {

    inputUpload.click();

})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }
        leitor.readAsDataURL(arquivo)
    })

}


const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.name;
        } catch (error) {
            console.error("Erro na leitura do arquivo")
        }
    }


})

const inputTags = document.getElementById("input-tags")
const listaTags = document.querySelector(".lista-tags")



listaTags.addEventListener('click', (evento) => {

    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }

})


const tagsDisponiveis = ['Front-End', 'programação', 'Data Science', "full stack", "html", 'css'];

async function VerificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();

        const tagTexto = inputTags.value.trim();

        if (tagTexto !== "") {
            try {
                const tagExiste = await VerificaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement('li')
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else { alert("Tag não encontrada!") }
            } catch (error) {
                console.error("Erro ao verificar existencia da tag")
                alert("Erro ao verificar existencia da tag")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar")



async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            } else {
                reject("erro ao publicar o projeto")
            }

        }, 2000);
    })

}

botaoPublicar.addEventListener('click', async (evento) => {

    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;

    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado)
        alert("deu tudo certo")
    }
    catch (error) {
        console.log("Deu errado:", error)
        alert("De tudo errado")
    }
})

const botaoDescartar = document.querySelector('.botao-descartar')

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();
    const formulario = document.querySelector('form');

    formulario.reset();

    imagemPrincipal.src = "img/imagem1.png";
    nomeDaImagem.textContent = 'imagem_projeto.png';

    listaTags.innerHTML = '';
})