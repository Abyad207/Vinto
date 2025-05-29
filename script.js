document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-bar li');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked nav item
      item.classList.add('active');

      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));
      // Show the selected section
      const selectedSection = document.getElementById(item.dataset.section);
      selectedSection.classList.add('active');
    });
  });
});
