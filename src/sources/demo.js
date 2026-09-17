import { shuffle } from '../lib/random.js';

const PRODUCT_IMAGES = [
  ['smart tv 55', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80'],
  ['smart tv 50', 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=900&q=80'],
  ['smart tv 43', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80'],
  ['soundbar', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'],
  ['caixa de som portatil', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80'],
  ['caixa de som', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'],
  ['headset gamer wireless', 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=80'],
  ['headset gamer', 'https://images.unsplash.com/photo-1599669454699-248dd97f7d31?auto=format&fit=crop&w=900&q=80'],
  ['fone de ouvido', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'],
  ['fone intra', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80'],
  ['echo dot', 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80'],
  ['pulseira inteligente', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80'],
  ['relogio inteligente', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'],
  ['projetor', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'],
  ['carregador portatil', 'https://images.unsplash.com/photo-1609091839311-d5369f4ffb18?auto=format&fit=crop&w=900&q=80'],
  ['webcam 4k', 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80'],
  ['webcam streaming', 'https://images.unsplash.com/photo-1614624532983-4ce03382d458?auto=format&fit=crop&w=900&q=80'],
  ['webcam', 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=80'],
  ['iphone', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80'],
  ['galaxy', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80'],
  ['redmi', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80'],
  ['motorola', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'],
  ['poco', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80'],
  ['smartphone 256', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'],
  ['smartphone', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'],
  ['capinha', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80'],
  ['pelicula', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80'],
  ['carregador turbo', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80'],
  ['suporte veicular', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=900&q=80'],
  ['power bank', 'https://images.unsplash.com/photo-1609091839311-d5369f4ffb18?auto=format&fit=crop&w=900&q=80'],
  ['tripe', 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=900&q=80'],
  ['notebook ryzen', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'],
  ['notebook i3', 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80'],
  ['notebook', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80'],
  ['monitor gamer', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80'],
  ['monitor 27', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=80'],
  ['teclado mecanico', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80'],
  ['teclado gamer', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=900&q=80'],
  ['mouse gamer', 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'],
  ['ssd nvme', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80'],
  ['ssd sata', 'https://images.unsplash.com/photo-1531492746076-161ca2bcad4e?auto=format&fit=crop&w=900&q=80'],
  ['memoria ram', 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=80'],
  ['tablet', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80'],
  ['impressora', 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80'],
  ['hub usb', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=900&q=80'],
  ['cadeira de escritorio', 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80'],
  ['air fryer oven', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80'],
  ['air fryer', 'https://images.unsplash.com/photo-1626804475297-54191f2bb6b3?auto=format&fit=crop&w=900&q=80'],
  ['cafeteira expresso', 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80'],
  ['cafeteira italiana', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'],
  ['liquidificador', 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80'],
  ['aspirador de po', 'https://images.unsplash.com/photo-1558317374-067fb5f30049?auto=format&fit=crop&w=900&q=80'],
  ['robo aspirador', 'https://images.unsplash.com/photo-1603618090561-412154b4e6b4?auto=format&fit=crop&w=900&q=80'],
  ['ventilador', 'https://images.unsplash.com/photo-1565183928296-3482ef1c1c1a?auto=format&fit=crop&w=900&q=80'],
  ['panela eletrica', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80'],
  ['jogo de paineas', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80'],
  ['lencol', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80'],
  ['ferro de passar', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=900&q=80'],
  ['purificador', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80'],
  ['organizador de cozinha', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80'],
  ['lampada inteligente', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80'],
  ['playstation', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80'],
  ['controle sem fio', 'https://images.unsplash.com/photo-1592840496694-26d137cf2d52?auto=format&fit=crop&w=900&q=80'],
  ['cadeira gamer rgb', 'https://images.unsplash.com/photo-1616588588349-b22ae1ade1eb?auto=format&fit=crop&w=900&q=80'],
  ['cadeira gamer', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80'],
  ['nintendo switch', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=80'],
  ['xbox', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=900&q=80'],
  ['volante', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=80'],
  ['mousepad', 'https://images.unsplash.com/photo-1587825147378-4295d2d3d8f2?auto=format&fit=crop&w=900&q=80'],
  ['microfone', 'https://images.unsplash.com/photo-1590602846989-e99596d2a5a2?auto=format&fit=crop&w=900&q=80'],
  ['jogo aaa', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80'],
  ['base carregadora', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=80'],
  ['tenis esportivo', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'],
  ['tenis casual', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80'],
  ['jaqueta', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80'],
  ['moletom', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80'],
  ['camiseta', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'],
  ['calca jeans', 'https://images.unsplash.com/photo-1542272604-787c59578f0d?auto=format&fit=crop&w=900&q=80'],
  ['vestido', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80'],
  ['bolsa', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'],
  ['relogio analogico', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80'],
  ['bone', 'https://images.unsplash.com/photo-1588850561407-42e3f0b5494a?auto=format&fit=crop&w=900&q=80'],
  ['sandalia', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80'],
  ['meias', 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=80'],
  ['oculos de sol', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80'],
  ['cinto', 'https://images.unsplash.com/photo-1624222247344-550fb60529ce?auto=format&fit=crop&w=900&q=80'],
  ['perfume importado', 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'],
  ['perfume nacional', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80'],
  ['skincare', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80'],
  ['protetor solar', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'],
  ['secador', 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=900&q=80'],
  ['prancha', 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80'],
  ['kit maquiagem', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'],
  ['paleta', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'],
  ['shampoo', 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?auto=format&fit=crop&w=900&q=80'],
  ['creme hidratante', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80'],
  ['escova secadora', 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&w=900&q=80'],
  ['depilador', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'],
  ['mascara facial', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80'],
  ['oleo capilar', 'https://images.unsplash.com/photo-1608248543803-ba4f8d86dae9?auto=format&fit=crop&w=900&q=80'],
  ['furadeira', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80'],
  ['parafusadeira', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=80'],
  ['kit ferramentas', 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80'],
  ['mala de viagem', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=900&q=80'],
  ['barraca', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80'],
  ['bicicleta', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=80'],
  ['patins', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80'],
  ['esteira', 'https://images.unsplash.com/photo-1576678927484-e43995a15ad9?auto=format&fit=crop&w=900&q=80'],
  ['halteres', 'https://images.unsplash.com/photo-1576678927484-e43995a15ad9?auto=format&fit=crop&w=900&q=80'],
  ['cama elastica', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80'],
  ['bebedouro', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80'],
  ['extensao', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80'],
  ['lanterna', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80'],
  ['primeiros socorros', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'],
];

function imageFor(title) {
  const normalized = String(title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  for (const [keyword, url] of PRODUCT_IMAGES) {
    if (normalized.includes(keyword)) return url;
  }
  return `https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80`;
}

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
          image_url: imageFor(product.title),
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
