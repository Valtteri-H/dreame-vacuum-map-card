import { useCallback, useRef, useState } from 'react';
import { useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';
import type { Spot } from '@/types/homeassistant';
import { useMachineState } from '@/contexts';

interface SpotOverlayProps {
  spots: Spot[];
  onSpotsChange: (spots: Spot[]) => void;
  clearAllLabel: string;
  removeSpotLabel: string;
}

export function SpotOverlay({ spots, onSpotsChange, clearAllLabel, removeSpotLabel }: SpotOverlayProps) {
  const transformContext = useTransformContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { phase } = useMachineState();
  const isInCleaningSession = phase === 'cleaning' || phase === 'paused';
  const [scale, setScale] = useState(transformContext.state.scale);

  useTransformEffect(
    useCallback((state) => {
      setScale(state.state.scale);
    }, [])
  );

  const getContentCoordinates = useCallback((clientX: number, clientY: number): Spot | null => {
    const container = containerRef.current;
    if (!container) return null;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    return {
      x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
    };
  }, []);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (isInCleaningSession) return;
    event.stopPropagation();
    const spot = getContentCoordinates(event.clientX, event.clientY);
    if (spot) onSpotsChange([...spots, spot]);
  };

  const removeSpot = (event: React.MouseEvent, index: number): void => {
    event.stopPropagation();
    onSpotsChange(spots.filter((_, spotIndex) => spotIndex !== index));
  };

  const clearSpots = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onSpotsChange([]);
  };

  const counterScale = 1 / scale;

  return (
    <div ref={containerRef} className="vacuum-map__spot-container" onClick={handleContentClick}>
      {spots.map((spot, index) => (
        <button
          key={`${spot.x}-${spot.y}-${index}`}
          type="button"
          className="vacuum-map__spot"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: `translate(-50%, -50%) scale(${counterScale})`,
          }}
          onClick={(event) => removeSpot(event, index)}
          disabled={isInCleaningSession}
          aria-label={`${removeSpotLabel} ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      {spots.length > 0 && !isInCleaningSession && (
        <button
          type="button"
          className="vacuum-map__spot-clear"
          style={{ transform: `scale(${counterScale})` }}
          onClick={clearSpots}
        >
          {clearAllLabel}
        </button>
      )}
    </div>
  );
}
