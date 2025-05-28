document.addEventListener('DOMContentLoaded', () => {
  let allProducts = [];
  const productsContainer = document.getElementById('products');
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalCategory = document.getElementById('modal-category');
  const modalSellingType = document.getElementById('modal-selling-type');
  const modalCloseBtn = modal.querySelector('.close-btn');

  async function loadProducts() {
    try {
      const res = await fetch('/product');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      allProducts = await res.json();
      console.log('Loaded products:', allProducts);
      displayProducts(allProducts);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  }

function displayProducts(products) {
  const containersToUpdate = new Set();
  
  products.forEach(p => {
    const mapping = {
      'Mountain Bicycle': 'mountainCards',
      'Road Bicycle': 'roadCards',
      'Folding Bicycle': 'foldingCards'
    };
    const targetId = mapping[p.category];
    if (targetId) {
      containersToUpdate.add(targetId);
    }
  });
  
  // Only clear the containers that will be updated
  containersToUpdate.forEach(id => {
    document.getElementById(id).innerHTML = '';
  });


  products.forEach(p => {
    const mapping = {
      'Mountain Bicycle': 'mountainCards',
      'Road Bicycle': 'roadCards',
      'Folding Bicycle': 'foldingCards'
    };
    const targetId = mapping[p.category];
    if (!targetId) {
      console.warn(`No matching container for category: ${p.category}`);
      return;
    }

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = p.id;
    card.innerHTML = `
     <div class="image-wrapper">
         <img src="${p.image}" alt="${p.name}" class="product-img" />
      </div>
      <h3>${p.name}</h3>
      <p>${p.category} - ${p.selling_type}</p>
      <p>Rp ${p.price}</p>
      <button class="detail-btn">Detail</button>
    `;

    document.getElementById(targetId).appendChild(card);
  });
}

  function filterByCategoryAndSellingType(category, sellingType) {
    let filtered = allProducts.filter(p => p.category === category);
    if (sellingType !== 'All') {
      filtered = filtered.filter(p => p.selling_type === sellingType);
    }
    displayProducts(filtered);
}

  function setupFilterListeners() {
    const filterMappings = {
      mountainFilter: 'Mountain Bicycle',
      roadFilter: 'Road Bicycle',
      foldingFilter: 'Folding Bicycle'
    };

    Object.entries(filterMappings).forEach(([selectId, category]) => {
      const selectEl = document.getElementById(selectId);
      if (selectEl) {
        selectEl.addEventListener('change', e => {
          filterByCategoryAndSellingType(category, e.target.value);
        });
      }
    });
  }

  function showModal(product) {
    document.body.classList.add('modal-open');
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `Rp ${product.price}`;
    modalCategory.textContent = `Category: ${product.category}`;
    modalSellingType.textContent = `Selling Type: ${product.selling_type}`;
    modal.classList.remove('hidden');
    
  }

  function closeModal() {
    document.body.classList.remove('modal-open');
    modal.classList.add('hidden');
    
  }

  productsContainer.addEventListener('click', async e => {
    if (e.target.classList.contains('detail-btn')) {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      try {
        const res = await fetch(`/product/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const product = await res.json();
        showModal(product);
      } catch (err) {
        console.error('Failed to load product details:', err);
      }
    }
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  setupFilterListeners();
  loadProducts();
});
