const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery');

const refs = {
  gallery: document.querySelector(".gallery"),
  modal: document.querySelector(".js-lightbox"),
  lightboxImage: document.querySelector("img.lightbox__image"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

const galleryMarkup = ({ preview, original, description }) =>
  `<li class="gallery__item">
      <a
        class="gallery__link"
        href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      >
        <img
          loading="lazy"
          class="gallery__image"
          data-src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;

refs.gallery.insertAdjacentHTML(
  "beforeend",
  galleryItems.map((img) => galleryMarkup(img)).join("")
);

if ("loading" in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js";
  document.body.appendChild(script);
}

const lazyImages = document.querySelectorAll('img[loading="lazy"]');

const onImageLoaded = (e) => {
  e.currentTarget.classList.add("is-loaded");
};

lazyImages.forEach((img) => {
  img.addEventListener("load", onImageLoaded, { once: true });
});

const openModal = (e) => {
  refs.modal.classList.add("is-open");
  refs.lightboxImage.src = e.target.dataset.source;
  refs.lightboxImage.alt = e.target.alt;
};

const closeModal = () => {
  refs.modal.classList.remove("is-open");
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
};

const onOpenOriginalImageClick = (e) => {
  if (e.target.nodeName !== "IMG") {
    return;
  }

  e.preventDefault();
  openModal(e);
};

const onCloseOriginalImageClick = (e) => {
  if (
    e.target === document.querySelector(".lightbox__overlay") ||
    e.target === refs.closeBtn
  ) {
    closeModal();
  }
};

const imgSrcs = galleryItems.map((img) => img.original);

const onGalleryNavBtnPress = (arr) => (e) => {
  if (!document.querySelector(".js-lightbox.is-open")) {
    return;
  }

  let currentIndex = arr.indexOf(refs.lightboxImage.src);

  switch (e.keyCode) {
    case 37:
      refs.lightboxImage.src =
        currentIndex === 0 ? arr[currentIndex] : arr[currentIndex - 1];
      refs.lightboxImage.alt = galleryItems[currentIndex].description;
      break;
    case 39:
      refs.lightboxImage.src =
        currentIndex === arr.length - 1
          ? arr[currentIndex]
          : arr[currentIndex + 1];
      refs.lightboxImage.alt = galleryItems[currentIndex].description;
      break;
    case 27:
      closeModal();
      break;
  }
};

refs.gallery.addEventListener("click", onOpenOriginalImageClick);
refs.modal.addEventListener("click", onCloseOriginalImageClick);
window.addEventListener("keydown", onGalleryNavBtnPress(imgSrcs));



