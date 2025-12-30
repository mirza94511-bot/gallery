// Main gallery JavaScript extracted from gallery.html
// Simple auth guard: redirect to login.html if cookie `gallery_auth` is missing.
(function(){
    try{
        const path = (location.pathname || '').toLowerCase();
        if (!path.endsWith('/login.html') && !path.endsWith('login.html')){
            if (!document.cookie || document.cookie.split(';').map(c=>c.trim()).indexOf('gallery_auth=1') === -1){
                // Allow service worker file and assets to load without redirect
                const allow = ['service-worker.js','auth.js','login.html','vercel.json','netlify.toml'];
                const p = path.split('/').pop();
                if (!allow.includes(p)) {
                    location.href = 'login.html';
                }
            }
        }
    }catch(e){}
})();

// Array of all images in the folder
const images = [
    '1.jpg',
    '10.jpg',
    '1000064939jpg.0_(1).jpg',
    '1000064939jpg.0.jpg',
    '11.jpg',
    '12.jpg',
    '14.jpg',
    '18.jpg',
    '2.jpg',
    '20.jpg',
    '20250902065102865.jpg',
    '23.jpg',
    '3.jpg',
    '36.jpg',
    '37.jpg',
    '4.jpg',
    '5.jpg',
    '63.jpg',
    '64.jpg',
    '66.jpg',
    '67.jpg',
    '68.jpg',
    '69.jpg',
    '7.png',
    '70.jpg',
    '78.jpg',
    '79.jpg',
    '8.jpg',
    '80.jpg',
    '81.jpg',
    '82.jpg',
    '83.jpg',
    '9.jpg',
    'AGC_20250411_103009172.jpg',
    'AGC_20250411_120857223.jpg',
    'AGC_20250411_120925933.jpg',
    'AGC_20250411_121023546.jpg',
    'AGC_20250411_122416883.jpg',
    'AGC_20250411_122416883jpg.0.jpg',
    'AGC_20250711_061201485.jpg',
    'AGC_20250711_061235646.png',
    'farukmirza5467_14040815_084723119.jpg',
    'farukmirza5467_14040815_084732719.jpg',
    'farukmirza5467_14040815_084736873.jpg',
    'farukmirza5467_14040815_084740332.jpg',
    'farukmirza5467_14040815_084744075.jpg',
    'farukmirza5467_14040815_084754249.jpg',
    'farukmirza5467_14040815_084757227.jpg',
    'farukmirza5467-20251105-0001.jpg',
    'farukmirza5467-20251105-0002.jpg',
    'IMG_2024-11-08_151330jpg.0.jpg',
    'IMG_2024-12-23_205820jpg.0.jpg',
    'IMG_20250723_134540.jpg',
    'IMG_20250723_134627.jpg',
    'IMG_20250723_134820.jpg',
    'IMG_20251012_202412_079.webp',
    'IMG_20251023_123501_255.jpg',
    'IMG_20251023_123504_790.jpg',
    'IMG_20251023_123507_687.jpg',
    'IMG_20251023_123515_535.jpg',
    'IMG_20251024_142827_946.webp',
    'IMG_20251224_130938_050.webp',
    'IMG-20250208-WA0001.jpg',
    'IMG-20250208-WA0001jpg.0.jpg',
    'IMG-20250208-WA0003.jpg',
    'IMG-20250208-WA0004.jpg',
    'IMG-20250208-WA0004jpg.0.jpg',
    'IMG-20250719-WA0004.jpg',
    'IMG-20250719-WA0006.jpg',
    'IMG-20251105-WA0002.jpg',
    'IMG20241012170833.jpg',
    'IMG20241204122249.jpg',
    'IMG20251103142409.jpg',
    'IMG20251224124917.jpg',
    'IMG20251224124921.jpg',
    'IMG20251224124923.jpg',
    'IMG20251224124924.jpg',
    'IMG20251224124925.jpg',
    'IMG20251224125410.jpg',
    'LMC_20250312_2341030.jpg',
    'LMC_20250312_2341140.jpg',
    'LMC_20250325_2014490.jpg',
    'LMC_20250325_2016390.jpg',
    'LMC_20250325_2021380.jpg',
    'LMC_20250325_2220060.jpg',
    'LMC_20250329_2151040.PORTRAIT.jpg',
    'LMC_20250329_2151040PORTRAITjpg.0.jpg',
    'LMC_20250329_2153250jpg.0_(1).jpg',
    'LMC_20250329_2156130.jpg',
    'LMC_20250329_2156130jpg.0_(1).jpg',
    'LMC_20250329_2156130jpg.0.jpg',
    'LMC_20250329_2201510.jpg',
    'LMC_20250329_2201510jpg.0_(1).jpg',
    'LMC_20250329_2201510jpg.0.jpg',
    'LMC_20250329_2209340.jpg',
    'LMC_20250329_2209340jpg.0_(1).jpg',
    'LMC_20250329_2209340jpg.0.jpg',
    'LMC_20250329_2214580.jpg',
    'LMC_20250329_2214580jpg.0_(1).jpg',
    'LMC_20250329_2214580jpg.0.jpg',
    'LMC_20250329_2219150.jpg',
    'LMC_20250329_2219150jpg.0_(1).jpg',
    'LMC_20250329_2219150jpg.0.jpg',
    'LMC_20250329_2221420.jpg',
    'LMC_20250329_2221420jpg.0_(1).jpg',
    'LMC_20250329_2221420jpg.0.jpg',
    'LMC_20250411_0943270.PORTRAIT.jpg',
    'LMC_20250411_0943270PORTRAITjpg.0.jpg',
    'RIYAN_20250224_223335_🌵Landscape_By__sofiyan💫.NIGHT.jpg',
    'RIYAN_20250224_223446_🌵Landscape_By__sofiyan💫.jpg',
    'Screenshot_2025-07-08-21-32-56-42_f9ee0578fe1cc94de7482bd41accb329jpg.0_(1).jpg',
    'Screenshot_2025-07-08-21-32-56-42_f9ee0578fe1cc94de7482bd41accb329jpg.0.jpg',
    'Screenshot_2025-07-25-20-17-49-76_e2d5b3f32b79de1d45acd1fad96fbb0fjpg.0_(1).jpg',
    'Screenshot_2025-07-25-20-17-49-76_e2d5b3f32b79de1d45acd1fad96fbb0fjpg.0.jpg',
    'Screenshot_2025-07-25-20-18-27-59_e2d5b3f32b79de1d45acd1fad96fbb0fjpg.0_(1).jpg',
    'Screenshot_2025-07-25-20-18-27-59_e2d5b3f32b79de1d45acd1fad96fbb0fjpg.0.jpg',
    'Snapchat-2118682623.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_134829_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_134830_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_134951_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_144947_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172538_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172540_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172942_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172944_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172948_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_172951_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173042_🐲DSLR SHOT🐉 BY BARIK.RESTORED_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173050_🐲DSLR SHOT🐉 BY BARIK.RESTORED_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173456_🐲DSLR SHOT🐉 BY BARIK.MP (1)_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173456_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173530_🐲DSLR SHOT🐉 BY BARIK.RESTORED_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173532_🐲DSLR SHOT🐉 BY BARIK.RESTORED_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173955_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251206_173958_🐲DSLR SHOT🐉 BY BARIK.MP_1.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251224_125003_🐲DSLR SHOT🐉 BY BARIK.PORTRAIT.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251224_125004_🐲DSLR SHOT🐉 BY BARIK.PORTRAIT.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ ʙᴀʀɪᴋ²⁴🇧🇩_20251224_125008_🐲DSLR SHOT🐉 BY BARIK.PORTRAIT.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ_ʙᴀʀɪᴋ²⁴🇧🇩_20251104_165627_🐲DSLR_SHOT🐉_BY_BARIK.MP.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ_ʙᴀʀɪᴋ²⁴🇧🇩_20251104_165631_🐲DSLR_SHOT🐉_BY_BARIK.PORTRAIT.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ_ʙᴀʀɪᴋ²⁴🇧🇩_20251104_165635_🐲DSLR_SHOT🐉_BY_BARIK.PORTRAIT.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ_ʙᴀʀɪᴋ²⁴🇧🇩_20251104_165640_🐲DSLR_SHOT🐉_BY_BARIK.MP.jpg',
    '丅ᴇᴄʜɴɪᴄᴀʟ_ʙᴀʀɪᴋ²⁴🇧🇩_20251104_165955_🐲DSLR_SHOT🐉_BY_BARIK.NIGHT.jpg'
];

