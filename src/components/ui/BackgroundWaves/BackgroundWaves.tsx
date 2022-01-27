import "./BackgroundWaves.scss";
import React from "react";
const TAG = "BACKGROUNDWAVES";
type BackgroundWavesProps = {
  prop1?: any;
};
const BackgroundWaves: React.FC<BackgroundWavesProps> = ({ prop1 }) => {
  console.log(TAG, "render");
  return (
    <div className="BackgroundWaves">
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div
            className="wave waveTop"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-top.png')",
            }}
          ></div>
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div
            className="wave waveMiddle"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-mid.png')",
            }}
          ></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div
            className="wave waveBottom"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-bot.png')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default BackgroundWaves;
