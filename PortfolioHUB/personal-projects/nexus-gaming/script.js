// DADOS DOS JOGOS (Expandidos com detalhes para a página jogo.html)
const games = [
    { 
        title: "God of War Ragnarök", 
        platform: "ps5", 
        image: "img/godofwar.jpg", 
        offer: "20% OFF",
        detailImage: "img/godofwar_main.jpg", 
        synopsis: "Kratos e Atreus embarcam em uma jornada para encontrar respostas e aliados antes do Ragnarök, o fim dos tempos. Uma aventura épica que redefine o conceito de pai e filho no mundo dos games."
    },
    { 
        title: "Cyberpunk 2077", 
        platform: "pc", 
        image: "img/cyberpunk.jpg",
        detailImage: "img/cyberpunk_main.jpg", 
        synopsis: "Um RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais. Assuma o papel de V, um mercenário fora da lei." 
    },
    { 
        title: "Forza Horizon 5", 
        platform: "xbox", 
        image: "img/forza5.jpg", 
        offer: "NOVO PREÇO!",
        detailImage: "img/forza_main.jpg", 
        synopsis: "Sua aventura Horizon definitiva o aguarda! Explore as paisagens vibrantes e em constante evolução do México com uma ação de direção ilimitada e divertida em centenas dos melhores carros do mundo." 
    },
    { 
        title: "Starfield", 
        platform: "xbox", 
        image: "img/starfield.jpg",
        detailImage: "img/starfield_main.jpg", 
        synopsis: "O primeiro novo universo em 25 anos da Bethesda Game Studios, criadores de The Elder Scrolls V: Skyrim e Fallout 4. Crie seu personagem e explore o cosmos em uma jornada épica." 
    },
    { 
        title: "Baldur's Gate 3", 
        platform: "pc", 
        image: "img/baldursgate3.jpg",
        detailImage: "img/baldurs_gate_main.jpg",
        synopsis: "Junte seu grupo e retorne aos Reinos Esquecidos em uma história de companheirismo e traição, sacrifício e sobrevivência, e a tentação do poder absoluto. Vencedor do Jogo do Ano."
    },
    { 
        title: "Marvel's Spider-Man 2", 
        platform: "ps5", 
        image: "img/spiderman2.jpg",
        detailImage: "img/spiderman2_main.jpg", 
        synopsis: "Peter Parker e Miles Morales enfrentam a prova final de força ao lidarem com as responsabilidades, vidas e amizades em jogo, enquanto o simbionte Venom ameaça a cidade."
    },
    { 
        title: "Elden Ring", 
        platform: "pc", 
        image: "img/eldenring.jpg",
        detailImage: "img/eldenring_main.jpg", 
        synopsis: "Um vasto mundo de fantasia onde cavaleiros e criaturas míticas buscam restaurar a ordem no Entre Terras. Explore, lute e conquiste seu caminho para se tornar o Lorde Prístino." 
    },
    { 
        title: "Demon's Souls Remake", 
        platform: "ps5", 
        image: "img/demons_souls.jpg",
        detailImage: "img/demons_souls_main.jpg",
        synopsis: "O aclamado jogo que definiu o gênero soulslike renasce, reconstruído do zero com gráficos deslumbrantes e desempenho aprimorado. Prepare-se para desafios brutais e recompensadores."
    },
    { 
        title: "Halo Infinite", 
        platform: "xbox", 
        image: "img/halo_infinite.jpg", 
        offer: "PACOTE EXTRA",
        detailImage: "img/halo_main.jpg",
        synopsis: "O Master Chief retorna no jogo Halo mais expansivo até hoje. Explore o anel Halo Zeta e enfrente a ameaça mais impiedosa que a humanidade já conheceu, os Banidos." 
    }
];

const gamesContainer = document.getElementById('games-container');
const filterButtons = document.querySelectorAll('#filters button');

/**
 * Renderiza os cards de jogos no contêiner.
 */
