const state = {
  category: 'all',
  source: 'all',
  search: '',
  sort: 'recent',
  offset: 0,
  limit: 30,
  total: 0,
  loading: false,
  user: null,
};

const els = {
  messages: document.getElementById('messages'),
  chat: document.getElementById('chat'),
  chips: document.getElementById('chips'),
  searchBar: document.getElementById('search-bar'),
  searchInput: document.getElementById('search-input'),
  clearSearch: document.getElementById('clear-search'),
  toggleSearch: document.getElementById('toggle-search'),
  loadMore: document.getElementById('load-more'),
  empty: document.getElementById('empty-state'),
  typing: document.getElementById('typing'),
  liveDot: document.getElementById('live-dot'),
  footerText: document.getElementById('footer-text'),
  sortSelect: document.getElementById('sort-select'),
  headerStatus: document.getElementById('header-status'),
  logout: document.getElementById('logout'),
  copyToast: document.getElementById('copy-toast'),
  toggleMetrics: document.getElementById('toggle-metrics'),
  metricsPanel: document.getElementById('metrics-panel'),
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatBRL(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 'R$ --';
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function offerMessage(offer) {
  const discount = Number(offer.discount_percent || 0);
  const hasOld = offer.previous_price && Number(offer.previous_price) > Number(offer.price);
  const lines = [
    'Oferta encontrada!',
    offer.title,
    hasOld ? `De ${formatBRL(offer.previous_price)}` : '',
    `Por ${formatBRL(offer.price)}${discount ? ` (${discount}% OFF)` : ''}`,
    offer.store ? `Loja: ${offer.store}` : '',
    offer.category ? `Categoria: ${offer.category}` : '',
    '',
    'Link:',
    '[COLE SEU LINK AQUI]',
  ];
  return lines.filter((line, index) => line !== '' || index > 5).join('\n');
}

function renderOffer(offer) {
  const time = formatTime(offer.captured_at || offer.updated_at);
  const discount = Number(offer.discount_percent || 0);
  const hasOld = offer.previous_price && Number(offer.previous_price) > Number(offer.price);
  const image = offer.image_url || `/api/placeholder/${encodeURIComponent(offer.external_id || offer.id)}`;

  return `
    <article class="message" data-id="${escapeHtml(offer.id)}" data-category="${escapeHtml(offer.category || 'Outros')}" data-search="${escapeHtml(`${offer.title} ${offer.store || ''}`.toLowerCase())}">
      <div class="message-avatar" aria-hidden="true">O</div>
      <div class="bubble">
        <div class="bubble-title">Oferta encontrada!</div>
        <img class="offer-image" src="${escapeHtml(image)}" alt="${escapeHtml(offer.title)}" loading="lazy"
             onerror="this.onerror=null;this.src='/api/placeholder/${encodeURIComponent(offer.external_id || offer.id)}'" />
        <h3 class="offer-title">${escapeHtml(offer.title)}</h3>
        <div class="price-row">
          ${hasOld ? `<span class="price-old">De ${formatBRL(offer.previous_price)}</span>` : ''}
          <span class="price-new">${formatBRL(offer.price)}</span>
          ${discount ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        </div>
        <div class="offer-meta">
          <span class="offer-store">${escapeHtml(offer.store || offer.source || 'Loja')}</span>
          <span class="offer-category">${escapeHtml(offer.category || 'Outros')}</span>
        </div>
        <div class="offer-actions">
          <a class="offer-button" href="${escapeHtml(offer.product_url || offer.offer_url || '#')}" target="_blank" rel="noopener noreferrer">ABRIR NA LOJA</a>
          <button class="copy-button" type="button" data-copy="${escapeHtml(offerMessage(offer))}">Copiar mensagem</button>
        </div>
        <div class="bubble-footer">${time}${offer.featured ? ' • destaque' : ''}</div>
      </div>
    </article>`;
}

function matchesFilters(offer) {
  if (state.category !== 'all' && offer.category !== state.category) return false;
  if (state.source !== 'all' && offer.source !== state.source) return false;
  if (state.search) {
    const haystack = `${offer.title} ${offer.store || ''} ${offer.category || ''}`.toLowerCase();
    if (!haystack.includes(state.search.toLowerCase())) return false;
  }
  return true;
}

async function loadOffers({ reset = false } = {}) {
  if (state.loading) return;
  state.loading = true;
  if (reset) {
    state.offset = 0;
    els.messages.innerHTML = '';
  }
  els.typing.hidden = false;

  const params = new URLSearchParams({
    category: state.category,
    source: state.source,
    search: state.search,
    sort: state.sort,
    limit: String(state.limit),
    offset: String(state.offset),
  });

  try {
    const response = await fetch(`/api/offers?${params.toString()}`, { credentials: 'include' });
    if (response.status === 401 || response.status === 403) {
      window.location.replace('/login.html');
      return;
    }
    const payload = await response.json();
    const offers = payload.data || [];
    state.total = offers.length;

    if (reset) els.messages.innerHTML = '';
    els.messages.insertAdjacentHTML('beforeend', offers.map(renderOffer).join(''));

    state.offset += offers.length;
    els.empty.hidden = !(state.offset === 0);
    els.loadMore.hidden = offers.length < state.limit;
  } catch (error) {
    els.footerText.textContent = 'Falha ao carregar ofertas';
  } finally {
    state.loading = false;
    els.typing.hidden = true;
  }
}

async function loadCategories() {
  try {
    const response = await fetch('/api/categories', { credentials: 'include' });
    if (response.status === 401 || response.status === 403) {
      window.location.replace('/login.html');
      return;
    }
    const payload = await response.json();
    const categories = payload.data || [];
    const chips = [
      `<button class="chip active" data-category="all">Todas</button>`,
      ...categories
        .filter((category) => category.total > 0 || category.id === 'outros')
        .map((category) => `<button class="chip" data-category="${escapeHtml(category.name)}">${escapeHtml(category.name)}<small>${category.total}</small></button>`),
    ];
    els.chips.innerHTML = chips.join('');
    els.chips.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        els.chips.querySelectorAll('.chip').forEach((item) => item.classList.remove('active'));
        chip.classList.add('active');
        state.category = chip.dataset.category;
        loadOffers({ reset: true });
      });
    });
  } catch {
    els.chips.innerHTML = '';
  }
}

