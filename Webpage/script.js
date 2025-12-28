const games = [
    {
        id: 1,
        title: "League of Legends",
        description: "A team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
        genre: "MOBA",
        tags: ["MOBA", "Strategy", "Action"],
        platform: "PC / Mac",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=League+of+Legends",
        downloadUrl: "https://signup.leagueoflegends.com/"
    },
    {
        id: 2,
        title: "Fortnite",
        description: "A massive 100-player face-off that combines looting, crafting, shooting and chaos. The result is a competitive and completely unpredictable online experience. Build your way to victory in Battle Royale or Zero Build.",
        genre: "Battle Royale",
        tags: ["Battle Royale", "Shooter", "Action"],
        platform: "PC / Console / Mobile",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Fortnite",
        downloadUrl: "https://store.epicgames.com/en-US/p/fortnite"
    },
    {
        id: 3,
        title: "Genshin Impact",
        description: "Step into Teyvat, a vast world teeming with life and flowing with elemental energy. You and your sibling arrived here from another world. Separated by an unknown god, stripped of your powers, and cast into a deep slumber, you now awake to a world very different from when you first arrived.",
        genre: "Action RPG",
        tags: ["RPG", "Action", "Adventure"],
        platform: "PC / Mobile / PS5",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Genshin+Impact",
        downloadUrl: "https://genshin.hoyoverse.com/"
    },
    {
        id: 4,
        title: "Apex Legends",
        description: "Master an ever-growing roster of legendary characters with powerful abilities and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale.",
        genre: "Battle Royale",
        tags: ["Battle Royale", "Shooter", "FPS", "Action"],
        platform: "PC / Console",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Apex+Legends",
        downloadUrl: "https://www.ea.com/games/apex-legends"
    },
    {
        id: 5,
        title: "Dota 2",
        description: "Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.",
        genre: "MOBA",
        tags: ["MOBA", "Strategy", "Action"],
        platform: "PC",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Dota+2",
        downloadUrl: "https://www.dota2.com/play/"
    },
    {
        id: 6,
        title: "Destiny 2",
        description: "Dive into the world of Destiny 2 to explore the mysteries of the solar system and experience responsive first-person shooter combat. Unlock powerful elemental abilities and collect unique gear to customize your Guardian's look and playstyle.",
        genre: "FPS MMO",
        tags: ["Shooter", "FPS", "RPG", "Action", "MMO"],
        platform: "PC / Console",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Destiny+2",
        downloadUrl: "https://www.bungie.net/7/en/Destiny/NewLight"
    },
    {
        id: 7,
        title: "Valorant",
        description: "A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities. Creativity is your greatest weapon.",
        genre: "Tactical Shooter",
        tags: ["Shooter", "FPS", "Strategy", "Action"],
        platform: "PC / Console",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Valorant",
        downloadUrl: "https://playvalorant.com/"
    },
    {
        id: 8,
        title: "Counter-Strike 2",
        description: "For over two decades, Counter-Strike has offered an elite competitive experience, one tailored by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.",
        genre: "Tactical Shooter",
        tags: ["Shooter", "FPS", "Strategy", "Action"],
        platform: "PC",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=CS2",
        downloadUrl: "https://store.steampowered.com/app/730/CounterStrike_2/"
    },
    {
        id: 9,
        title: "Overwatch 2",
        description: "Overwatch 2 is a free-to-play, always-on, and ever-evolving team-based action game set in an optimistic future, where every match is the ultimate 5v5 battlefield brawl.",
        genre: "Hero Shooter",
        tags: ["Shooter", "FPS", "Action"],
        platform: "PC / Console",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Overwatch+2",
        downloadUrl: "https://overwatch.blizzard.com/"
    },
    {
        id: 10,
        title: "Call of Duty: Warzone",
        description: "Welcome to Warzone, the massive free-to-play combat arena which now features the brand-new map, Urzikstan.",
        genre: "Battle Royale",
        tags: ["Battle Royale", "Shooter", "FPS", "Action"],
        platform: "PC / Console",
        image: "https://placehold.co/600x400/0a0a0a/39ff14?text=Warzone",
        downloadUrl: "https://www.callofduty.com/warzone"
    }
];

const gameGrid = document.querySelector('.game-grid');
const modalOverlay = document.querySelector('.modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImage = document.getElementById('modal-image');
const modalGenre = document.getElementById('modal-genre');
const modalPlatform = document.getElementById('modal-platform');
const downloadBtn = document.getElementById('download-btn');
const closeBtn = document.querySelector('.close-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

function init() {
    renderGames();
    setupEventListeners();
    setupFilters();
}

function renderGames(gamesToRender = null) {
    if (!gameGrid) return;

    // If specific games provided (filtering), use those. 
    // Otherwise check for data-limit on grid.
    let displayGames;

    if (gamesToRender) {
        displayGames = gamesToRender;
    } else {
        const limitStr = gameGrid.dataset.limit;
        const limit = limitStr ? parseInt(limitStr) : games.length;
        displayGames = games.slice(0, limit);
    }

    gameGrid.innerHTML = displayGames.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <div class="card-image" style="background-image: url('${game.image}')"></div>
            <div class="card-content">
                <div class="genre">${game.genre}</div>
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const category = btn.dataset.filter;

            if (category === 'all') {
                renderGames();
            } else {
                const filtered = games.filter(game => game.tags.includes(category));
                renderGames(filtered);
            }
        });
    });
}

function openModal(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    modalTitle.textContent = game.title;
    modalDesc.textContent = game.description;
    modalGenre.textContent = game.genre;
    modalPlatform.textContent = game.platform;
    modalImage.style.backgroundImage = `url('${game.image}')`;
    downloadBtn.href = game.downloadUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function setupEventListeners() {
    closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
