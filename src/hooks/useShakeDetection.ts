import { useState, useEffect, useCallback } from 'react';
import { useAccelerometer } from './useAccelerometer';
import { getNetAcceleration } from '@utils/sensorUtils';
import { ShakeDetectionResult } from '@types/sensors.types';

interface ShakeDetectionConfig {
  threshold: number;
  timeWindow: number;
  requiredShakes: number;
  enabled: boolean;
}

interface UseShakeDetectionReturn extends ShakeDetectionResult {
  reset: () => void;
}

export const useShakeDetection = (config: ShakeDetectionConfig): UseShakeDetectionReturn => {
  const { data } = useAccelerometer({
    updateInterval: 100,
    enabled: config.enabled,
  });

  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState<number>(0);
  const [lastShakeIntensity, setLastShakeIntensity] = useState<number>(0);

  useEffect(() => {
    if (!config.enabled) return;

    const netAcceleration = getNetAcceleration(data);
    const currentTime = Date.now();

    // Detectar si supera el umbral
    if (netAcceleration > config.threshold) {
      // Verificar que haya pasado suficiente tiempo desde el último shake
      if (currentTime - lastShakeTime > config.timeWindow) {
        setShakeCount((prev) => prev + 1);
        setLastShakeTime(currentTime);
        setLastShakeIntensity(netAcceleration);
        setIsShaking(true);

        // Desactivar isShaking después de 500ms
        setTimeout(() => setIsShaking(false), 500);
      }
    }
  }, [data, config.threshold, config.timeWindow, config.enabled, lastShakeTime]);

  const reset = useCallback(() => {
    setShakeCount(0);
    setIsShaking(false);
    setLastShakeTime(0);
    setLastShakeIntensity(0);
  }, []);

  return {
    isShaking,
    shakeCount,
    lastShakeIntensity,
    lastShakeTime,
    reset,
  };
};
