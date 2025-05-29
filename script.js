document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-bar li');
  const sections = document.querySelectorAll('.content-section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      sections.forEach(section => section.classList.remove('active'));
      const selectedSection = document.getElementById(item.dataset.section);
      selectedSection.classList.add('active');

      switch(item.dataset.section) {
        case 'home':
          loadHomePosts();
          break;
        case 'explore':
          loadExplore();
          break;
        case 'create':
          loadCreate();
          break;
        case 'notifications':
          loadNotifications();
          break;
        case 'saved':
          loadSavedPosts();
          break;
        case 'profile':
          updateProfile();
          break;
      }
    });
  });

  loadHomePosts();
});

const samplePosts = [
  { id: 1, content: 'Post 1 content' },
  { id: 2, content: 'Post 2 content' },
  { id: 3, content: 'Post 3 content' }
];

const sampleNotifications = [
  'You have a new follower!',
  'Your post was liked!',
  'New comment on your post.'
];

function loadHomePosts() {
  const homePostsContainer = document.getElementById('home-posts');
  homePostsContainer.innerHTML = '';
  samplePosts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <p>${post.content}</p>
      <button class="save-btn" onclick="savePost(${post.id})">Save</button>
    `;
    homePostsContainer.appendChild(postDiv);
  });
}

function loadExplore() {
  const explore = document.getElementById('explore-posts');
  explore.innerHTML = '';
  const explorePosts = [...samplePosts].reverse();
  explorePosts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.textContent = post.content;
    explore.appendChild(div);
  });
}

function loadCreate() {
  document.getElementById('uploadInput').value = '';
  document.getElementById('newPostText').value = '';
  document.getElementById('previewArea').innerHTML = '';
}

document.addEventListener('change', function (e) {
  if (e.target && e.target.id === 'uploadInput') {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('previewArea').innerHTML = `<img src="${e.target.result}" alt="Preview"/>`;
      };
      reader.readAsDataURL(file);
    }
  }
});

function addNewPost() {
  const text = document.getElementById('newPostText').value.trim();
  const image = document.getElementById('previewArea').querySelector('img');
  if (!text || !image) {
    alert('Add both image and text!');
    return;
  }

  const newPost = {
    id: Date.now(),
    content: `${text} [image uploaded]`
  };

  samplePosts.unshift(newPost);
  alert('Post created!');
  loadHomePosts();
  document.querySelector('[data-section="home"]').click();
}

function loadNotifications() {
  const notificationsContainer = document.getElementById('notifications-list');
  notificationsContainer.innerHTML = '';
  sampleNotifications.forEach(notification => {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'notification';
    notificationDiv.textContent = notification;
    notificationsContainer.appendChild(notificationDiv);
  });
}

function savePost(postId) {
  const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
  const postToSave = samplePosts.find(post => post.id === postId);
  if (postToSave && !savedPosts.some(post => post.id === postId)) {
    savedPosts.push(postToSave);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    alert('Post saved!');
  } else {
    alert('Post already saved.');
  }
}

function loadSavedPosts() {
  const savedPostsContainer = document.getElementById('saved-posts');
  savedPostsContainer.innerHTML = '';
  const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
  if (savedPosts.length === 0) {
    savedPostsContainer.innerHTML = '<p>No saved posts.</p>';
    return;
  }
  savedPosts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'saved-item';
    postDiv.textContent = post.content;
    savedPostsContainer.appendChild(postDiv);
  });
}

function updateProfile() {
  const postCount = samplePosts.length;
  document.getElementById('post-count').textContent = postCount;
}
