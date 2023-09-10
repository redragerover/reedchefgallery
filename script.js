let currentPage = 1;
const itemsPerPage = 12; 

async function fetchImages() {
    const response = await fetch('images.json');
    const data = await response.json();
    return data;
}

function renderGallery(images, page) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    images.slice(startIndex, endIndex).forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.loading = 'lazy';
        gallery.appendChild(img);
    });
}

function updatePagination(images, page) {
    const totalPages = Math.ceil(images.length / itemsPerPage);
    
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    prevButton.disabled = page === 1;
    nextButton.disabled = page >= totalPages;

    prevButton.onclick = () => {
        currentPage = Math.max(1, page - 1);
        renderGallery(images, currentPage);
        updatePagination(images, currentPage);
    };

    nextButton.onclick = () => {
        currentPage = Math.min(totalPages, page + 1);
        renderGallery(images, currentPage);
        updatePagination(images, currentPage);
    };
    
    const pageInput = document.getElementById('page-input');
    pageInput.onchange = () => {
        const inputPage = parseInt(pageInput.value);
        if (inputPage >= 1 && inputPage <= totalPages) {
            currentPage = inputPage;
            renderGallery(images, currentPage);
            updatePagination(images, currentPage);
        } else {
            alert('Invalid page number');
        }
    };
}

fetchImages().then(images => {
    renderGallery(images, currentPage);
    updatePagination(images, currentPage);
});