let currentImageIndex = 0;
const imageCache = new Map();
let loadedCount = 0;
let totalImages = 0;

function updateLoadingProgress() {
    if (loadedCount === 0 || totalImages === 0) return;
    const progress = (loadedCount / totalImages) * 100;
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) loadingBar.style.width = progress + '%';
    const counter = document.getElementById('loadingCounter');
    if (counter) counter.textContent = `📸 Loading: ${loadedCount}/${totalImages}`;
    if (loadedCount === totalImages) {
        if (counter) counter.classList.remove('show');
        if (loadingBar) loadingBar.style.width = '100%';
        setTimeout(() => { if (loadingBar) loadingBar.style.opacity = '0'; }, 500);
    }
}

function startGallery() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('hidden');
        setTimeout(() => { welcomeScreen.style.display = 'none'; generateGallery(); }, 800);
    } else {
        generateGallery();
    }
}

function generateGallery() {
    const gallery = document.getElementById('gallery');
    totalImages = images.length;
    document.getElementById('loadingCounter').classList.add('show');
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${(index % 12) * 0.05}s`;
        item.innerHTML = `\n            <div class="placeholder"></div>\n            <img data-src="my photos/${img}" alt="Gallery image" data-index="${index}">\n            <div class="overlay">\n                <div class="overlay-icon">🔍</div>\n            </div>\n        `;
        item.onclick = () => openModal(index);
        gallery.appendChild(item);
    });

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                const index = img.getAttribute('data-index');
                const baseName = src.split('/').pop().replace(/\.[^.]+$/, '');
                const thumbUrl = `thumbs/${baseName}.webp`;
                const actualImg = new Image();
                actualImg.onload = () => {
                    img.src = thumbUrl;
                    img.setAttribute('loading', 'lazy');
                    img.classList.add('loaded');
                    img.previousElementSibling.style.display = 'none';
                    imageCache.set(index, thumbUrl);
                    loadedCount++;
                    updateLoadingProgress();
                };
                actualImg.onerror = () => {
                    const fallback = new Image();
                    fallback.onload = () => {
                        img.src = src;
                        img.setAttribute('loading', 'lazy');
                        img.classList.add('loaded');
                        img.previousElementSibling.style.display = 'none';
                        imageCache.set(index, src);
                        loadedCount++;
                        updateLoadingProgress();
                    };
                    fallback.onerror = () => {
                        img.previousElementSibling.innerHTML = '❌ Failed';
                        loadedCount++;
                        updateLoadingProgress();
                    };
                    fallback.src = src;
                };
                actualImg.src = thumbUrl;
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '300px' });

    document.querySelectorAll('[data-src]').forEach(img => imageObserver.observe(img));
    preloadImages({ concurrency: 6 });
}

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('modal');
    const img = document.getElementById('modalImg');
    const src = `my photos/${images[index]}`;
    img.src = src; img.onerror = () => nextImage();
    document.getElementById('modalInfo').textContent = `${index + 1} / ${images.length}`;
    modal.classList.add('active'); document.body.style.overflow = 'hidden';
}

function closeModal() { const modal = document.getElementById('modal'); modal.classList.remove('active'); document.body.style.overflow = 'auto'; }
function nextImage() { currentImageIndex = (currentImageIndex + 1) % images.length; const img = document.getElementById('modalImg'); img.src = `my photos/${images[currentImageIndex]}`; img.onerror = () => nextImage(); document.getElementById('modalInfo').textContent = `${currentImageIndex + 1} / ${images.length}`; }
function prevImage() { currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; const img = document.getElementById('modalImg'); img.src = `my photos/${images[currentImageIndex]}`; img.onerror = () => prevImage(); document.getElementById('modalInfo').textContent = `${currentImageIndex + 1} / ${images.length}`; }

function downloadImage() { const imgSrc = document.getElementById('modalImg').src; const fileName = images[currentImageIndex]; const link = document.createElement('a'); link.href = imgSrc; link.download = fileName || 'photo.jpg'; link.style.display = 'none'; document.body.appendChild(link); link.click(); document.body.removeChild(link); }

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('service-worker.js').catch(() => {}); }

    // Safely attach modal click handler and keyboard navigation only when modal exists
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });
    }

    document.addEventListener('keydown', (e) => {
        const m = modal || document.getElementById('modal');
        if (!m || !m.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModal();
    });
});

function preloadImages(options = { concurrency: 6 }) {
    const concurrency = options.concurrency || 6; let index = 0; const queue = [];
    function next() {
        if (index >= images.length) return Promise.resolve();
        const i = index++; const url = `my photos/${images[i]}`;
        return fetch(url, { mode: 'no-cors' }).then(() => { loadedCount++; updateLoadingProgress(); }).catch(() => { loadedCount++; updateLoadingProgress(); }).then(() => next());
    }
    for (let i = 0; i < concurrency; i++) queue.push(next());
    return Promise.all(queue);
}
