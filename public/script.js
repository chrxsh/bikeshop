let allProducts = [];

function loadProducts() {
  fetch('/products')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      displayProducts(data);
    });
}

function displayProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.category} - ${p.selling_type}</p>
      <p>Rp ${p.price}</p>
      <button onclick="showDetail(${p.id})">Detail</button>
    `;
    container.appendChild(card);
  });
}

function showDetail(id) {
  fetch(`/products/${id}`)
    .then(res => res.json())
    .then(p => {
      const modal = document.getElementById('modal');
      const content = document.getElementById('modal-content');
      content.innerHTML = `
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <p>Kategori: ${p.category}</p>
        <p>Tipe: ${p.selling_type}</p>
        <p>Rp ${p.price}</p>
      `;
      modal.classList.remove('hidden');
    });
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function loadFilters() {
  const nav = document.getElementById('filters');
  nav.innerHTML = '<button onclick="displayProducts(allProducts)">Semua</button>';

  fetch('/categories')
    .then(res => res.json())
    .then(categories => {
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.name;
        btn.onclick = () => {
          const filtered = allProducts.filter(p => p.category === cat.name);
          displayProducts(filtered);
        };
        nav.appendChild(btn);
      });
    });

  fetch('/selling-types')
    .then(res => res.json())
    .then(types => {
      types.forEach(t => {
        const btn = document.createElement('button');
        btn.textContent = t.name;
        btn.onclick = () => {
          const filtered = allProducts.filter(p => p.selling_type === t.name);
          displayProducts(filtered);
        };
        nav.appendChild(btn);
      });
    });
}

loadFilters();
loadProducts();
