// Theme toggle
document.getElementById('themeIcon').addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const icon = document.getElementById('themeIcon');
  icon.textContent = document.body.classList.contains('dark')
    ? 'dark_mode'
    : 'light_mode';
});

// Bookmark manager
function addBookmark() {
  const name = document.getElementById('bookmarkName').value;
  const url = document.getElementById('bookmarkURL').value;
  const category = document.getElementById('bookmarkCategory').value;

  if (!name || !url) return;

  const list = document.getElementById('bookmarkList');

  const li = document.createElement('li');
  li.className = 'bookmark-item';

  li.innerHTML = `
    <a href="${url}" target="_blank">${name}</a>
    <span class="category-tag">${category}</span>
    <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
  `;

  list.appendChild(li);

  document.getElementById('bookmarkName').value = '';
  document.getElementById('bookmarkURL').value = '';
  document.getElementById('bookmarkCategory').value = '';
}

function filterBookmarks() {
  const filter = document.getElementById('categoryFilter').value;
  const items = document.querySelectorAll('.bookmark-item');

  items.forEach((item) => {
    const tag = item.querySelector('.category-tag').textContent;
    item.style.display = !filter || tag === filter ? 'flex' : 'none';
  });
}

function searchBookmarks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const items = document.querySelectorAll('.bookmark-item');

  items.forEach((item) => {
    const text = item.querySelector('a').textContent.toLowerCase();
    item.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

function exportBookmarks() {
  const items = document.querySelectorAll('.bookmark-item');
  const data = Array.from(items).map((item) => {
    const name = item.querySelector('a').textContent;
    const url = item.querySelector('a').href;
    const category = item.querySelector('.category-tag').textContent;
    return { name, url, category };
  });

  document.getElementById('modalTextarea').value = JSON.stringify(data, null, 2);
  document.getElementById('exportModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('exportModal').style.display = 'none';
}