let searchTimer = null;
els.searchInput.addEventListener('input', (event) => {
  clearTimeout(searchTimer);
  const value = event.target.value.trim();
  searchTimer = setTimeout(() => {
    state.search = value;
    loadOffers({ reset: true });
  }, 350);
});

els.toggleSearch.addEventListener('click', () => {
  els.searchBar.hidden = !els.searchBar.hidden;
  if (!els.searchBar.hidden) {
    els.metricsPanel.hidden = true;
    els.searchInput.focus();
  }
});

function fillMetrics(metrics) {
  const form = els.metricsPanel;
  if (!form || !metrics) return;
  form.min_price.value = metrics.min_price ?? '';
  form.max_price.value = metrics.max_price ?? '';
  form.min_discount.value = metrics.min_discount || '';
  form.max_discount.value = metrics.max_discount ?? '';
  form.min_rating.value = metrics.min_rating ?? '';
  form.min_sales.value = metrics.min_sales || '';
  form.keywords.value = metrics.keywords || '';
  form.preferred_stores.value = metrics.preferred_stores || '';
  form.blocked_keywords.value = metrics.blocked_keywords || '';
  form.official_only.checked = Boolean(Number(metrics.official_only));
}

async function loadMetrics() {
  const response = await fetch('/api/auth/metrics', { credentials: 'include' });
  if (!response.ok) return;
  const payload = await response.json();
  fillMetrics(payload.data);
}

els.toggleMetrics.addEventListener('click', async () => {
  const opening = els.metricsPanel.hidden;
  els.metricsPanel.hidden = !opening;
  if (opening) {
    els.searchBar.hidden = true;
    await loadMetrics();
  }
});

els.metricsPanel.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const payload = {
    min_price: form.min_price.value,
    max_price: form.max_price.value,
    min_discount: form.min_discount.value,
    max_discount: form.max_discount.value,
    min_rating: form.min_rating.value,
    min_sales: form.min_sales.value,
    keywords: form.keywords.value,
    preferred_stores: form.preferred_stores.value,
    blocked_keywords: form.blocked_keywords.value,
    official_only: form.official_only.checked,
  };
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const response = await fetch('/api/auth/metrics', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok || data.ok === false) throw new Error(data.error || 'Falha ao salvar');
    fillMetrics(data.data);
    showCopyToast('Metricas salvas');
    loadOffers({ reset: true });
  } catch (error) {
    showCopyToast(error.message || 'Nao foi possivel salvar');
  } finally {
    button.disabled = false;
  }
});

els.clearSearch.addEventListener('click', () => {
  els.searchInput.value = '';
  state.search = '';
  loadOffers({ reset: true });
});

els.loadMore.addEventListener('click', () => loadOffers());

els.sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  loadOffers({ reset: true });
});

els.logout.addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  window.location.replace('/login.html');
});

let toastTimer = null;
function showCopyToast(message) {
  els.copyToast.textContent = message;
  els.copyToast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.copyToast.hidden = true;
  }, 1800);
}

els.messages.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    showCopyToast('Mensagem copiada');
  } catch {
    showCopyToast('Nao foi possivel copiar');
  }
});

function connectStream() {
  if (!('EventSource' in window)) return;
  const source = new EventSource('/api/stream');

  source.addEventListener('open', () => {
    els.liveDot.classList.add('online');
    els.footerText.textContent = 'Atualizacao automatica ativa';
  });

  source.addEventListener('error', () => {
    els.liveDot.classList.remove('online');
    els.footerText.textContent = 'Reconectando...';
  });

  source.addEventListener('offer:new', (event) => {
    try {
      const offer = JSON.parse(event.data);
      if (!matchesFilters(offer)) return;
      els.messages.insertAdjacentHTML('afterbegin', renderOffer(offer));
      els.chat.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignora payload invalido
    }
  });

  source.addEventListener('offer:update', (event) => {
    try {
      const offer = JSON.parse(event.data);
      const current = els.messages.querySelector(`[data-id="${offer.id}"]`);
      if (!current) return;
      current.outerHTML = renderOffer(offer);
    } catch {
      // ignora payload invalido
    }
  });

  source.addEventListener('tracker:done', (event) => {
    try {
      const summary = JSON.parse(event.data);
      if (summary.created > 0) {
        els.footerText.textContent = `${summary.created} nova(s) oferta(s) capturada(s)`;
      }
    } catch {
      // ignora payload invalido
    }
  });
}

async function boot() {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'include' });
    if (!response.ok) {
      window.location.replace('/login.html');
      return;
    }
    const payload = await response.json();
    state.user = payload.data?.user;
    if (els.headerStatus && state.user?.name) {
      els.headerStatus.textContent = `ola, ${state.user.name}`;
    }
  } catch {
    window.location.replace('/login.html');
    return;
  }

  loadCategories();
  loadOffers({ reset: true });
  connectStream();
  setInterval(() => {
    if (document.visibilityState === 'visible') loadOffers({ reset: true });
  }, 120000);
}

boot();
