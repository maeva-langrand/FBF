// youtube-helper.js

// Extrait l'ID d'une vidéo YouTube depuis l'URL
export function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// Crée un iframe YouTube dans le container
export function createYoutubePlayer(container, card) {
    const videoId = getYouTubeId(card.youtube_url);
    if (!videoId) return;

    const start = card.youtube_start || 0;
    const end = card.youtube_end || "";

    const iframe = document.createElement("iframe");
    iframe.width = "600";
    iframe.height = "340";
    iframe.src = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&mute=0&playsinline=1`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    container.appendChild(iframe);
}
