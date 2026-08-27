// ============================================================
// CHARGER LES PRODUITS DEPUIS L'API MySQL
// ============================================================
let produits = [];

async function chargerProduits() {
    try {
        const response = await fetch('api-produits.php?t=' + new Date().getTime());
        if (!response.ok) throw new Error('API non accessible');
        produits = await response.json();
        afficherProduits(produits, 'grille-produits');

        // Mettre à jour les filtres si un filtre est actif
        const filtreActif = document.querySelector('.filtre-btn.actif');
        if (filtreActif) {
            const categorie = filtreActif.dataset.categorie;
            if (categorie !== 'tous') {
                const produitsFiltres = produits.filter(p => p.categorie === categorie);
                afficherProduits(produitsFiltres, 'grille-produits');
            }
        }
    } catch (error) {
        console.error('Erreur de chargement:', error);
        document.getElementById('grille-produits').innerHTML =
            '<p style="color:#a59b91;text-align:center;padding:40px;">Impossible de charger les produits.</p>';
    }
}

// ============================================================
// CONSTANTES ET LOADER
// ============================================================
const NUMERO_WHATSAPP = "243903592715";

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 1500);
    chargerProduits();
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
// AFFICHER LES PRODUITS
// ============================================================
function afficherProduits(produits, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = produits.map(p => {
        const message = `Bonjour%20je%20veux%20commander%20${encodeURIComponent(p.nom)}`;
        
        let imageSrc = p.image || '';
        if (imageSrc && !imageSrc.startsWith('uploads/') && !imageSrc.startsWith('http')) {
            imageSrc = 'uploads/' + imageSrc;
        }
        if (!imageSrc) {
            imageSrc = 'uploads/default.jpg';
        }
        
        return `
            <div class="carte-produit" data-id="${p.id}">
                <div class="carte-image">
                    <img src="${imageSrc}" alt="${p.nom}" loading="lazy" onerror="this.src='uploads/default.jpg'" />
                </div>
                <div class="carte-body">
                    <div class="nom">${p.nom}</div>
                    <div class="prix">
                        ${p.prix_barre ? `<span class="prix-barre">${parseFloat(p.prix_barre).toFixed(2)} $</span>` : ''}
                        <span class="prix-actuel">${parseFloat(p.prix).toFixed(2)} $</span>
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

// ============================================================
// FILTRES
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
// RECHERCHE
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
// CARROUSEL 3D TÉMOIGNAGES
// ============================================================
const temoignages = [
    { image: 'tem1.jpg', texte: 'Je recommande afroglow à toutes mes amies' },
    { image: 'tem2.jpg', texte: 'Mes cheveux sont plus forts, plus doux.' },
    { image: 'tem3.jpg', texte: 'Enfin des produits qui respectent mes cheveux.' },
    { image: 'tem4.jpg', texte: 'Mes cheveux n\'ont jamais été aussi longs.' },
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
// OVERLAY DESCRIPTION
// ============================================================
function ouvrirOverlay(id) {
    const produit = produits.find(p => p.id === id);
    if (!produit) return;

    let imageSrc = produit.image || '';
    if (imageSrc && !imageSrc.startsWith('uploads/') && !imageSrc.startsWith('http')) {
        imageSrc = 'uploads/' + imageSrc;
    }
    if (!imageSrc) {
        imageSrc = 'uploads/default.jpg';
    }

    const overlay = document.getElementById('description-overlay');
    const content = document.getElementById('description-content');

    content.innerHTML = `
        <img src="${imageSrc}" alt="${produit.nom}" style="width:100%; max-height:200px; object-fit:cover; border-radius:12px; margin-bottom:12px; border:1px solid rgba(212,175,136,0.1);" />
        <p class="desc-nom">${produit.nom}</p>
        <p class="desc-prix">
            ${produit.prix_barre ? `<span class="prix-barre">${parseFloat(produit.prix_barre).toFixed(2)} $</span>` : ''}
            <span class="prix-actuel">${parseFloat(produit.prix).toFixed(2)} $</span>
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

document.getElementById('description-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) fermerDescription();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fermerDescription();
});