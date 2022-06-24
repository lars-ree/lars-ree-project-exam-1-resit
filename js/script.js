const access_key = "sYoUMawzOY5bv-nXDaU-zLmM1Hb6LVW2Xv_B2epudkU";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;

let allImages; // this will store all the images

const getImages = () => {
  fetch(random_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data;
      makeImages(allImages);
    });
};

const gallery = document.querySelector(".gallery");

function makeImages(data) {
  data.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "gallery-img";

    gallery.appendChild(img);
  });
}

getImages();

let currentImage = 0; // will track the current large image

const showPopup = (item) => {
  let popup = document.querySelector(".image-popup");
  const downloadBtn = document.querySelector(".download-btn");
  const closeBtn = document.querySelector(".close-btn");
  const image = document.querySelector(".large-img");

  popup.classList.remove("hide");
  downloadBtn.href = item.links.html;
  image.src = item.urls.regular;

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hide");
  });
};

// controls

const preBtns = document.querySelector(".pre-btn");
const nxtBtns = document.querySelector(".nxt-btn");

preBtns.addEventListener("click", () => {
  if (currentImage > 0) {
    currentImage--;
    showPopup(allImages[currentImage]);
  }
});

nxtBtns.addEventListener("click", () => {
  if (currentImage < allImages.length - 1) {
    currentImage++;
    showPopup(allImages[currentImage]);
  }
});

let searchParam = location.search.split("=").pop(); // this will give extract the search keyword from URL

const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`; // this is search image URL

const searchImages = () => {
  fetch(search_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
      console.log(data);
    });
};

if (searchParam == "") {
  getImages();
} else {
  searchImages();
}
