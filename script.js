document.querySelectorAll('.sidebar nav a').forEach(navItem => {
  navItem.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav a').forEach(el => el.classList.remove('active'));
    navItem.classList.add('active');
  });
});

function toggleModal() {
  document.getElementById('createPostModal').classList.toggle('hidden');
}

function updateCharCount() {
  const caption = document.getElementById('caption');
  document.getElementById('charCount').innerText = caption.value.length;
}

function setMainImage(src) {
  document.getElementById('mainPreview').src = src;
}
