/* ══ MENÚ ══ */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navDrawer').classList.toggle('open');
  document.body.style.overflow = document.getElementById('navDrawer').classList.contains('open') ? 'hidden' : '';
}

function irAlModelo() {
  document.getElementById('modelo').scrollIntoView({ behavior: 'smooth' });
}