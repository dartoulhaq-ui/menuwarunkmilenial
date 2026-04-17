document.addEventListener('DOMContentLoaded', () => {
    const pageLinks = document.querySelectorAll('.page-link');
    const menuPages = document.querySelectorAll('.menu-page');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchContainer = document.getElementById('search-container');
    const currentYear = document.getElementById('current-year');
    const animatedImage = document.getElementById('animated-image-container');
    const promoPopup = document.getElementById('promoPopup');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const btnScrollUp = document.getElementById('sideScrollUp');
    const btnScrollDown = document.getElementById('sideScrollDown');
    const bottomBar = document.getElementById('bottom-running-bar');

    function normalizeText(text) {
        return String(text || '')
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, ' ')
            .replace(/\s+/g, ' ');
    }
    const searchMap = {
        "nasi goreng telur nasgor telur": { id: "menu-item-nasi-goreng-telur", page: "#page-menu-lokalan" },
        "nasi goreng sosis nasgor sosis": { id: "menu-item-nasi-goreng-sosis", page: "#page-menu-lokalan" },
        "nasi goreng pete nasgor pete": { id: "menu-item-nasi-goreng-pete", page: "#page-menu-lokalan" },
        "nasi goreng bakso nasgor bakso": { id: "menu-item-nasi-goreng-bakso", page: "#page-menu-lokalan" },
        "nasi goreng ati ampela nasgor ati": { id: "menu-item-nasi-goreng-ati-ampela", page: "#page-menu-lokalan" },
        "nasi goreng ayam nasgor ayam": { id: "menu-item-nasi-goreng-ayam", page: "#page-menu-lokalan" },
        "nasi goreng ikan asin nasgor ikan asin teri": { id: "menu-item-nasi-goreng-ikan-asin", page: "#page-menu-lokalan" },
        "nasi goreng seafood cumi": { id: "menu-item-nasi-goreng-seafood", page: "#page-menu-lokalan" },
        "nasi goreng hongkong": { id: "menu-item-nasi-goreng-hongkong", page: "#page-menu-lokalan" },
        "nasi goreng gila": { id: "menu-item-nasi-goreng-gila", page: "#page-menu-lokalan" },
        "nasi goreng spesial wm nasgor spesial": { id: "menu-item-nasi-goreng-special-wm", page: "#page-menu-lokalan" },
        "mie goreng telur": { id: "menu-item-mie-goreng-telur", page: "#page-menu-lokalan" },
        "mie goreng pete": { id: "menu-item-mie-goreng-pete", page: "#page-menu-lokalan" },
        "mie goreng ati ampela": { id: "menu-item-mie-goreng-ati-ampela", page: "#page-menu-lokalan" },
        "mie goreng ayam": { id: "menu-item-mie-goreng-ayam", page: "#page-menu-lokalan" },
        "mie goreng seafood": { id: "menu-item-mie-goreng-seafood", page: "#page-menu-lokalan" },
        "mie goreng sapi": { id: "menu-item-mie-goreng-sapi", page: "#page-menu-lokalan" },
        "mie goreng gila": { id: "menu-item-mie-goreng-gila", page: "#page-menu-lokalan" },
        "mie goreng spesial wm": { id: "menu-item-mie-goreng-special-wm", page: "#page-menu-lokalan" },
        "bihun goreng telur": { id: "menu-item-bihun-goreng-telur", page: "#page-menu-lokalan" },
        "bihun goreng pete": { id: "menu-item-bihun-goreng-pete", page: "#page-menu-lokalan" },
        "bihun goreng ati ampela": { id: "menu-item-bihun-goreng-ati-ampela", page: "#page-menu-lokalan" },
        "bihun goreng ayam": { id: "menu-item-bihun-goreng-ayam", page: "#page-menu-lokalan" },
        "bihun goreng seafood": { id: "menu-item-bihun-goreng-seafood", page: "#page-menu-lokalan" },
        "bihun goreng sapi": { id: "menu-item-bihun-goreng-sapi", page: "#page-menu-lokalan" },
        "bihun goreng gila": { id: "menu-item-bihun-goreng-gila", page: "#page-menu-lokalan" },
        "bihun goreng special wm": { id: "menu-item-bihun-goreng-special-wm", page: "#page-menu-lokalan" },
        "kwetiaw goreng telur kwetiau goreng telur": { id: "menu-item-kwetiaw-goreng-telur", page: "#page-menu-lokalan" },
        "kwetiaw goreng ati ampela kwetiau goreng ati": { id: "menu-item-kwetiaw-goreng-ati-ampela", page: "#page-menu-lokalan" },
        "kwetiaw goreng ayam kwetiau goreng ayam": { id: "menu-item-kwetiaw-goreng-ayam", page: "#page-menu-lokalan" },
        "kwetiaw goreng seafood kwetiau goreng seafood": { id: "menu-item-kwetiaw-goreng-seafood", page: "#page-menu-lokalan" },
        "kwetiaw goreng sapi kwetiau goreng sapi": { id: "menu-item-kwetiaw-goreng-sapi", page: "#page-menu-lokalan" },
        "kwetiaw goreng gila kwetiau goreng gila": { id: "menu-item-kwetiaw-goreng-gila", page: "#page-menu-lokalan" },
        "kwetiaw goreng special wm kwetiau goreng spesial": { id: "menu-item-kwetiaw-goreng-special-wm", page: "#page-menu-lokalan" },
        "kwetiaw siram ayam": { id: "menu-item-kwetiaw-siram-ayam", page: "#page-menu-lokalan" },
        "kwetiaw siram seafood": { id: "menu-item-kwetiaw-siram-seafood", page: "#page-menu-lokalan" },
        "kwetiaw siram sapi": { id: "menu-item-kwetiaw-siram-sapi", page: "#page-menu-lokalan" },
        "kwetiaw kuah ayam": { id: "menu-item-kwetiaw-kuah-ayam", page: "#page-menu-lokalan" },
        "kwetiaw kuah seafood": { id: "menu-item-kwetiaw-kuah-seafood", page: "#page-menu-lokalan" },
        "kwetiaw kuah sapi": { id: "menu-item-kwetiaw-kuah-sapi", page: "#page-menu-lokalan" },
        "tomyam ayam": { id: "menu-item-tomyam-ayam", page: "#page-menu-lokalan" },
        "tomyam seafood": { id: "menu-item-tomyam-seafood", page: "#page-menu-lokalan" },
        "tomyam sapi": { id: "menu-item-tomyam-sapi", page: "#page-menu-lokalan" },
        "capcay ayam": { id: "menu-item-capcay-ayam", page: "#page-menu-lokalan" },
        "capcay seafood": { id: "menu-item-capcay-seafood", page: "#page-menu-lokalan" },
        "capcay sapi": { id: "menu-item-capcay-sapi", page: "#page-menu-lokalan" },
        "capcay spesial wm": { id: "menu-item-capcay-special-wm", page: "#page-menu-lokalan" },
        "sapo tahu ayam": { id: "menu-item-sapo-tahu-ayam", page: "#page-menu-lokalan" },
        "sapo tahu seafood": { id: "menu-item-sapo-tahu-seafood", page: "#page-menu-lokalan" },
        "sapo tahu sapi": { id: "menu-item-sapo-tahu-sapi", page: "#page-menu-lokalan" },
        "tongseng ayam": { id: "menu-item-tongseng-ayam", page: "#page-menu-lokalan" },
        "tongseng sapi": { id: "menu-item-tongseng-sapi", page: "#page-menu-lokalan" },
        "soto madura": { id: "menu-item-soto-madura", page: "#page-menu-lokalan" },
        "soto betawi": { id: "menu-item-soto-betawi", page: "#page-menu-lokalan" },
        "sop ayam": { id: "menu-item-sop-ayam", page: "#page-menu-lokalan" },
        "sop daging": { id: "menu-item-sop-daging", page: "#page-menu-lokalan" },
        "sop iga sapi": { id: "menu-item-sop-iga-sapi", page: "#page-menu-lokalan" },
        "sop buntut": { id: "menu-item-sop-buntut", page: "#page-menu-lokalan" },
        "iga goreng penyet": { id: "menu-item-iga-goreng-penyet", page: "#page-menu-lokalan" },
        "iga bakar": { id: "menu-item-iga-bakar", page: "#page-menu-lokalan" },
        "iga bakar mozarela": { id: "menu-item-iga-bakar-mozarela", page: "#page-menu-lokalan" },
        "buntut bakar": { id: "menu-item-buntut-bakar", page: "#page-menu-lokalan" },
        "buntut bakar double": { id: "menu-item-buntut-bakar-double", page: "#page-menu-lokalan" },
        "paket hokie": { id: "menu-item-paket-hokie", page: "#page-menu-lokalan" },
        "paket steamboat": { id: "menu-item-paket-steam", page: "#page-menu-lokalan" },
        "ayam goreng": { id: "menu-item-ayam-goreng", page: "#page-menu-lokalan" },
        "nasi ayam daun jeruk": { id: "menu-item-ayam-daun", page: "#page-menu-lokalan" },
        "ayam bakar": { id: "menu-item-ayam-bakar", page: "#page-menu-lokalan" },
        "ayam geprek": { id: "menu-item-ayam-geprek", page: "#page-menu-lokalan" },
        "ayam rica rica": { id: "menu-item-ayam-rica-rica", page: "#page-menu-lokalan" },
        "ayam asam manis": { id: "menu-item-ayam-asam-manis", page: "#page-menu-lokalan" },
        "ayam lada hitam": { id: "menu-item-ayam-lada-hitam", page: "#page-menu-lokalan" },
        "ayam kampung gepuk": { id: "menu-item-ayam-kampung-gepuk", page: "#page-menu-lokalan" },
        "ayam kampung daun jeruk": { id: "menu-item-ayam-kampung-daun", page: "#page-menu-lokalan" },
        "ayam kampung kremes": { id: "menu-item-ayam-kampung-kremes", page: "#page-menu-lokalan" },
        "ayam kampung bakar": { id: "menu-item-ayam-kampung-bakar", page: "#page-menu-lokalan" },
        "ayam kampung bakar lada hitam": { id: "menu-item-ayam-kampung-bakar-lada-hitam", page: "#page-menu-lokalan" },
        "ayam kampung rica rica": { id: "menu-item-ayam-kampung-rica-rica", page: "#page-menu-lokalan" },
        "ayam kampung lada hitam": { id: "menu-item-ayam-kampung-lada-hitam", page: "#page-menu-lokalan" },
        "bebek goreng": { id: "menu-item-bebek-goreng", page: "#page-menu-lokalan" },
        "bebek bakar": { id: "menu-item-bebek-bakar", page: "#page-menu-lokalan" },
        "bebek rica rica": { id: "menu-item-bebek-rica-rica", page: "#page-menu-lokalan" },
        "bebek lada hitam": { id: "menu-item-bebek-lada-hitam", page: "#page-menu-lokalan" },
        "bebek kremes": { id: "menu-item-bebek-kremes", page: "#page-menu-lokalan" },
        "bebek bakar lada hitam": { id: "menu-item-bebek-bakar-lada-hitam", page: "#page-menu-lokalan" },
        "bebek sambel gledek": { id: "menu-item-bebek-sambel-gledek", page: "#page-menu-lokalan" },
        "nasi bebek daun jeruk": { id: "menu-item-bebek-daun", page: "#page-menu-lokalan" },
        "udang rica rica": { id: "menu-item-udang-rica-rica", page: "#page-menu-lokalan" },
        "udang asam manis": { id: "menu-item-udang-asam-manis", page: "#page-menu-lokalan" },
        "udang lada hitam": { id: "menu-item-udang-lada-hitam", page: "#page-menu-lokalan" },
        "udang telur asin": { id: "menu-item-udang-telur-asin", page: "#page-menu-lokalan" },
        "udang sambel pete": { id: "menu-item-udang-sambel-pete", page: "#page-menu-lokalan" },
        "cumi rica rica": { id: "menu-item-cumi-rica-rica", page: "#page-menu-lokalan" },
        "cumi asam manis": { id: "menu-item-cumi-asam-manis", page: "#page-menu-lokalan" },
        "cumi lada hitam": { id: "menu-item-cumi-lada-hitam", page: "#page-menu-lokalan" },
        "cumi telur asin": { id: "menu-item-cumi-telur-asin", page: "#page-menu-lokalan" },
        "cumi sambel pete": { id: "menu-item-cumi-sambel-pete", page: "#page-menu-lokalan" },
        "kikil penyet": { id: "menu-item-kikil-penyet", page: "#page-menu-lokalan" },
        "oseng kikil": { id: "menu-item-oseng-kikil", page: "#page-menu-lokalan" },
        "kikil sambel pete": { id: "menu-item-kikil-sambel-pete", page: "#page-menu-lokalan" },
        "oseng daging": { id: "menu-item-oseng-daging", page: "#page-menu-lokalan" },
        "oseng iga": { id: "menu-item-oseng-iga", page: "#page-menu-lokalan" },
        "sapi rica rica": { id: "menu-item-sapirica", page: "#page-menu-lokalan" },
        "sapi lada hitam": { id: "menu-item-sapilh", page: "#page-menu-lokalan" },
        "telur barendo": { id: "menu-item-telur-barendo", page: "#page-menu-lokalan" },
        "terong penyet": { id: "menu-item-terong-penyet", page: "#page-menu-lokalan" },
        "terong crispy": { id: "menu-item-terong-crispy", page: "#page-menu-lokalan" },
        "ricebowl ayam rica rica": { id: "menu-item-rice-bowl-ayam-rica-rica", page: "#page-fast-food" },
        "ricebowl ayam lada hitam": { id: "menu-item-rice-bowl-ayam-lada-hitam", page: "#page-fast-food" },
        "ricebowl udang rica rica": { id: "menu-item-rice-bowl-udang-rica-rica", page: "#page-fast-food" },
        "ricebowl udang lada hitam": { id: "menu-item-rice-bowl-udang-lada-hitam", page: "#page-fast-food" },
        "ricebowl cumi rica rica": { id: "menu-item-rice-bowl-cumi-rica-rica", page: "#page-fast-food" },
        "ricebowl cumi lada hitam": { id: "menu-item-rice-bowl-cumi-lada-hitam", page: "#page-fast-food" },
        "ricebowl sapi rica rica": { id: "menu-item-rice-bowl-sapi-rica-rica", page: "#page-fast-food" },
        "ricebowl sapi lada hitam": { id: "menu-item-rice-bowl-sapi-lada-hitam", page: "#page-fast-food" },
        "hotplate ayam": { id: "menu-item-hot-plate-ayam", page: "#page-fast-food" },
        "hotplate udang": { id: "menu-item-hot-plate-udang", page: "#page-fast-food" },
        "hotplate cumi": { id: "menu-item-hot-plate-cumi", page: "#page-fast-food" },
        "hotplate sapi": { id: "menu-item-hot-plate-sapi", page: "#page-fast-food" },
        "chicken steak": { id: "menu-item-chicken-steak", page: "#page-fast-food" },
        "crispy chicken steak": { id: "menu-item-crispy-chicken-steak", page: "#page-fast-food" },
        "beef steak": { id: "menu-item-beef-steak", page: "#page-fast-food" },
        "ramen ayam": { id: "menu-item-ramen-ayam", page: "#page-fast-food" },
        "ramen ati ampela": { id: "menu-item-ramen-ati-ampela", page: "#page-fast-food" },
        "ramen seafood": { id: "menu-item-ramen-seafood", page: "#page-fast-food" },
        "ramen sapi": { id: "menu-item-ramen-sapi", page: "#page-fast-food" },
        "ramen spesial wm": { id: "menu-item-ramen-spesial-wm", page: "#page-fast-food" },
        "pizza bolognese": { id: "menu-item-pizza-bolognese", page: "#page-fast-food" },
        "pizza meatlover": { id: "menu-item-pizza-meatlover", page: "#page-fast-food" },
        "burger chicken": { id: "menu-item-burger-chicken", page: "#page-fast-food" },
        "burger beef": { id: "menu-item-burger-beef", page: "#page-fast-food" },
        "spagheti carbonara": { id: "menu-item-spagheti-carbonara", page: "#page-fast-food" },
        "spagheti bolognese": { id: "menu-item-spagheti-bolognese", page: "#page-fast-food" },
        "cireng": { id: "menu-item-cireng", page: "#page-cemilan" },
        "tempe mendoan": { id: "menu-item-tempe-mendoan", page: "#page-cemilan" },
        "martabak tahu telur": { id: "menu-item-martabak-tahu-telur", page: "#page-cemilan" },
        "tahu jerit": { id: "menu-item-tahu-jerit", page: "#page-cemilan" },
        "tahu cabe lada garam": { id: "menu-item-tahu-cabe", page: "#page-cemilan" },
        "tahu bakso goreng": { id: "menu-item-tahu-bakso-goreng", page: "#page-cemilan" },
        "tahu bakso rebus": { id: "menu-item-tahu-bakso-rebus", page: "#page-cemilan" },
        "potato cheese ball": { id: "menu-item-potato-cheese-ball", page: "#page-cemilan" },
        "pempek kampung": { id: "menu-item-pempekkamp", page: "#page-cemilan" },
        "bakwan kampung": { id: "menu-item-bakwankamp", page: "#page-cemilan" },
        "kentang goreng balado": { id: "menu-item-kentang-goreng-balado", page: "#page-cemilan" },
        "kentang goreng original": { id: "menu-item-kentang-goreng-original", page: "#page-cemilan" },
        "singkong goreng balado": { id: "menu-item-singkong-goreng-balado", page: "#page-cemilan" },
        "singkong goreng original": { id: "menu-item-singkong-goreng-original", page: "#page-cemilan" },
        "sosis goreng": { id: "menu-item-sosis-goreng", page: "#page-cemilan" },
        "sosis bakar": { id: "menu-item-sosis-bakar", page: "#page-cemilan" },
        "lumpia ayam": { id: "menu-item-lumpia-ayam", page: "#page-cemilan" },
        "lumpia tapai": { id: "menu-item-lumpia-tapai", page: "#page-cemilan" },
        "indomie telur": { id: "menu-item-indomie-goreng-rebus-telur", page: "#page-cemilan" },
        "indomie ayam": { id: "menu-item-indomie-goreng-rebus-ayam", page: "#page-cemilan" },
        "indomie ati ampela": { id: "menu-item-indomie-goreng-rebus-ati-ampela", page: "#page-cemilan" },
        "indomie special wm": { id: "menu-item-indomie-goreng-rebus-special-wm", page: "#page-cemilan" },
        "pisang goreng original": { id: "menu-item-pisang-goreng-original", page: "#page-cemilan" },
        "pisang goreng keju": { id: "menu-item-pisang-goreng-keju", page: "#page-cemilan" },
        "pisang goreng coklat": { id: "menu-item-pisang-goreng-coklat", page: "#page-cemilan" },
        "pisang goreng coklat keju": { id: "menu-item-pisang-goreng-coklat-keju", page: "#page-cemilan" },
        "pisang bakar original": { id: "menu-item-pisang-bakar-original", page: "#page-cemilan" },
        "pisang bakar keju": { id: "menu-item-pisang-bakar-keju", page: "#page-cemilan" },
        "pisang bakar coklat": { id: "menu-item-pisang-bakar-coklat", page: "#page-cemilan" },
        "pisang bakar coklat keju": { id: "menu-item-pisang-bakar-coklat-keju", page: "#page-cemilan" },
        "roti bakar keju": { id: "menu-item-roti-bakar-keju", page: "#page-cemilan" },
        "roti bakar coklat": { id: "menu-item-roti-bakar-coklat", page: "#page-cemilan" },
        "roti bakar coklat keju": { id: "menu-item-roti-bakar-coklat-keju", page: "#page-cemilan" },
        "roti ice cream es krim chocolate": { id: "menu-item-roti-icecho", page: "#page-cemilan" },
        "roti ice cream es krim strawberry": { id: "menu-item-roti-icestraw", page: "#page-cemilan" },
        "roti ice cream es krim vanilla": { id: "menu-item-roti-icevanil", page: "#page-cemilan" },
        "es campur": { id: "menu-item-es-campur", page: "#page-minuman" },
        "es alpukat kocok": { id: "menu-item-alpukat-kocok", page: "#page-minuman" },
        "es dawet": { id: "menu-item-es-dawet", page: "#page-minuman" },
        "es teler": { id: "menu-item-es-teler", page: "#page-minuman" },
        "degan jeruk": { id: "menu-item-degan-jeruk", page: "#page-minuman" },
        "degan susu": { id: "menu-item-degan-susu", page: "#page-minuman" },
        "kopi susu milenial": { id: "menu-item-kopi-susu-milenial", page: "#page-minuman" },
        "kopi susu aren": { id: "menu-item-kopi-susu-aren", page: "#page-minuman" },
        "choco butter": { id: "menu-item-choco-butter", page: "#page-minuman" },
        "milenial salty": { id: "menu-item-milenial-salty", page: "#page-minuman" },
        "moca mint choco": { id: "menu-item-moca-mint-choco", page: "#page-minuman" },
        "tiramisu": { id: "menu-item-tiramisu", page: "#page-minuman" },
        "kopi hitam americano": { id: "menu-item-americano", page: "#page-minuman" },
        "long black": { id: "menu-item-long-black", page: "#page-minuman" },
        "latte classic": { id: "menu-item-latte-classic", page: "#page-minuman" },
        "vanilla latte": { id: "menu-item-vanilla-latte", page: "#page-minuman" },
        "caramel latte": { id: "menu-item-caramel-latte", page: "#page-minuman" },
        "hazelnut latte": { id: "menu-item-hazelnut-latte", page: "#page-minuman" },
        "cappucino": { id: "menu-item-capuchino", page: "#page-minuman" },
        "avocado coffe": { id: "menu-item-avocado-coffe", page: "#page-minuman" },
        "affogato": { id: "menu-item-affogato", page: "#page-minuman" },
        "caramel machiato": { id: "menu-item-caramel-machiato", page: "#page-minuman" },
        "kopi susu butter": { id: "menu-item-kopi-susu-butter", page: "#page-minuman" },
        "matcha frappe": { id: "menu-item-matcha-frappe", page: "#page-minuman" },
        "coklat frappe": { id: "menu-item-coklat-frappe", page: "#page-minuman" },
        "vanila frappe": { id: "menu-item-vanila-frappe", page: "#page-minuman" },
        "cookkies frappe": { id: "menu-item-cokkkies-frape", page: "#page-minuman" },
        "pistachio latte": { id: "menu-item-pistachio", page: "#page-minuman" },
        "pandan latte": { id: "menu-item-pandan-latte", page: "#page-minuman" },
        "moca float": { id: "menu-item-moca-float", page: "#page-minuman" },
        "strawbery float": { id: "menu-item-strawbery-float", page: "#page-minuman" },
        "milo delight": { id: "menu-item-milo-delight", page: "#page-minuman" },
        "banana cream float": { id: "menu-item-banana-cream-float", page: "#page-minuman" },
        "cake & cream": { id: "menu-item-cake-cream", page: "#page-minuman" },
        "mocktail pinoro": { id: "menu-item-pinoro", page: "#page-minuman" },
        "strawberry frizz": { id: "menu-item-strawkid", page: "#page-minuman" },
        "manggo lessi": { id: "menu-item-mangkid", page: "#page-minuman" },
        "white lecy": { id: "menu-item-whitekid", page: "#page-minuman" },
        "es teh manis": { id: "menu-item-teh-manis", page: "#page-minuman" },
        "teh tawar hangat": { id: "menu-item-teh-tawar", page: "#page-minuman" },
        "teh tarik": { id: "menu-item-teh-tarik", page: "#page-minuman" },
        "lecy tea": { id: "menu-item-lecy-tea", page: "#page-minuman" },
        "longan tea": { id: "menu-item-longan-tea", page: "#page-minuman" },
        "lemon tea": { id: "menu-item-lemon-tea", page: "#page-minuman" },
        "peach tea": { id: "menu-item-peach-tea", page: "#page-minuman" },
        "strawberry tea": { id: "menu-item-strawbery-tea", page: "#page-minuman" },
        "manggo tea": { id: "menu-item-manggo-tea", page: "#page-minuman" },
        "honey lemon": { id: "menu-item-honey-lemon", page: "#page-minuman" },
        "matcha": { id: "menu-item-matcha", page: "#page-minuman" },
        "milo": { id: "menu-item-milo", page: "#page-minuman" },
        "taro": { id: "menu-item-taro", page: "#page-minuman" },
        "redvelvet": { id: "menu-item-redvelvet", page: "#page-minuman" },
        "cincau gula aren": { id: "menu-item-cincau-gula-aren", page: "#page-minuman" },
        "dark chocolate": { id: "menu-item-dark-chocolate", page: "#page-minuman" },
        "caramel chocolate": { id: "menu-item-caramel-chocolate", page: "#page-minuman" },
        "vanila chocolate": { id: "menu-item-vanila-chocolate", page: "#page-minuman" },
        "hazelnut chocolate": { id: "menu-item-hazelnut-chocolate", page: "#page-minuman" },
        "pistachio chocolate": { id: "menu-item-pistachio-choco", page: "#page-minuman" },
        "es jeruk manis": { id: "menu-item-jeruk-manis", page: "#page-minuman" },
        "es jeruk kunci": { id: "menu-item-jeruk-kunci", page: "#page-minuman" },
        "jeruk kunci sunmoy": { id: "menu-item-jeruk-kunci-sunmoy", page: "#page-minuman" },
        "jus alpukat": { id: "menu-item-jus-alpukat", page: "#page-minuman" },
        "jus mangga": { id: "menu-item-jus-mangga", page: "#page-minuman" },
        "jus naga": { id: "menu-item-jus-naga", page: "#page-minuman" },
        "jus melon": { id: "menu-item-jus-melon", page: "#page-minuman" },
        "jeruk kunci longan": { id: "menu-item-jeruk-kunci-longan", page: "#page-minuman" },
        "wedang jahe": { id: "menu-item-wedang-jahe", page: "#page-minuman" },
        "artisan tea teh": { id: "menu-item-artisan-tea", page: "#page-minuman" },
        "nasi putih": { id: "menu-item-nasi-putih", page: "#page-tambahan" },
        "sambal": { id: "menu-item-sambal-geprek", page: "#page-tambahan" },
        "kerupuk": { id: "menu-item-telur-dadar", page: "#page-tambahan" }
    };
    const searchIndex = Object.entries(searchMap).map(([keyword, value]) => ({
        keyword: normalizeText(keyword),
        compact: normalizeText(keyword).replace(/\s+/g, ''),
        ...value
    }));
    function buildSearchTarget(query) {
        const normalizedQuery = normalizeText(query);
        const compactQuery = normalizedQuery.replace(/\s+/g, '');

        return searchIndex.find(({ keyword, compact }) =>
            keyword.includes(normalizedQuery) ||
            compact.includes(compactQuery) ||
            normalizedQuery.includes(keyword) ||
            keyword.split(' ').some((word) => word === normalizedQuery)
        );
    }
    function showPage(pageId, scrollTargetId = null) {
        menuPages.forEach((page) => page.classList.toggle('active', page.id === pageId));
        const activePage = document.getElementById(pageId);
        if (activePage) {
            window.scrollTo(0, 0);
            if (scrollTargetId) {
                const targetElement = document.getElementById(scrollTargetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        } else {
            document.getElementById('page-utama')?.classList.add('active');
        }
    }
    function handlePageNavigation() {
        const hash = window.location.hash;
        const pageId = hash && hash.startsWith('#page-') ? hash.substring(1) : 'page-utama';
        showPage(pageId);
    }
    function highlightElement(element) {
        if (!element) return;
        element.classList.add('highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => element.classList.remove('highlight'), 2500);
    }
    function performSearch() {
        const query = searchInput?.value.trim();
        if (!query || query.length < 2) {
            searchContainer?.classList.add('shake-search');
            window.setTimeout(() => searchContainer?.classList.remove('shake-search'), 500);
            return;
        }
        const target = buildSearchTarget(query);
        if (!target) {
            searchContainer?.classList.add('shake-search');
            window.setTimeout(() => searchContainer?.classList.remove('shake-search'), 500);
            return;
        }
        if (window.location.hash !== target.page) {
            window.location.hash = target.page;
            window.setTimeout(() => highlightElement(document.getElementById(target.id)), 120);
        } else {
            highlightElement(document.getElementById(target.id));
        }
    }
    function initSliderButtons() {
        const sliderButtonsPrev = document.querySelectorAll('.slider-btn-prev');
        const sliderButtonsNext = document.querySelectorAll('.slider-btn-next');
        const scrollByWidth = (slider) => Math.max(slider.clientWidth * 0.9, 300);

        sliderButtonsPrev.forEach((button) => {
            button.addEventListener('click', () => {
                const slider = document.getElementById(button.dataset.slider);
                if (slider) {
                    slider.scrollBy({ left: -scrollByWidth(slider), behavior: 'smooth' });
                }
            });
        });
        sliderButtonsNext.forEach((button) => {
            button.addEventListener('click', () => {
                const slider = document.getElementById(button.dataset.slider);
                if (slider) {
                    slider.scrollBy({ left: scrollByWidth(slider), behavior: 'smooth' });
                }
            });
        });
    }
    function initPageLinks() {
        pageLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                const scrollTarget = link.dataset.scrollTarget;
                if (href && href.startsWith('#page-')) {
                    event.preventDefault();
                    if (scrollTarget) {
                        showPage(href.substring(1), scrollTarget);
                    }
                    window.location.hash = href;
                }
            });
        });
    }
    function initSearch() {
        searchButton?.addEventListener('click', performSearch);
        searchInput?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    function initAnimationObserver() {
        if (!animatedImage) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(animatedImage);
    }
    function initYear() {
        if (currentYear) {
            currentYear.textContent = String(new Date().getFullYear());
        }
    }
    function initPromoPopup() {
        if (!promoPopup || !closePromoBtn) return;
        closePromoBtn.addEventListener('click', () => {
            promoPopup.style.transition = 'all 0.3s ease-in-out';
            promoPopup.style.transform = 'scale(0)';
            promoPopup.style.opacity = '0';
            window.setTimeout(() => {
                promoPopup.style.display = 'none';
            }, 300);
        });
    }
    function initScrollButtons() {
        const getScrollDistance = () => window.innerHeight * 0.8;
        btnScrollUp?.addEventListener('click', () => {
            window.scrollBy({ top: -getScrollDistance(), behavior: 'smooth' });
        });
        btnScrollDown?.addEventListener('click', () => {
            window.scrollBy({ top: getScrollDistance(), behavior: 'smooth' });
        });
    }
    function hideWaitMessage() {
        const pesan = document.getElementById('pesan-tunggu');
        if (!pesan) return;
        window.setTimeout(() => {
            pesan.style.opacity = '0';
            window.setTimeout(() => {
                pesan.style.display = 'none';
            }, 500);
        }, 5000);
    }
    function showBottomBar() {
        if (!bottomBar) return;
        window.setTimeout(() => {
            bottomBar.classList.remove('translate-y-full');
        }, 2000);
    }
    initPageLinks();
    initSearch();
    initSliderButtons();
    initAnimationObserver();
    initYear();
    initPromoPopup();
    initScrollButtons();
    hideWaitMessage();
    showBottomBar();
    handlePageNavigation();
    window.addEventListener('hashchange', handlePageNavigation);
});
