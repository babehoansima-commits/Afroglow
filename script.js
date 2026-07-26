// ============================================================
// DONNÉES PRODUITS (AVEC PRIX BARRÉ)
// ============================================================
const produits = [
    {
        id: 1,
        nom: "huiles essentielles",
        prix: 30.00,
        prix_barre: 36.00,
        image: "produit1.jpg",
        description: "Ce soin AfroGlow résout tous vos problèmes de peau. Si votre peau est sèche ou manque de confort, il l'hydrate et la nourrit en profondeur. Si vous avez un teint terne ou irrégulier, il unifie et illumine votre visage. Si vous avez des taches, des cicatrices ou des vergetures, il les atténue. Si votre peau est relâchée ou manque de fermeté, il la raffermit et améliore son élasticité. Si elle est irritée ou sensible, il apaise les rougeurs et la protège. Résultat : une peau douce, souple, éclatante et en pleine santé, quel que soit votre type de peau.",
        categorie: "soins"
    },
    {
        id: 2,
        nom: "sérum afroGlow",
        prix: 20.00,
        prix_barre: 25.00,
        image: "produit2.jpg",
        description: "Le sérum AfroGlow résout vos problèmes de cheveux. Il stoppe la chute, lutte contre la calvitie et accélère la pousse. Il fortifie les racines, réduit la casse et épaissit vos cheveux. Il hydrate, nourrit et redonne brillance et douceur même aux cheveux secs ou abîmés. Résultat : des cheveux plus longs, plus forts et en meilleure santé, quel que soit votre type de cheveu.",
        categorie: "soins"
    },
    {
        id: 3,
        nom: "savon noir",
        prix: 20.00,
        
        image: "produit3.jpg",
        description: "Ce savon noir AfroGlow nettoie votre peau en profondeur et enlève les impuretés. Il réduit les boutons, l'acné, atténue les taches, les cicatrices et les vergetures. Il unifie et éclaire le teint, exfolie en douceur, tout en hydratant et nourrissant la peau. Il apaise aussi les irritations. Résultat : une peau douce, lumineuse et éclatante, pour le visage et le corps, quel que soit votre type de peau.",
        categorie: "soins"
    },
    {
        id: 4,
        nom: "kit antirides",
        prix: 55.00,
        prix_barre: 60.00,
        image: "produit4.jpg",
        description: "Ce kit anti-ride AfroGlow corrige tous les signes de l'âge et les imperfections. Il atténue les rides, unifie et illumine le teint, élimine les taches et les vergetures. Il raffermit la peau, améliore son élasticité, hydrate et nourrit en profondeur. Même les peaux sèches ou abîmées retrouvent douceur et éclat. Résultat : une peau lisse, éclatante et sans défauts, pour tous les types de peau.",
        categorie: "soins"
    },
    {
        id: 5,
        nom: "Beurre afroglow",
        prix: 15.00,
        
        image: "produit5.jpg",
        description: "Ce beurre capillaire AfroGlow répond à tous vos besoins. Si vos cheveux sont secs ou abîmés, il les hydrate, les répare et les protège. S'ils cassent ou ont des fourches, il réduit la casse et les renforce. Si vos racines sont faibles, il les fortifie et favorise la pousse. Si vos cheveux sont fins ou manquent de volume, il les épaissit et les densifie. Si vous avez des démangeaisons, il les apaise. Résultat : des cheveux plus longs, plus forts, brillants et en pleine santé, pour tous les types de cheveux.",
        categorie: "soins"
    },
    {
        id: 6,
        nom: "masque cheveux",
        prix: 20.00,
        prix_barre: 25.00,
        image: "produit6.jpg",
        description: "description sur commande",
        categorie: "soins"
    },
    {
        id: 7,
        nom: "huile douche",
        prix: 10.00,
        prix_barre: 15.00,
        image: "produit7.jpg",
        description: "description sur commande",
        categorie: "soins"
    },
    {
        id: 8,
        nom: "shampoing",
        prix: 20.00,
        
        image: "produit8.jpg",
        description: "Ce shampoing AfroGlow nettoie en douceur vos cheveux et votre cuir chevelu sans les agresser. Il stimule la pousse, renforce les racines et réduit la casse. Il hydrate, adoucit et redonne brillance et vitalité à vos cheveux. Il apaise et protège votre cuir chevelu. Résultat : des cheveux propres, forts et éclatants, naturellement.",
        categorie: "soins"
    },
    {
        id: 9,
        nom: "huile réparatrice",
        prix: 30.00,
        prix_barre:35.00,
        image: "produit9.jpg",
        description: "description sur commande",
        categorie: "soins"
    },
{
        id: 10,
        nom: "détartrant",
        prix: 10.00,
        
        image: "produit10.jpg",
        description: "Description sur commande",
        categorie: "soins"
    },
   {
        id: 11,
        nom: "spray afro glow",
        prix: 20.00,
        prix_barre: 25.00,
        image: "produit11.jpg",
        description: "Ce spray AfroGlow hydrate et rafraîchit vos cheveux sans les alourdir. Il stimule la pousse, renforce les racines et réduit la casse. Il redonne brillance, douceur et souplesse à vos cheveux. Il définit vos boucles, réduit les frisottis et facilite le coiffage. Il apaise les irritations et les démangeaisons du cuir chevelu. Résultat : des cheveux forts, hydratés et éclatants, naturellement.",
        categorie: "soins"
    } 
];