const renderGames = (gamesToRender) => {
    if (!gamesContainer) return;
    
    gamesContainer.innerHTML = '';
    gamesToRender.forEach(game => {
        // Lógica para o selo de Oferta
        const offerBadge = game.offer 
            ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2 shadow-sm">${game.offer}</span>` 
            : '';
            
        const cardHTML = `
            <div class="col game-card ${game.platform}" data-platform="${game.platform}">
                <div class="card h-100 bg-secondary shadow-lg position-relative">
                    ${offerBadge}
                    <img src="${game.image}" class="card-img-top" alt="Capa do Jogo ${game.title}" title="Capa do Jogo ${game.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-warning">${game.title}</h5>
                        <p class="card-text">Plataforma: ${game.platform.toUpperCase()}</p>
                        <a href="jogo.html?title=${encodeURIComponent(game.title)}" class="btn btn-sm btn-warning">Ver Detalhes</a>
                    </div>
                </div>
            </div>
        `;
        gamesContainer.innerHTML += cardHTML;
    });
};

// LÓGICA DA BARRA DE PESQUISA (Redireciona para o catálogo com a query)
const searchInput = document.querySelector('header form input[type="search"]');

if (searchInput) {
    const searchForm = searchInput.closest('form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            // Redireciona para catalogo.html e passa a query via URL parameter
            window.location.href = `catalogo.html?q=${encodeURIComponent(query)}`;
        }
    });
}

// Lógica de filtragem e pesquisa (Só roda no catalogo.html)
if (gamesContainer) {
    // 1. Lógica de Filtragem (Botões)
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filteredGames = filter === 'all' ? games : games.filter(game => game.platform === filter);
            renderGames(filteredGames);
        });
    });

    // 2. Lógica de Pesquisa (URL)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    if (searchQuery) {
        // Remove 'active' class do 'Todos' ao pesquisar
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        const lowerCaseQuery = searchQuery.toLowerCase();
        const searchedGames = games.filter(game => 
            game.title.toLowerCase().includes(lowerCaseQuery) ||
            game.platform.toLowerCase().includes(lowerCaseQuery)
        );
        renderGames(searchedGames);
    } else {
        renderGames(games); // Inicializa com todos os jogos
    }
}


// LÓGICA DO JOGO.HTML (Carregar detalhes e Ação de Curtir)
const gameTitleEl = document.getElementById('game-title');

if (gameTitleEl) {
    // 1. Lógica para carregar os detalhes do jogo
    const urlParams = new URLSearchParams(window.location.search);
    const gameTitle = urlParams.get('title');

    if (gameTitle) {
        const decodedTitle = decodeURIComponent(gameTitle);
        const game = games.find(g => g.title === decodedTitle);

        if (game) {
            document.getElementById('game-title').textContent = game.title;
            document.getElementById('game-platform').textContent = `Plataformas: ${game.platform.toUpperCase()} | Status: Disponível`;
            document.getElementById('game-image').src = game.detailImage || game.image; // Usa a imagem de detalhe ou a do card
            document.getElementById('game-image').alt = `Imagem principal do jogo ${game.title}`;
            document.getElementById('game-synopsis').textContent = game.synopsis;
            document.title = `Detalhes do Jogo - ${game.title}`; // Atualiza o título da aba
        } else {
            document.getElementById('game-title').textContent = 'Jogo Não Encontrado';
            document.getElementById('game-synopsis').textContent = 'O jogo que você procura não está em nosso catálogo.';
        }
    }

    // 2. Lógica de Curtir (mantida)
    const likeButton = document.getElementById('like-button');
    if (likeButton) {
        let likes = 0;
        likeButton.addEventListener('click', () => {
            likes++;
            likeButton.textContent = `👍 Curtir (${likes})`;
        });
    }
}
// Lógica para o botão de Like: Permite apenas um clique por sessão.
document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('like-button');
    
    // Verifica se o botão existe (só está em jogo.html)
    if (likeButton) {
        let likes = 0; // Contador de likes (inicia em 0)

        likeButton.addEventListener('click', function() {
            
            // 1. Desativa o botão IMEDIATAMENTE para prevenir cliques duplos
            likeButton.disabled = true; 
            
            // 2. Incrementa o contador
            likes++;
            
            // 3. Atualiza o texto e ícone
            likeButton.innerHTML = `<i class="bi bi-heart-fill"></i> Gostar (${likes})`;
            
            // 4. Altera a cor para o estado ativo
            likeButton.classList.remove('btn-outline-danger');
            likeButton.classList.add('btn-danger');

        });
    }
});