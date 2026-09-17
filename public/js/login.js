const form = document.getElementById('login-form');
const errorEl = document.getElementById('login-error');

async function alreadyLogged() {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'include' });
    if (!response.ok) return;
    const payload = await response.json();
    const user = payload.data?.user;
    if (!user) return;
    window.location.replace(user.role === 'admin' ? '/admin' : '/');
  } catch {
    // permanece na tela de login
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorEl.hidden = true;
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
      errorEl.textContent = payload.error || 'Nao foi possivel entrar.';
      errorEl.hidden = false;
      return;
    }
    const user = payload.data?.user;
    window.location.replace(user?.role === 'admin' ? '/admin' : '/');
  } catch {
    errorEl.textContent = 'Falha de conexao. Tente novamente.';
    errorEl.hidden = false;
  } finally {
    button.disabled = false;
  }
});

alreadyLogged();
