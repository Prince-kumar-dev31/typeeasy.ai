import React, { useRef, useState, useEffect } from 'react';
import { Camera, Check, ShieldCheck, Eye, AlertCircle } from 'lucide-react';

export default function CameraCard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hint, setHint] = useState('Camera access is optional · 100% in-browser processing');
  const [postureStatus, setPostureStatus] = useState('good'); // 'good' | 'slouching'
  const [postureMessage, setPostureMessage] = useState('Sit tall with eyes level to monitor');

  const enable = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setEnabled(true);
      setHint('Local posture check active · Zero video data leaves this browser');
      setPostureMessage('Good Posture ✓ Head aligned and centered');
    } catch (err) {
      setEnabled(false);
      setHint('Camera access denied or unavailable · TypeEasy continues normally');
    }
  };

  // In-browser posture heuristic sampler
  useEffect(() => {
    if (!enabled) return;

    let animId;
    let baselineY = null;

    const checkPosture = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && video.readyState >= 2 && canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, 80, 60);
          const frame = ctx.getImageData(0, 0, 80, 60);
          const data = frame.data;

          // Compute vertical center of brightness/contrast (estimating head centroid)
          let totalMass = 0;
          let weightedY = 0;

          for (let y = 0; y < 60; y++) {
            for (let x = 0; x < 80; x++) {
              const idx = (y * 80 + x) * 4;
              const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
              if (brightness > 45) {
                totalMass += brightness;
                weightedY += y * brightness;
              }
            }
          }

          if (totalMass > 0) {
            const centroidY = weightedY / totalMass;
            if (baselineY === null) {
              baselineY = centroidY;
            } else {
              // Smooth baseline
              baselineY = baselineY * 0.98 + centroidY * 0.02;

              // If head dips significantly downward compared to baseline (slouching)
              if (centroidY > baselineY + 3.8) {
                setPostureStatus('slouching');
                setPostureMessage('Slouching Detected — Lift chin & straighten spine');
              } else {
                setPostureStatus('good');
                setPostureMessage('Good Posture ✓ Head upright and centered');
              }
            }
          }
        }
      }
      animId = setTimeout(checkPosture, 1000);
    };

    animId = setTimeout(checkPosture, 1500);

    return () => {
      clearTimeout(animId);
    };
  }, [enabled]);

  // Clean up media tracks on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <section className="feature-card camera-card" data-testid="camera-card">
      <div className="card-heading">
        <div>
          <div className="eyebrow">PRIVATE BY DESIGN</div>
          <h2>
            <Camera size={19} /> Privacy-Safe Posture Camera
          </h2>
        </div>

        <div className="privacy-badge">
          <ShieldCheck size={14} /> LOCAL
        </div>
      </div>

      <div className="privacy-box">
        <strong>Strict In-Browser Privacy Protection</strong>
        <p>
          TypeEasy AI performs posture tracking entirely in your browser using local frame heuristics.
          Camera feed and biometric markers are never uploaded, stored, or processed on external servers.
          Webcam access is fully optional.
        </p>
        <small>{hint}</small>
      </div>

      <canvas ref={canvasRef} width="80" height="60" style={{ display: 'none' }} />

      {enabled && (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="camera-preview"
            data-testid="camera-preview"
          />

          <div className={`posture-status-bar ${postureStatus === 'good' ? 'good' : 'bad'}`}>
            {postureStatus === 'good' ? (
              <Check size={15} />
            ) : (
              <AlertCircle size={15} />
            )}
            <span>{postureMessage}</span>
          </div>
        </>
      )}

      {!enabled ? (
        <button
          className="secondary-button"
          onClick={enable}
          data-testid="enable-camera-button"
          style={{ marginTop: 14 }}
        >
          <Camera size={15} /> I Understand, Enable Camera
        </button>
      ) : (
        <button
          className="secondary-button"
          onClick={() => {
            if (videoRef.current && videoRef.current.srcObject) {
              videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
              videoRef.current.srcObject = null;
            }
            setEnabled(false);
            setHint('Camera disabled · TypeEasy continues normally');
          }}
          data-testid="disable-camera-button"
          style={{ marginTop: 14 }}
        >
          Turn Off Camera
        </button>
      )}
    </section>
  );
}
