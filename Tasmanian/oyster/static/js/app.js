// Nav Links Active State
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove('border-b-3', 'border-primary', 'transition', 'ease-in-out', 'duration-300'));

    // Add active class to the clicked link
    link.classList.add('border-b-3', 'border-primary', 'transition', 'ease-in-out', 'duration-300');
  });
});

// Autoplay Video pause of "data-to" attribute second.
const videoBanners = document.querySelectorAll('.banner-videos');

videoBanners.forEach((videoBanner) => {
  videoBanner.addEventListener("timeupdate", function () {
    if (this.dataset.to && this.currentTime >= parseInt(this.dataset.to)) {
      this.pause();
    }
  });
});

// Add Nav-Bar Background Color on Scroll
const navBarContainer = document.getElementById("nav-bar-container");

window.onscroll = function () {
  if (window.scrollY >= 100) {
    navBarContainer?.classList.add("bg-dark");
    navBarContainer?.classList.add("!text-white");
  } else {
    navBarContainer?.classList.remove("bg-dark");
    navBarContainer?.classList.remove("!text-white");
  }
}

// Custom Range Slider Logic for Boomer Bay
const customRangeSliders = document.querySelectorAll('.custom-range-slider');
const activeStepClasses = ["!outline-teal-600", "!outline-4", "shadow-lg", "shadow-dark-secondary"];

function setRangeStepStyle(element) {
  const value = element.value;
  const steps = element.parentElement.querySelectorAll(".custom-range-step");
  steps.forEach((s) => s.classList.remove(...activeStepClasses));

  const stepAt = element.parentElement.querySelectorAll(".custom-range-step")[parseInt(value) - 1];
  if (stepAt) {
    stepAt.classList.add(...activeStepClasses);
  }
}

customRangeSliders.forEach((rangeSlider) => {
  setRangeStepStyle(rangeSlider)

  rangeSlider.addEventListener("change", (event) => {
    if (event.target) {
      setRangeStepStyle(event.target)
    }
  });
});

// Video Player Modal (Open and Close)
const openVideoPlayer = function (videoId, label) {
  const videoPlayerEmbedFrame = document.querySelector("#video-player-embed");
  if (videoPlayerEmbedFrame) videoPlayerEmbedFrame.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}`);

  const videoPlayerLabel = document.querySelector("#video-player-label");
  if (videoPlayerLabel) videoPlayerLabel.innerText = label;

  document.querySelector(".video-player-container")?.classList.remove("!hidden");
}

const closeVideoPlayer = function (elem) {
  const videoPlayerEmbedFrame = document.querySelector("#video-player-embed");
  if (videoPlayerEmbedFrame) videoPlayerEmbedFrame.removeAttribute("src");

  elem.classList.add("!hidden");
}

const videoPlayerOverlays = document.querySelectorAll(".video-player-overlay");
videoPlayerOverlays.forEach((vpo) => vpo.addEventListener('click', (e) => closeVideoPlayer(e.target.parentElement)));

// YouTube Video Search API
const searchYouTube = async function (query, limit = 5) {
  if (!query || query === "") {
    return null;
  }

  const API_KEY = "AIzaSyCtDkp4i-IEkiCgibNAVrUcNJLp7LS0o7k";
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${query}&type=video&key=${API_KEY}`;

  const response = await fetch(url);
  return await response.json();
}

const searchResultContainer = document.querySelector("#search-results");
const renderSearchResult = function (items =[], errorMessage) {
  if (!searchResultContainer) return;

  searchResultContainer.innerHTML = "";

  if (!items && errorMessage) {
    searchResultContainer.innerHTML = `<span> ${errorMessage || "No Search Result"}</span>`;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const div = document.createElement("div");
    div.innerHTML = `<a href="https://youtu.be/${item.id.videoId}" data-video-id="${item.id.videoId}" data-video-label="${item.snippet.description}" target="_blank" rel="noopener"
      class="flex items-center justify-between gap-1.5 search-result-item px-1 py-1.5 hover:bg-gray-800 transition-colors rounded-md cursor-pointer video-player-links">
      <div class="w-1/6 overflow-hidden rounded-md">
        <img src="${item.snippet.thumbnails.medium.url}" class="object-cover w-full h-full" />
      </div>
      <div class="w-5/6">
        <p class="text-sm">${item.snippet.title}</p>
        <p class="text-xs">${item.snippet.channelTitle} • ${new Date(item.snippet.publishedAt).toDateString()}</p>
      </div>
    </a>`;
    searchResultContainer.appendChild(div);
  }

  const videoPlayerLinks = document.querySelectorAll(".video-player-links");
  videoPlayerLinks.forEach((vpo) =>
    vpo.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoPlayer(e.currentTarget.dataset.videoId, e.currentTarget.dataset.videoLabel)
    })
  );
}

// Search Handler
const searchInput = document.querySelector("#search-input");
let searchThrottle = null;

if (searchInput) {
  searchInput.addEventListener("keyup", async (event) => {
    if (searchThrottle) clearTimeout(searchThrottle);

    searchThrottle = setTimeout(async () => {
      const result = await searchYouTube(event.target.value);
      const errorList = result?.error?.errors;
      const isError = errorList?.length;
      renderSearchResult(result ? result.items : [], isError ? errorList[0]?.message : null);
    }, 300);
  });
}




const videoContainers = document.querySelectorAll('.videoPlayer');

    videoContainers.forEach(container => {
        const video = container.querySelector('video');

        container.addEventListener('mouseenter', () => {
            video.play();
        });

        container.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });