function asBool(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on', 'sim'].includes(String(value).toLowerCase());
}

function asNumber(value, fallback = null) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function splitList(value) {
  return String(value || '')
    .split(',')
    .map((item) => normalize(item.trim()))
    .filter(Boolean);
}

function isHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value, 'https://local.invalid');
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function isOfficialStore(store) {
  const name = normalize(store);
  return ['oficial', 'official', 'flagship', 'loja oficial', 'mall'].some((token) => name.includes(token));
}

export function buildFilter(settings = {}) {
  return {
    minDiscount: asNumber(settings.minDiscount, 20) || 0,
    maxDiscount: asNumber(settings.maxDiscount, null),
    minPrice: asNumber(settings.minPrice, null),
    maxPrice: asNumber(settings.maxPrice, null),
    minRating: asNumber(settings.minRating, null),
    minSales: asNumber(settings.minSales, 0) || 0,
    officialStoresOnly: asBool(settings.officialStoresOnly, false),
    preferredKeywords: splitList(settings.preferredKeywords),
    preferredStores: splitList(settings.preferredStores),
    requireLink: asBool(settings.requireLink, true),
    requirePrice: asBool(settings.requirePrice, true),
    requireImage: asBool(settings.requireImage, false),
    blockedKeywords: splitList(settings.blockedKeywords),
    allowedCategories: String(settings.allowedCategories || '')
      .split(',')
      .map((category) => category.trim())
      .filter(Boolean),
  };
}

export function buildUserMetrics(raw = {}) {
  return {
    min_price: asNumber(raw.min_price ?? raw.minPrice, null),
    max_price: asNumber(raw.max_price ?? raw.maxPrice, null),
    min_discount: asNumber(raw.min_discount ?? raw.minDiscount, 0) || 0,
    max_discount: asNumber(raw.max_discount ?? raw.maxDiscount, null),
    min_rating: asNumber(raw.min_rating ?? raw.minRating, null),
    min_sales: asNumber(raw.min_sales ?? raw.minSales, 0) || 0,
    official_only: asBool(raw.official_only ?? raw.officialOnly, false) ? 1 : 0,
    keywords: String(raw.keywords || '').trim(),
    blocked_keywords: String(raw.blocked_keywords ?? raw.blockedKeywords ?? '').trim(),
    preferred_stores: String(raw.preferred_stores ?? raw.preferredStores ?? '').trim(),
  };
}

export function evaluateOffer(offer, filter) {
  const reasons = [];
  const title = normalize(offer.title);
  const store = normalize(offer.store);
  const price = Number(offer.price);
  const discount = Number(offer.discount_percent || 0);
  const rating = Number(offer.rating);
  const sales = Number(offer.sales || 0);

  if (!offer.title || offer.title.trim().length < 3) {
    reasons.push('titulo invalido');
  }

  if (filter.requirePrice && !(price > 0)) {
    reasons.push('preco indisponivel');
  }

  if (filter.requireLink && !(isHttpUrl(offer.product_url) || isHttpUrl(offer.affiliate_url))) {
    reasons.push('link indisponivel');
  }

  if (filter.requireImage && !offer.image_url) {
    reasons.push('imagem indisponivel');
  }

  if (filter.minDiscount > 0 && discount < filter.minDiscount) {
    reasons.push(`desconto abaixo do minimo (${filter.minDiscount}%)`);
  }

  if (filter.maxDiscount != null && discount > filter.maxDiscount) {
    reasons.push(`desconto acima do maximo (${filter.maxDiscount}%)`);
  }

  if (filter.minPrice != null && price < filter.minPrice) {
    reasons.push(`preco abaixo da faixa (R$ ${filter.minPrice})`);
  }

  if (filter.maxPrice != null && price > filter.maxPrice) {
    reasons.push(`preco acima da faixa (R$ ${filter.maxPrice})`);
  }

  if (filter.minRating != null && !(rating >= filter.minRating)) {
    reasons.push(`avaliacao abaixo de ${filter.minRating}`);
  }

  if (filter.minSales > 0 && sales < filter.minSales) {
    reasons.push(`vendas abaixo de ${filter.minSales}`);
  }

  if (filter.officialStoresOnly && !isOfficialStore(offer.store)) {
    reasons.push('loja nao oficial');
  }

  if (filter.preferredKeywords.length) {
    const haystack = `${title} ${store} ${normalize(offer.category)}`;
    const matched = filter.preferredKeywords.some((keyword) => haystack.includes(keyword));
    if (!matched) reasons.push('fora das palavras-chave preferidas');
  }

  if (filter.preferredStores.length) {
    const matched = filter.preferredStores.some((name) => store.includes(name));
    if (!matched) reasons.push('loja fora da lista preferida');
  }

  if (filter.blockedKeywords.length) {
    const blocked = filter.blockedKeywords.find((keyword) => title.includes(keyword) || store.includes(keyword));
    if (blocked) reasons.push(`palavra bloqueada: ${blocked}`);
  }

  if (filter.allowedCategories.length) {
    const allowed = filter.allowedCategories.some(
      (category) => normalize(category) === normalize(offer.category),
    );
    if (!allowed) reasons.push(`categoria nao permitida: ${offer.category || 'sem categoria'}`);
  }

  return { ok: reasons.length === 0, reasons };
}

export function evaluateUserMetrics(offer, metrics) {
  if (!metrics) return { ok: true, reasons: [] };
  return evaluateOffer(offer, buildFilter({
    minDiscount: metrics.min_discount,
    maxDiscount: metrics.max_discount,
    minPrice: metrics.min_price,
    maxPrice: metrics.max_price,
    minRating: metrics.min_rating,
    minSales: metrics.min_sales,
    officialStoresOnly: metrics.official_only,
    preferredKeywords: metrics.keywords,
    preferredStores: metrics.preferred_stores,
    blockedKeywords: metrics.blocked_keywords,
    requireLink: false,
    requirePrice: false,
    requireImage: false,
    allowedCategories: '',
  }));
}

export default evaluateOffer;
