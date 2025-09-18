// src/components/VideoModal.js
import React, { useEffect } from "react";


function getTikTokId(url) {
  try {
    // TikTok URLs typically end with /video/<id>
    const parts = url.split("/").filter(Boolean);
    const idx = parts.findIndex(p => p === "video");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    // fallback: last segment
    return parts[parts.length - 1];
  } catch {
    return null;
  }
}

export default function VideoModal({ videoUrl, onClose }) {
  useEffect(() => {
    // append TikTok embed script (only once)
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
      return () => { /* don't remove script globally in case other modals use it */ };
    }
  }, []);

  const videoId = getTikTokId(videoUrl);

  return (
    <div className="video-modal">
      <div className="modal-inner">
        <button className="close" onClick={onClose}>×</button>

        {/* TikTok embed markup */}
        <blockquote
          className="tiktok-embed"
          cite={videoUrl}
          data-video-id={videoId}
          style={{ maxWidth: 560, margin: "0 auto" }}
        >
          <a href={videoUrl}>Watch on TikTok</a>
        </blockquote>

        {/* fallback link */}
        <p style={{ marginTop: 8, fontSize: 14 }}>
          If the video doesn't load, <a href={videoUrl} target="_blank" rel="noreferrer">open on TikTok</a>.
        </p>
      </div>
    </div>
  );
}
