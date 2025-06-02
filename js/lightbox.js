document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImage = document.createElement('img');
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-nav prev';
    prevButton.innerHTML = '❮';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-nav next';
    nextButton.innerHTML = '❯';
    
    // Append elements
    lightboxContent.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.photo-grid img');
    let currentImageIndex = 0;
    
    // Add click listeners to all gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            lightboxImage.src = img.src;
            lightbox.style.display = 'flex';
            updateNavButtons();
        });
    });
    
    // Close lightbox when clicking close button or outside the image
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation functionality
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(-1);
    });
    
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateImage(-1);
            if (e.key === 'ArrowRight') navigateImage(1);
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    
    function navigateImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }
        lightboxImage.src = galleryImages[currentImageIndex].src;
        updateNavButtons();
    }
    
    function updateNavButtons() {
        prevButton.style.display = galleryImages.length > 1 ? 'block' : 'none';
        nextButton.style.display = galleryImages.length > 1 ? 'block' : 'none';
    }
});
