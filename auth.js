// Simple client-side password check using SHA-256.
// IMPORTANT: This is NOT fully secure — anyone can view the repo and attempt offline attacks.
// For stronger protection use server-side checks or host-provided access controls.

// Replace this value with the SHA-256 hex digest of your chosen password.
// Example (Linux/macOS): echo -n "mypassword" | sha256sum
const PASSWORD_HASH = "87f55b40666e20d4131bacc9c439f6efe619a460dbf4fb9d888666161cec02fe";

async function sha256hex(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function setAuthCookie() {
  const days = 30;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `gallery_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function showError(msg) {
  const el = document.getElementById('error');
  el.textContent = msg; el.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = document.getElementById('passwordInput').value || '';
    if (!pw) return showError('Please enter a password');
    if (PASSWORD_HASH === 'REPLACE_WITH_SHA256_HASH') return showError('Password not configured. Edit auth.js and set PASSWORD_HASH.');
    const h = await sha256hex(pw);
    if (h === PASSWORD_HASH) {
      setAuthCookie();
      window.location.href = 'gallery.html';
    } else {
      showError('Incorrect password');
    }
  });
});

// Optional helper: a small client-side function to compute SHA-256 from console if you want to generate the hash quickly in-browser.
window._computeHash = async (text) => await sha256hex(text);
