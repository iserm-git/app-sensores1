import { useState, useEffect, useCallback } from 'react';
import { Accelerometer } from 'expo-sensors';
import { AccelerometerData, SensorConfig } from '@types/sensors.types';

interface UseAccelerometerReturn {
  data: AccelerometerData;
  isAvailable: boolean;
  error: Error | null;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export const useAccelerometer = (config: SensorConfig): UseAccelerometerReturn => {
  const [data, setData] = useState<AccelerometerData>({
    x: 0,
    y: 0,
    z: 0,
    timestamp: Date.now(),
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let subscription: any;

    const setupAccelerometer = async () => {
      try {
        const available = await Accelerometer.isAvailableAsync();
        setIsAvailable(available);

        if (available && config.enabled && !isPaused) {
          Accelerometer.setUpdateInterval(config.updateInterval);

          subscription = Accelerometer.addListener((accelerometerData) => {
            setData({
              x: accelerometerData.x,
              y: accelerometerData.y,
              z: accelerometerData.z,
              timestamp: Date.now(),
            });
          });
        }
      } catch (err) {
        setError(err as Error);
        setIsAvailable(false);
      }
    };

    setupAccelerometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [config.enabled, config.updateInterval, isPaused]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setData({ x: 0, y: 0, z: 0, timestamp: Date.now() });
  }, []);

  return {
    data,
    isAvailable,
    error,
    pause,
    resume,
    reset,
  };
};
