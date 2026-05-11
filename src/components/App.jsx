import { useRef, useState } from 'react';
import videoFile from './videoplayback.mp4';

const escapePositions = [
  { x: 150, y: -90 },
  { x: -170, y: 95 },
  { x: 115, y: 105 },
  { x: -125, y: -110 },
];

export const App = () => {
  const [escapeCount, setEscapeCount] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoOverlayRef = useRef(null);
  const videoRef = useRef(null);

  const moveNoButton = () => {
    if (escapeCount >= 3) {
      return;
    }

    setEscapeCount(currentCount => currentCount + 1);
    setPositionIndex(currentIndex => (currentIndex + 1) % escapePositions.length);
  };

  const noButtonPosition =
    escapeCount > 0 ? escapePositions[positionIndex] : { x: 0, y: 0 };

  const startVideo = () => {
    if (escapeCount < 3) {
      moveNoButton();
      return;
    }

    setIsVideoOpen(true);

    videoOverlayRef.current?.requestFullscreen?.();
    videoRef.current?.play?.().catch(() => {});
  };

  return (
    <div
      style={{
        height: '100vh',
        minHeight: 560,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#2f2451',
        background:
          'radial-gradient(circle at 20% 20%, #fff7ad 0 13%, transparent 14%), radial-gradient(circle at 85% 18%, #ffd6ec 0 12%, transparent 13%), radial-gradient(circle at 75% 82%, #c7f9ff 0 15%, transparent 16%), linear-gradient(135deg, #fff8e7 0%, #f5fbff 45%, #fff0f6 100%)',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 'min(92vw, 640px)',
          minHeight: 360,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          padding: '56px 36px',
          textAlign: 'center',
          borderRadius: 36,
          background: 'rgba(255, 255, 255, 0.72)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 24px 80px rgba(114, 74, 146, 0.2)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 18,
            borderRadius: 28,
            border: '2px dashed rgba(255, 164, 28, 0.35)',
            pointerEvents: 'none',
          }}
        />

        <h1
          style={{
            margin: 0,
            maxWidth: 520,
            fontSize: 'clamp(34px, 7vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: 1,
            textTransform: 'uppercase',
            textShadow: '3px 5px 0 rgba(255, 210, 77, 0.55)',
          }}
        >
          СДЕЛАЕШЬ СРОЧНЯК?
        </h1>

        <div
          style={{
            width: 420,
            maxWidth: '100%',
            height: 160,
            position: 'relative',
          }}
        >
          <button
            type="button"
            style={{
              position: 'absolute',
              left: 'calc(50% - 112px)',
              top: 58,
              padding: '16px 34px',
              border: 0,
              borderRadius: 999,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #34c759, #14b879)',
              boxShadow: '0 12px 28px rgba(20, 184, 121, 0.32)',
              fontSize: 24,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Да
          </button>

          <button
            type="button"
            onMouseEnter={moveNoButton}
            onFocus={moveNoButton}
            onClick={startVideo}
            style={{
              position: 'absolute',
              left: 'calc(50% + 18px)',
              top: 58,
              padding: '16px 34px',
              border: 0,
              borderRadius: 999,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #ff4d6d, #ff8a5b)',
              boxShadow: '0 12px 28px rgba(255, 77, 109, 0.32)',
              fontSize: 24,
              fontWeight: 800,
              cursor: escapeCount < 3 ? 'grab' : 'pointer',
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) rotate(${
                escapeCount * 7
              }deg)`,
              transition: 'transform 220ms ease, box-shadow 220ms ease',
            }}
          >
            Нет
          </button>
        </div>
      </div>

      <div
        ref={videoOverlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000000',
          opacity: isVideoOpen ? 1 : 0,
          pointerEvents: isVideoOpen ? 'auto' : 'none',
          visibility: isVideoOpen ? 'visible' : 'hidden',
          transition: 'opacity 120ms ease',
        }}
      >
        <video
          ref={videoRef}
          src={videoFile}
          controls
          playsInline
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        >
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
};
