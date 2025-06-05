// Page navigation
// const pages = {
//   home: document.getElementById("home-page"),
//   how: document.getElementById("how-it-works-page"),
//   features: document.getElementById("features-page"),
//   faq: document.getElementById("faq-page"),
// };

// Navigation elements
// const navLinks = {
//   home: document.getElementById("home-nav"),
//   how: document.getElementById("how-it-works-nav"),
//   features: document.getElementById("features-nav"),
//   faq: document.getElementById("faq-nav"),
// };

// Footer links
// const footerLinks = {
//   home: document.getElementById("footer-home"),
//   how: document.getElementById("footer-how"),
//   features: document.getElementById("footer-features"),
//   faq: document.getElementById("footer-faq"),
// };

// Home link
const homeLink = document.getElementById("home-link");

// Navigation buttons
// const homeButtons = [
//   document.getElementById("how-to-home-btn"),
//   document.getElementById("features-to-home-btn"),
//   document.getElementById("faq-to-home-btn"),
// ];

// Function to show a page
function showPage(pageName) {
  // Hide all pages
  Object.values(pages).forEach((page) => (page.style.display = "none"));

  // Show the requested page
  pages[pageName].style.display = "block";

  // Show navigation buttons on non-home pages
  document.querySelector(".page-navigation").style.display =
    pageName === "home" ? "none" : "flex";
}

// Set up event listeners
// function setupNavigation() {
//   // Main navigation
//   navLinks.home.addEventListener("click", () => showPage("home"));
//   navLinks.how.addEventListener("click", () => showPage("how"));
//   navLinks.features.addEventListener("click", () => showPage("features"));
//   navLinks.faq.addEventListener("click", () => showPage("faq"));

//   // Footer navigation
//   footerLinks.home.addEventListener("click", () => showPage("home"));
//   footerLinks.how.addEventListener("click", () => showPage("how"));
//   footerLinks.features.addEventListener("click", () => showPage("features"));
//   footerLinks.faq.addEventListener("click", () => showPage("faq"));

//   // Home link
//   homeLink.addEventListener("click", () => showPage("home"));

//   // Home buttons on other pages
//   homeButtons.forEach((btn) => {
//     if (btn) btn.addEventListener("click", () => showPage("home"));
//   });
// }

// Video download functionality
document.getElementById("fetch-btn").addEventListener("click", function () {
  const urlInput = document.getElementById("video-url").value;

  if (urlInput) {
    // Show the preview section
    document.getElementById("preview-section").style.display = "block";

    // Update video info based on URL
    const videoId = extractVideoId(urlInput);
    if (videoId) {
      // In a real app, we would fetch video info from a backend
      // For this demo, we'll simulate with sample data
      updateVideoInfo({
        title: `Video Title for ${videoId}`,
        author: "Sample Channel",
        duration: "10:25",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        description:
          "This is a sample video description. In a real application, this would be fetched from YouTube.",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      });
    }

    // Scroll to the preview section
    document.getElementById("preview-section").scrollIntoView({
      behavior: "smooth",
    });
  } else {
    alert("Please enter a YouTube URL");
  }
});

// New video button functionality
document.getElementById("new-video-btn").addEventListener("click", function () {
  document.getElementById("video-url").value = "";
  document.getElementById("preview-section").style.display = "none";
  document.getElementById("video-url").focus();
});

// Option selection functionality
const optionButtons = document.querySelectorAll(".option-btn");
optionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    optionButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

// Download button functionality
document
  .getElementById("download-now-btn")
  .addEventListener("click", function () {
    const selectedFormat =
      document.querySelector(".option-btn.active").dataset.format;
    const videoUrl = document.getElementById("video-url").value;
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    // In a real application, this would call a backend service
    // For this demo, we'll simulate download with a sample file

    // Filename based on format
    let filename = `youtube_video_${videoId}`;
    if (selectedFormat === "mp3") {
      filename += ".mp3";
    } else {
      filename += ".mp4";
    }

    // Create a sample file to download
    const sampleContent =
      "This is a simulated download. In a real application, this would be the actual video content.";
    const blob = new Blob([sampleContent], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger click
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  });

// FAQ toggle functionality
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Helper function to extract YouTube video ID
function extractVideoId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// Update video info in preview
function updateVideoInfo(info) {
  document.getElementById("video-title").textContent = info.title;
  document.getElementById("video-author").textContent = info.author;
  document.getElementById("video-duration").textContent = info.duration;
  document.getElementById("video-date").textContent = info.date;
  document.getElementById("video-description").textContent = info.description;

  // Set thumbnail background image
  const thumbnail = document.getElementById("video-thumbnail");
  thumbnail.style.backgroundImage = `url('${info.thumbnail}')`;
  thumbnail.innerHTML =
    '<i class="fas fa-play-circle" style="font-size: 60px; text-shadow: 0 0 10px rgba(0,0,0,0.5);"></i>';
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();

  // Show home page by default
  // showPage("home");

  // Sample video data for demo
  const sampleVideo = {
    title: "How to Build a Modern Website - Complete Tutorial",
    author: "Web Dev Tutorials",
    duration: "15:42",
    date: "Jun 15, 2023",
    description:
      "In this comprehensive tutorial, you'll learn how to build a responsive, modern website from scratch using HTML, CSS, and JavaScript.",
    thumbnail: "https://i.ytimg.com/vi/abc123/maxresdefault.jpg",
  };

  // Set sample video for demo purposes
  updateVideoInfo(sampleVideo);
});
