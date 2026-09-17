import { shuffle } from '../lib/random.js';

const CATALOG = [
  { title: 'Smart TV 50" 4K UHD Smart LED', category: 'Eletronicos', store: 'Shopee Oficial', base: 2199, floor: 1499 },
  { title: 'Smart TV 55" 4K QLED', category: 'Eletronicos', store: 'Shopee Mall', base: 2899, floor: 1999 },
  { title: 'Smart TV 43" Full HD Android', category: 'Eletronicos', store: 'Casa Digital', base: 1599, floor: 999 },
  { title: 'Soundbar 2.1 120W Bluetooth', category: 'Eletronicos', store: 'Audio Shop', base: 799, floor: 449 },
  { title: 'Caixa de Som Bluetooth 40W', category: 'Eletronicos', store: 'Audio Shop', base: 399, floor: 219 },
  { title: 'Caixa de Som Portatil 20W RGB', category: 'Eletronicos', store: 'Shopee Oficial', base: 249, floor: 119 },
  { title: 'Fone de Ouvido Bluetooth TWS', category: 'Eletronicos', store: 'Audio Shop', base: 199, floor: 79 },
  { title: 'Headset Gamer 7.1 Surround', category: 'Eletronicos', store: 'Gamer House', base: 349, floor: 179 },
  { title: 'Alexa Echo Dot 5a Geracao', category: 'Eletronicos', store: 'Shopee Mall', base: 449, floor: 279 },
  { title: 'Pulseira Inteligente Monitor Cardiaco', category: 'Eletronicos', store: 'Smart Wear', base: 229, floor: 99 },
  { title: 'Relogio Inteligente GPS Esportivo', category: 'Eletronicos', store: 'Smart Wear', base: 599, floor: 329 },
  { title: 'Projetor Portatil Full HD Wi-Fi', category: 'Eletronicos', store: 'Casa Digital', base: 1299, floor: 799 },
  { title: 'Carregador Portatil 20000mAh', category: 'Eletronicos', store: 'Mobile Center', base: 179, floor: 89 },
  { title: 'Webcam Full HD 1080p com Microfone', category: 'Eletronicos', store: 'Tech Store BR', base: 249, floor: 129 },

  { title: 'Smartphone 128GB 6GB RAM', category: 'Celulares', store: 'Mobile Center', base: 1499, floor: 999 },
  { title: 'Smartphone 256GB 8GB RAM 5G', category: 'Celulares', store: 'Shopee Oficial', base: 2199, floor: 1499 },
  { title: 'iPhone 13 128GB Seminovo', category: 'Celulares', store: 'Mobile Prime', base: 3299, floor: 2499 },
  { title: 'Redmi Note 128GB Dual Chip', category: 'Celulares', store: 'Xiaomi Store', base: 1399, floor: 899 },
  { title: 'Motorola G 128GB 4G', category: 'Celulares', store: 'Mobile Center', base: 1199, floor: 749 },
  { title: 'Galaxy A 128GB Camera 50MP', category: 'Celulares', store: 'Shopee Mall', base: 1599, floor: 1099 },
  { title: 'Poco X 256GB 8GB RAM', category: 'Celulares', store: 'Xiaomi Store', base: 1899, floor: 1299 },
  { title: 'Capinha Magnética para Celular', category: 'Celulares', store: 'Acessorios BR', base: 79, floor: 29 },
  { title: 'Pelicula de Vidro 3D Premium', category: 'Celulares', store: 'Acessorios BR', base: 49, floor: 19 },
  { title: 'Carregador Turbo 33W USB-C', category: 'Celulares', store: 'Mobile Center', base: 99, floor: 39 },
  { title: 'Suporte Veicular Magnetico', category: 'Celulares', store: 'Acessorios BR', base: 69, floor: 29 },
  { title: 'Fone Intra-Auricular com Fio USB-C', category: 'Celulares', store: 'Audio Shop', base: 89, floor: 29 },
  { title: 'Power Bank Magnetico 10000mAh', category: 'Celulares', store: 'Shopee Oficial', base: 199, floor: 99 },
  { title: 'Tripé para Celular com Controle', category: 'Celulares', store: 'Foto Shop', base: 129, floor: 59 },

  { title: 'Notebook Intel Core i5 16GB SSD 512GB', category: 'Informatica', store: 'Tech Store BR', base: 3499, floor: 2599 },
  { title: 'Notebook Ryzen 7 16GB SSD 1TB', category: 'Informatica', store: 'Shopee Mall', base: 4299, floor: 3199 },
  { title: 'Notebook i3 8GB SSD 256GB', category: 'Informatica', store: 'Tech Store BR', base: 2499, floor: 1799 },
  { title: 'Monitor Gamer 24" 165Hz', category: 'Informatica', store: 'Gamer House', base: 1099, floor: 749 },
  { title: 'Monitor 27" 144Hz IPS', category: 'Informatica', store: 'Hardware BR', base: 1499, floor: 999 },
  { title: 'Teclado Mecanico RGB Switch Blue', category: 'Informatica', store: 'Gamer House', base: 349, floor: 179 },
  { title: 'Mouse Gamer 12000 DPI RGB', category: 'Informatica', store: 'Gamer House', base: 199, floor: 89 },
  { title: 'SSD NVMe 1TB Leitura 3500MB/s', category: 'Informatica', store: 'Hardware BR', base: 649, floor: 389 },
  { title: 'SSD SATA 480GB', category: 'Informatica', store: 'Hardware BR', base: 279, floor: 159 },
  { title: 'Memoria RAM 16GB DDR4 3200MHz', category: 'Informatica', store: 'Hardware BR', base: 349, floor: 199 },
  { title: 'Tablet 10.1" 128GB Wi-Fi', category: 'Informatica', store: 'Tech Store BR', base: 1299, floor: 899 },
  { title: 'Impressora Multifuncional Wi-Fi', category: 'Informatica', store: 'Office BR', base: 799, floor: 499 },
  { title: 'Hub USB-C 7 em 1 HDMI 4K', category: 'Informatica', store: 'Tech Store BR', base: 189, floor: 89 },
  { title: 'Cadeira de Escritorio Ergonômica', category: 'Informatica', store: 'Office BR', base: 899, floor: 549 },
  { title: 'Webcam 4K Autofoco com Ring Light', category: 'Informatica', store: 'Foto Shop', base: 449, floor: 249 },

  { title: 'Air Fryer Digital 5L', category: 'Casa', store: 'Casa & Co', base: 499, floor: 299 },
  { title: 'Air Fryer Oven 12L', category: 'Casa', store: 'Shopee Oficial', base: 799, floor: 499 },
  { title: 'Cafeteira Expresso Compacta', category: 'Casa', store: 'Casa & Co', base: 699, floor: 449 },
  { title: 'Cafeteira Italiana 6 Xicaras', category: 'Casa', store: 'Casa & Co', base: 159, floor: 79 },
  { title: 'Liquidificador 1000W Copo de Vidro', category: 'Casa', store: 'Eletro Lar', base: 299, floor: 159 },
  { title: 'Aspirador de Po Vertical 2 em 1', category: 'Casa', store: 'Casa & Co', base: 399, floor: 229 },
  { title: 'Robo Aspirador Inteligente Wi-Fi', category: 'Casa', store: 'Smart Home', base: 1799, floor: 1099 },
  { title: 'Ventilador de Torre com Controle', category: 'Casa', store: 'Eletro Lar', base: 349, floor: 189 },
  { title: 'Panela Eletrica de Pressao 6L', category: 'Casa', store: 'Shopee Mall', base: 449, floor: 269 },
  { title: 'Jogo de Paineas Antiaderente 5 Pecas', category: 'Casa', store: 'Casa & Co', base: 329, floor: 169 },
  { title: 'Jogo de Lencol Casal 4 Pecas', category: 'Casa', store: 'Cama Mesa', base: 199, floor: 89 },
  { title: 'Ferro de Passar a Vapor', category: 'Casa', store: 'Eletro Lar', base: 179, floor: 89 },
  { title: 'Purificador de Agua Compacto', category: 'Casa', store: 'Smart Home', base: 599, floor: 349 },
  { title: 'Kit Organizador de Cozinha 8 Pecas', category: 'Casa', store: 'Casa & Co', base: 149, floor: 69 },
  { title: 'Lampada Inteligente RGB Wi-Fi 4un', category: 'Casa', store: 'Smart Home', base: 179, floor: 89 },

  { title: 'Console PlayStation 5 Slim', category: 'Games', store: 'Game World', base: 3999, floor: 3399 },
  { title: 'Controle Sem Fio para Console', category: 'Games', store: 'Game World', base: 449, floor: 249 },
  { title: 'Cadeira Gamer Reclinavel', category: 'Games', store: 'Gamer House', base: 1099, floor: 649 },
  { title: 'Cadeira Gamer RGB com Apoio Lombar', category: 'Games', store: 'Shopee Mall', base: 1399, floor: 849 },
  { title: 'Nintendo Switch OLED', category: 'Games', store: 'Game World', base: 2499, floor: 1999 },
  { title: 'Xbox Series S 512GB', category: 'Games', store: 'Game World', base: 2299, floor: 1799 },
  { title: 'Volante Gamer com Pedais', category: 'Games', store: 'Gamer House', base: 899, floor: 549 },
  { title: 'Mousepad Gamer XXL 90x40', category: 'Games', store: 'Gamer House', base: 99, floor: 39 },
  { title: 'Microfone Condensador USB Streaming', category: 'Games', store: 'Audio Shop', base: 299, floor: 149 },
  { title: 'Jogo AAA Midia Fisica PS5', category: 'Games', store: 'Game World', base: 349, floor: 199 },
  { title: 'Base Carregadora Dupla para Controle', category: 'Games', store: 'Gamer House', base: 149, floor: 69 },
  { title: 'Headset Gamer Wireless 2.4GHz', category: 'Games', store: 'Shopee Oficial', base: 499, floor: 279 },
  { title: 'Teclado Gamer Compacto 60%', category: 'Games', store: 'Gamer House', base: 279, floor: 139 },
  { title: 'Webcam Streaming 1080p 60fps', category: 'Games', store: 'Foto Shop', base: 329, floor: 179 },

  { title: 'Tenis Esportivo Unissex', category: 'Moda', store: 'Sport Life', base: 299, floor: 149 },
  { title: 'Tenis Casual Branco Unissex', category: 'Moda', store: 'Urban Style', base: 249, floor: 119 },
  { title: 'Jaqueta Corta-Vento Impermeavel', category: 'Moda', store: 'Urban Style', base: 259, floor: 129 },
  { title: 'Moletom Canguru Unissex', category: 'Moda', store: 'Urban Style', base: 179, floor: 89 },
  { title: 'Camiseta Algodao Kit 5 Pecas', category: 'Moda', store: 'Basic Wear', base: 149, floor: 79 },
  { title: 'Calca Jeans Skinny Masculina', category: 'Moda', store: 'Jeans House', base: 199, floor: 99 },
  { title: 'Vestido Midi Casual Feminino', category: 'Moda', store: 'Moda Fem', base: 189, floor: 89 },
  { title: 'Bolsa Transversal Couro Sintetico', category: 'Moda', store: 'Moda Fem', base: 159, floor: 79 },
  { title: 'Relogio Analogico Pulseira Couro', category: 'Moda', store: 'Watch Store', base: 229, floor: 99 },
  { title: 'Bone Aba Curva Ajustavel', category: 'Moda', store: 'Sport Life', base: 79, floor: 29 },
  { title: 'Sandalia Ortopedica Conforto', category: 'Moda', store: 'Conforto Pe', base: 149, floor: 69 },
  { title: 'Kit Meias Esportivas 12 Pares', category: 'Moda', store: 'Sport Life', base: 89, floor: 39 },
  { title: 'Oculos de Sol UV400 Polarizado', category: 'Moda', store: 'Urban Style', base: 129, floor: 49 },
  { title: 'Cinto Couro Legitimo Masculino', category: 'Moda', store: 'Jeans House', base: 119, floor: 49 },

  { title: 'Perfume Importado 100ml', category: 'Beleza', store: 'Beauty Prime', base: 459, floor: 279 },
  { title: 'Perfume Nacional Eau de Parfum 75ml', category: 'Beleza', store: 'Beauty Prime', base: 199, floor: 99 },
  { title: 'Kit Skincare Facial Completo', category: 'Beleza', store: 'Beauty Prime', base: 329, floor: 189 },
  { title: 'Protetor Solar FPS 70 120ml', category: 'Beleza', store: 'Dermato Shop', base: 89, floor: 39 },
  { title: 'Secador de Cabelo 2000W Ions', category: 'Beleza', store: 'Hair Store', base: 249, floor: 129 },
  { title: 'Prancha Alisadora Ceramica', category: 'Beleza', store: 'Hair Store', base: 179, floor: 89 },
  { title: 'Kit Maquiagem Completo 24 Itens', category: 'Beleza', store: 'Make Shop', base: 199, floor: 99 },
  { title: 'Paleta de Sombras 18 Cores', category: 'Beleza', store: 'Make Shop', base: 89, floor: 39 },
  { title: 'Shampoo e Condicionador Kit', category: 'Beleza', store: 'Hair Store', base: 79, floor: 39 },
  { title: 'Creme Hidratante Corporal 400ml', category: 'Beleza', store: 'Dermato Shop', base: 69, floor: 29 },
  { title: 'Escova Secadora 4 em 1', category: 'Beleza', store: 'Shopee Oficial', base: 229, floor: 119 },
  { title: 'Depilador Eletrico Recarregavel', category: 'Beleza', store: 'Beauty Prime', base: 159, floor: 79 },
  { title: 'Mascara Facial Kit 20 Unidades', category: 'Beleza', store: 'Dermato Shop', base: 59, floor: 24 },
  { title: 'Oleo Capilar Reparador 100ml', category: 'Beleza', store: 'Hair Store', base: 79, floor: 29 },

  { title: 'Furadeira e Parafusadeira 12V', category: 'Outros', store: 'Ferramentas BR', base: 329, floor: 189 },
  { title: 'Parafusadeira 20V com Kit Bits', category: 'Outros', store: 'Ferramentas BR', base: 449, floor: 249 },
  { title: 'Kit Ferramentas 110 Pecas', category: 'Outros', store: 'Ferramentas BR', base: 199, floor: 99 },
  { title: 'Mala de Viagem 24" com Rodinhas', category: 'Outros', store: 'Travel Shop', base: 349, floor: 179 },
  { title: 'Barraca Camping 4 Pessoas', category: 'Outros', store: 'Outdoor BR', base: 399, floor: 219 },
  { title: 'Bicicleta Aro 29 21 Marchas', category: 'Outros', store: 'Bike Store', base: 1499, floor: 999 },
  { title: 'Patins Inline Ajustavel', category: 'Outros', store: 'Sport Life', base: 299, floor: 149 },
  { title: 'Esteira Eletrica Dobravel', category: 'Outros', store: 'Fitness BR', base: 1899, floor: 1299 },
  { title: 'Halteres Kit 20kg Emborrachado', category: 'Outros', store: 'Fitness BR', base: 249, floor: 129 },
  { title: 'Cama Elastica 2,44m com Rede', category: 'Outros', store: 'Kids Park', base: 899, floor: 549 },
  { title: 'Bebedouro de Agua Eletrico', category: 'Outros', store: 'Eletro Lar', base: 399, floor: 229 },
  { title: 'Extensao Eletrica 5 Tomadas 3m', category: 'Outros', store: 'Ferramentas BR', base: 59, floor: 24 },
  { title: 'Lanterna Tatica Recarregavel', category: 'Outros', store: 'Outdoor BR', base: 89, floor: 39 },
  { title: 'Kit Primeiros Socorros Completo', category: 'Outros', store: 'Saude Shop', base: 79, floor: 39 },
];

const STORES_BY_CATEGORY = {
  Eletronicos: ['Shopee Oficial', 'Shopee Mall', 'Audio Shop', 'Casa Digital', 'Smart Wear'],
  Celulares: ['Mobile Center', 'Shopee Oficial', 'Xiaomi Store', 'Shopee Mall', 'Acessorios BR'],
  Informatica: ['Tech Store BR', 'Hardware BR', 'Gamer House', 'Shopee Mall', 'Office BR'],
  Casa: ['Casa & Co', 'Shopee Oficial', 'Eletro Lar', 'Smart Home', 'Shopee Mall'],
  Games: ['Game World', 'Gamer House', 'Shopee Mall', 'Shopee Oficial', 'Audio Shop'],
  Moda: ['Urban Style', 'Sport Life', 'Moda Fem', 'Jeans House', 'Basic Wear'],
  Beleza: ['Beauty Prime', 'Hair Store', 'Dermato Shop', 'Make Shop', 'Shopee Oficial'],
  Outros: ['Ferramentas BR', 'Fitness BR', 'Outdoor BR', 'Travel Shop', 'Shopee Mall'],
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export const demoSource = {
  id: 'demo',
  name: 'Demonstracao',

  isConfigured() {
    return true;
  },

  async fetchOffers() {
    const items = [];
    const highlighted = new Set(shuffle(CATALOG).slice(0, 18).map((product) => product.title));

    for (const product of CATALOG) {
      const altStores = STORES_BY_CATEGORY[product.category] || [product.store];
      const variants = shuffle([product.store, ...altStores.filter((store) => store !== product.store)]).slice(0, 2);

      variants.forEach((store, index) => {
        const deep = highlighted.has(product.title) && index === 0;
        const price = deep
          ? Math.round(randomBetween(product.floor, product.floor * 1.08) * 100) / 100
          : Math.round(randomBetween(product.floor, product.base * 0.82) * 100) / 100;
        const previous = Math.round(product.base * randomBetween(1.1, 1.4) * 100) / 100;
        const suffix = index === 0 ? '' : `-${index + 1}`;
        const externalId = `demo-${slug(product.title)}${suffix}`;

        items.push({
          source: 'demo',
          external_id: externalId,
          title: product.title,
          description: `Oferta de demonstracao para ${product.title}.`,
          image_url: `/api/placeholder/${encodeURIComponent(externalId)}`,
          price,
          previous_price: previous,
          currency: 'BRL',
          store,
          category: product.category,
          product_url: `https://shopee.com.br/search?keyword=${encodeURIComponent(product.title)}&store=${encodeURIComponent(store)}`,
          affiliate_url: '',
          rating: Math.round(randomBetween(4.1, 5) * 10) / 10,
          sales: Math.floor(randomBetween(80, 12000)),
          raw: { origin: 'demo', generatedAt: new Date().toISOString(), variant: index + 1 },
        });
      });
    }

    return { items, rawCount: items.length, errors: [] };
  },
};

export default demoSource;
