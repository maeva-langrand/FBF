
/* Retourne l'ID d'une vidéo YouTube à partir d'une URL
Supporte youtube.com/watch?v=xxx et youtu.be/xxx */
export function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}
