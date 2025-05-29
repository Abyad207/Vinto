document.querySelectorAll('.sidebar nav a').forEach(navItem => {
  navItem.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav a').forEach(el => el.classList.remove('active'));
    navItem.classList.add('active');
  });
});
