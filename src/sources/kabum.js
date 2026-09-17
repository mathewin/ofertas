import config from '../config.js';
import { toNumber } from '../lib/util.js';

const SEARCHES = [
  { keyword: 'smart tv', category: 'Eletronicos' },
  { keyword: 'soundbar', category: 'Eletronicos' },
  { keyword: 'fone bluetooth', category: 'Eletronicos' },
  { keyword: 'smartphone', category: 'Celulares' },
  { keyword: 'iphone', category: 'Celulares' },
  { keyword: 'carregador turbo', category: 'Celulares' },
  { keyword: 'notebook', category: 'Informatica' },
  { keyword: 'monitor gamer', category: 'Informatica' },
  { keyword: 'ssd', category: 'Informatica' },
  { keyword: 'air fryer', category: 'Casa' },
  { keyword: 'cafeteira', category: 'Casa' },
  { keyword: 'aspirador', category: 'Casa' },
  { keyword: 'playstation', category: 'Games' },
  { keyword: 'xbox', category: 'Games' },
  { keyword: 'cadeira gamer', category: 'Games' },
  { keyword: 'tenis', category: 'Moda' },
  { keyword: 'relogio', category: 'Moda' },
  { keyword: 'perfume', category: 'Beleza' },
  { keyword: 'furadeira', category: 'Outros' },
  { keyword: 'bicicleta', category: 'Outros' },
];

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
};

function productUrl(product) {
  if (product.externalUrl) return product.externalUrl;
  const slug = product.friendlyName || String(product.code);
  return `https://www.kabum.com.br/produto/${product.code}/${slug}`;
}

function productImage(product) {
  return (
    product.image ||
    product.thumbnail ||
    product.images?.[0] ||
    product.photos?.m?.[0] ||
    ''
  );
}

function normalizeProduct(product, fallbackCategory) {
  const code = product?.code;
  if (!code) return null;

  const price = toNumber(product.priceWithDiscount ?? product.price);
  if (price === null || price <= 0) return null;

  const previous = toNumber(product.oldPrice ?? product.price);
  const image = productImage(product);
  const url = productUrl(product);
  if (!image || !url) return null;

  return {
    source: 'kabum',
    external_id: String(code),
    title: product.name || `Produto ${code}`,
    description: product.tagDescription || product.description || '',
    image_url: image,
    price,
    previous_price: previous && previous > price ? previous : null,
    currency: 'BRL',
    store: product.sellerName || 'KaBuM!',
    category: fallbackCategory,
    product_url: url,
    affiliate_url: '',
    rating: toNumber(product.averageRating ?? product.rating),
    sales: toNumber(product.ratingCount) || 0,
    raw: {
      code,
      category: product.category || fallbackCategory,
      manufacturer: product.manufacturer?.name || '',
    },
  };
}

function extractCatalog(html) {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!match) return [];
  const page = JSON.parse(match[1]);
  const raw = page?.props?.pageProps?.data;
  const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  return data?.catalogServer?.data || [];
}

async function fetchSearch(keyword) {
  const url = `https://www.kabum.com.br/busca/${encodeURIComponent(keyword)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { headers: HEADERS, signal: controller.signal });
    const html = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return extractCatalog(html);
  } finally {
    clearTimeout(timer);
  }
}

export const kabumSource = {
  id: 'kabum',
  name: 'KaBuM!',

  isConfigured() {
    return config.sources.kabum.enabled;
  },

  async fetchOffers() {
    const items = [];
    const errors = [];
    const seen = new Set();
    const perSearch = 18;

    for (const search of SEARCHES) {
      try {
        const products = await fetchSearch(search.keyword);
        let added = 0;
        for (const product of products) {
          if (added >= perSearch) break;
          const normalized = normalizeProduct(product, search.category);
          if (!normalized || seen.has(normalized.external_id)) continue;
          seen.add(normalized.external_id);
          items.push(normalized);
          added += 1;
        }
      } catch (error) {
        errors.push(`KaBuM [${search.keyword}]: ${error.message}`);
      }
    }

    return { items, rawCount: items.length, errors };
  },
};

export default kabumSource;
