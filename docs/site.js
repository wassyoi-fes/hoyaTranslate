document.querySelectorAll('.mascot').forEach((m) => {
  m.addEventListener('click', () => {
    m.classList.add('is-burst');
    clearTimeout(m._burstTimer);
    m._burstTimer = setTimeout(() => m.classList.remove('is-burst'), 700);
  });
});
