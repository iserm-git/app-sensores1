import { useState, useEffect, useCallback } from 'react';
import { Gyroscope } from 'expo-sensors';
import { GyroscopeData, SensorConfig } from '@types/sensors.types';

interface UseGyroscopeReturn {
  data: GyroscopeData;
  isAvailable: boolean;
  error: Error | null;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export const useGyroscope = (config: SensorConfig): UseGyroscopeReturn => {
  const [data, setData] = useState<GyroscopeData>({
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

    const setupGyroscope = async () => {
      try {
        const available = await Gyroscope.isAvailableAsync();
        setIsAvailable(available);

        if (available && config.enabled && !isPaused) {
          Gyroscope.setUpdateInterval(config.updateInterval);

          subscription = Gyroscope.addListener((gyroscopeData) => {
            setData({
              x: gyroscopeData.x,
              y: gyroscopeData.y,
              z: gyroscopeData.z,
              timestamp: Date.now(),
            });
          });
        }
      } catch (err) {
        setError(err as Error);
        setIsAvailable(false);
      }
    };

    setupGyroscope();

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
