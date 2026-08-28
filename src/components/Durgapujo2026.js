import React from "react";
import durgapuja26 from "../assets/durgapuja26.mp4";
import "./Durgapujo2026.css";

function Durgapujo2026() {
  return (
    <div className="pujo26-page">

      {/* Two-column section */}
      <div className="pujo26-body">
        <div className="pujo26-left">
          <span className="pujo26-tag">Coming Soon</span>
          <h2 className="pujo26-section-title">Celebrating Durga Puja in the Heart of Erlangen</h2>
          <p className="pujo26-text">
            Every autumn, Durgaville brings the magic of Durga Puja to Erlangen - a vibrant
            celebration of culture, community, and devotion that unites the Bengalis, Indians, and above all, every human out there across Franconia and beyond.
          </p>
          <p className="pujo26-text">
            Sharod Utsav 2026 will once again be a festival for everyone - filled with
            dhak beats, traditional rituals, cultural performances, delicious food, and
            joyful gatherings that carry the warmth of home.
          </p>
          <p className="pujo26-text">
            We are hard at work crafting an unforgettable experience. Dates, venue, and
            programme details will be announced soon. Watch this space!
          </p>

          <div className="pujo26-highlights">
            <div className="pujo26-highlight-item">
              <span className="pujo26-highlight-icon">🎶</span>
              <span>Cultural Performances</span>
            </div>
            <div className="pujo26-highlight-item">
              <span className="pujo26-highlight-icon">🪔</span>
              <span>Traditional Rituals</span>
            </div>
            <div className="pujo26-highlight-item">
              <span className="pujo26-highlight-icon">🍛</span>
              <span>Festive Food</span>
            </div>
            <div className="pujo26-highlight-item">
              <span className="pujo26-highlight-icon">🤝</span>
              <span>Community Togetherness</span>
            </div>
          </div>
        </div>

        <div className="pujo26-right">
          <div className="pujo26-reel-frame">
            <div className="pujo26-reel-container">
              <video
                src={durgapuja26}
                autoPlay
                loop
                muted
                playsInline
                className="pujo26-reel-video"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Durgapujo2026;