const NUMERO_WHATSAPP = "243903592715";

// ============================================================
// LOADER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 1500);
});

// ============================================================
// BANNIÈRE STICKY
// ============================================================
window.addEventListener('scroll', function() {
    const banner = document.getElementById('banniere');
    if (banner) {
        banner.classList.toggle('scrolled', window.scrollY > 80);
    }
});

// ============================================================
// MENU HAMBURGER
// ============================================================
const menuMobile = document.getElementById('menuMobile');
const onglets = document.getElementById('onglets');
if (menuMobile) {
    menuMobile.addEventListener('click', function() {
        this.classList.toggle('open');
        onglets.classList.toggle('open');
    });
}

// ============================================================
// HERO SLIDER
// ============================================================
const slides = document.querySelectorAll('.hero-slide');
let index = 0;
if (slides.length > 1) {
    setInterval(() => {
        slides.forEach(s => s.classList.remove('active'));
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 4000);
}

// ============================================================
// AFFICHER PRODUITS AVEC BOUTON DESCRIPTION ET PRIX BARRÉ
// ============================================================
function afficherProduits(produits, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = produits.map(p => {
        const message = `Bonjour%20je%20veux%20commander%20${encodeURIComponent(p.nom)}`;
        return `
            <div class="carte-produit" data-id="${p.id}">
                <div class="carte-image">
                    <img src="${p.image}" alt="${p.nom}" loading="lazy" />
                </div>
                <div class="carte-body">
                    <div class="nom">${p.nom}</div>
                    <div class="prix">
                        ${p.prix_barre ? `<span class="prix-barre">${p.prix_barre.toFixed(2)} $</span>` : ''}
                        <span class="prix-actuel">${p.prix.toFixed(2)} $</span>
                    </div>
                    <button class="btn-description" onclick="ouvrirOverlay(${p.id})">✦ Description</button>
                    <a href="https://wa.me/${NUMERO_WHATSAPP}?text=${message}" 
                       class="btn-commander" target="_blank">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 2a10 10 0 0 0-8.9 15.2L2 22l4.8-1.1A10 10 0 1 0 12 2zm0 18.5a8.5 8.5 0 0 1-4.5-1.3l-.3-.2-2.8.6.6-2.8-.2-.3A8.5 8.5 0 1 1 12 20.5z"/>
                            <path d="M12 6.5a5.5 5.5 0 0 0-5.5 5.5A5.5 5.5 0 0 0 12 17.5 5.5 5.5 0 0 0 17.5 12 5.5 5.5 0 0 0 12 6.5zm0 9.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                        </svg>
                        Commander
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Affichage initial
afficherProduits(produits, 'grille-produits');

// ============================================================
// FILTRES PRODUITS
// ============================================================
const filtres = document.querySelectorAll('.filtre-btn');
filtres.forEach(btn => {
    btn.addEventListener('click', function() {
        filtres.forEach(b => b.classList.remove('actif'));
        this.classList.add('actif');
        const categorie = this.dataset.categorie;
        const produitsFiltres = categorie === 'tous' ? produits : produits.filter(p => p.categorie === categorie);
        afficherProduits(produitsFiltres, 'grille-produits');
    });
});

// ============================================================
// RECHERCHE AVEC SCROLL DOUX
// ============================================================
const searchInput = document.getElementById('search-produit');
const suggestions = document.getElementById('search-suggestions');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    suggestions.innerHTML = '';
    suggestions.classList.remove('active');

    if (query.length === 0) {
        afficherProduits(produits, 'grille-produits');
        return;
    }

    const resultats = produits.filter(p => p.nom.toLowerCase().includes(query));
    afficherProduits(resultats, 'grille-produits');

    if (resultats.length > 0 && query.length > 0) {
        resultats.forEach(p => {
            const div = document.createElement('div');
            div.className = 'search-suggestion-item';
            const regex = new RegExp(query, 'gi');
            div.innerHTML = p.nom.replace(regex, match => `<strong>${match}</strong>`);
            div.addEventListener('click', () => {
                searchInput.value = p.nom;
                suggestions.classList.remove('active');
                const target = document.querySelector(`.carte-produit[data-id="${p.id}"]`);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    target.style.borderColor = '#D4AF88';
                    target.style.boxShadow = '0 20px 50px rgba(212,175,136,0.3)';
                    setTimeout(() => {
                        target.style.borderColor = 'rgba(212,175,136,0.08)';
                        target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                    }, 3000);
                }
            });
            suggestions.appendChild(div);
        });
        suggestions.classList.add('active');
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-luxe')) {
        suggestions.classList.remove('active');
    }
});

// ============================================================
// CARROUSEL 3D TÉMOIGNAGES (optimisé)
// ============================================================
const temoignages = [
    {
        image: 'tem1.jpg',
        texte: 'Je recommande afroglow à toutes mes amies'
        
    },
    {
        image: 'tem2.jpg',
        texte: 'Mes cheveux sont plus forts, plus doux.'
        
    },
    {
        image: 'tem3.jpg',
        texte: 'Enfin des produits qui respectent mes cheveux.'
        
    },
    {
        image: 'tem4.jpg',
        texte: 'Mes cheveux n’ont jamais été aussi longs.'
        
    },
    
];

const track = document.getElementById('carrousel3dTrack');
const pointsContainer = document.getElementById('carrousel3dPoints');
const prevBtn = document.getElementById('carrouselPrev');
const nextBtn = document.getElementById('carrouselNext');

let currentIndexTemoignage = 0;
const totalTemoignages = temoignages.length;
let cardWidth = 280 + 20;
let autoPlayTimer = null;
let isAutoPlayPaused = false;
let scrollTimeout = null;

// Générer les cartes
temoignages.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = `carrousel-3d-card ${i === 0 ? 'active' : ''}`;
    card.style.willChange = i === 0 ? 'transform' : 'auto';
    card.innerHTML = `
        <div class="carrousel-3d-image" style="background-image: url('${t.image}');"></div>
        <div class="carrousel-3d-texte">
            <p class="temoignage-3d">${t.texte}</p>
            <p class="temoignage-3d-auteur">${t.auteur}</p>
        </div>
    `;
    track.appendChild(card);

    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlideTemoignage(i));
    pointsContainer.appendChild(dot);
});

const cards = document.querySelectorAll('.carrousel-3d-card');
const dots = pointsContainer.querySelectorAll('span');

function goToSlideTemoignage(index) {
    currentIndexTemoignage = (index + totalTemoignages) % totalTemoignages;
    const offset = -currentIndexTemoignage * cardWidth;
    track.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, i) => {
        const dist = Math.abs(i - currentIndexTemoignage);
        const isActive = i === currentIndexTemoignage;

        card.classList.toggle('active', isActive);
        card.style.willChange = isActive ? 'transform' : 'auto';

        if (dist > 1) {
            card.style.transform = 'scale(0.85) translateZ(0px)';
            card.style.opacity = '0.4';
        } else if (dist === 1) {
            card.style.transform = 'scale(0.95) translateZ(0px)';
            card.style.opacity = '0.7';
        } else {
            card.style.transform = 'scale(1.05) translateZ(40px)';
            card.style.opacity = '1';
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndexTemoignage);
    });
}

function nextSlideTemoignage() {
    goToSlideTemoignage(currentIndexTemoignage + 1);
}

function prevSlideTemoignage() {
    goToSlideTemoignage(currentIndexTemoignage - 1);
}

prevBtn.addEventListener('click', () => {
    prevSlideTemoignage();
    resetAutoPlayTemoignage();
});

nextBtn.addEventListener('click', () => {
    nextSlideTemoignage();
    resetAutoPlayTemoignage();
});

function startAutoPlayTemoignage() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    if (isAutoPlayPaused) return;
    autoPlayTimer = setInterval(() => {
        if (!isAutoPlayPaused) {
            nextSlideTemoignage();
        }
    }, 4000);
}

function stopAutoPlayTemoignage() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

function resetAutoPlayTemoignage() {
    stopAutoPlayTemoignage();
    startAutoPlayTemoignage();
}

window.addEventListener('scroll', function() {
    if (!isAutoPlayPaused) {
        isAutoPlayPaused = true;
        stopAutoPlayTemoignage();
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isAutoPlayPaused = false;
        startAutoPlayTemoignage();
    }, 1500);
});

let startX = 0;
const wrapper = document.querySelector('.carrousel-3d-wrapper');
wrapper.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
});
wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
        if (diff > 0) {
            nextSlideTemoignage();
        } else {
            prevSlideTemoignage();
        }
        resetAutoPlayTemoignage();
    }
});

window.addEventListener('resize', () => {
    const firstCard = cards[0];
    if (firstCard) {
        cardWidth = firstCard.offsetWidth + 20;
    }
    goToSlideTemoignage(currentIndexTemoignage);
});

setTimeout(() => {
    const firstCard = cards[0];
    if (firstCard) {
        cardWidth = firstCard.offsetWidth + 20;
    }
    goToSlideTemoignage(0);
    startAutoPlayTemoignage();
}, 300);

// ============================================================
// BOUTON RETOUR (page cachée)
// ============================================================
const btnRetour = document.getElementById('btnRetour');
const pageCachee = document.getElementById('boutique-cachee');
const sections = document.querySelectorAll('.hero, .section-carte-flottante, .produits-section, .carrousel-3d-section, .section-ambassadrice, .section-arlene-equipe, .footer-luxe');

document.querySelector('.nav-cta')?.addEventListener('click', function(e) {
    e.preventDefault();
    sections.forEach(s => s.style.display = 'none');
    pageCachee.style.display = 'block';
    window.scrollTo(0, 0);
});

document.querySelector('.nav-cta-footer')?.addEventListener('click', function(e) {
    e.preventDefault();
    sections.forEach(s => s.style.display = 'none');
    pageCachee.style.display = 'block';
    window.scrollTo(0, 0);
});

btnRetour?.addEventListener('click', function() {
    pageCachee.style.display = 'none';
    sections.forEach(s => s.style.display = 'block');
    window.scrollTo(0, 0);
});

// ============================================================
// OVERLAY DESCRIPTION (CARTE FLOTTANTE EN VERRE)
// ============================================================
function ouvrirOverlay(id) {
    const produit = produits.find(p => p.id === id);
    if (!produit) return;

    const overlay = document.getElementById('description-overlay');
    const content = document.getElementById('description-content');

    content.innerHTML = `
        <p class="desc-nom">${produit.nom}</p>
        <p class="desc-prix">
            ${produit.prix_barre ? `<span class="prix-barre">${produit.prix_barre.toFixed(2)} $</span>` : ''}
            <span class="prix-actuel">${produit.prix.toFixed(2)} $</span>
        </p>
        <p class="desc-texte">${produit.description || 'Description à venir.'}</p>
        <a href="https://wa.me/${NUMERO_WHATSAPP}?text=Bonjour%2C%20je%20viens%20du%20site%20Afro%20Glow%20et%20je%20souhaite%20commander%20${encodeURIComponent(produit.nom)}" 
           class="desc-btn" target="_blank">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="vertical-align:middle;margin-right:6px;">
                <path d="M12 2a10 10 0 0 0-8.9 15.2L2 22l4.8-1.1A10 10 0 1 0 12 2zm0 18.5a8.5 8.5 0 0 1-4.5-1.3l-.3-.2-2.8.6.6-2.8-.2-.3A8.5 8.5 0 1 1 12 20.5z"/>
                <path d="M12 6.5a5.5 5.5 0 0 0-5.5 5.5A5.5 5.5 0 0 0 12 17.5 5.5 5.5 0 0 0 17.5 12 5.5 5.5 0 0 0 12 6.5zm0 9.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
            </svg>
            Commander sur WhatsApp
        </a>
    `;

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fermerDescription() {
    const overlay = document.getElementById('description-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Fermer en cliquant sur le fond
document.getElementById('description-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) fermerDescription();
});

// Fermer avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fermerDescription();
});