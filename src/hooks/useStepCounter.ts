import { useState, useEffect, useCallback } from 'react';
import { useAccelerometer } from './useAccelerometer';
import { PeakDetector } from '@utils/sensorUtils';
import { StepCounterData } from '@types/sensors.types';

interface UseStepCounterReturn extends StepCounterData {
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

export const useStepCounter = (enabled: boolean = true): UseStepCounterReturn => {
  const { data } = useAccelerometer({
    updateInterval: 50,
    enabled,
  });

  const [peakDetector] = useState(() => new PeakDetector(12.0, 300));
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentSessionSteps, setCurrentSessionSteps] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [cadence, setCadence] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [recentStepTimes, setRecentStepTimes] = useState<number[]>([]);

  useEffect(() => {
    if (!enabled || isPaused) return;

    const magnitude = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
    const currentTime = Date.now();

    if (peakDetector.detect(magnitude, currentTime)) {
      setTotalSteps((prev) => prev + 1);
      setCurrentSessionSteps((prev) => prev + 1);

      // Actualizar tiempos de pasos recientes para calcular cadencia
      setRecentStepTimes((prev) => {
        const updated = [...prev, currentTime].slice(-10); // Mantener últimos 10 pasos

        // Calcular cadencia (pasos por minuto)
        if (updated.length >= 2) {
          const timeSpan = (updated[updated.length - 1] - updated[0]) / 1000; // segundos
          const stepsInTimeSpan = updated.length - 1;
          const stepsPerMinute = (stepsInTimeSpan / timeSpan) * 60;
          setCadence(Math.round(stepsPerMinute));
        }

        return updated;
      });
    }
  }, [data, enabled, isPaused, peakDetector]);

  const reset = useCallback(() => {
    setTotalSteps(0);
    setCurrentSessionSteps(0);
    setCadence(0);
    setRecentStepTimes([]);
    peakDetector.reset();
  }, [peakDetector]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    totalSteps,
    currentSessionSteps,
    sessionStartTime,
    cadence,
    reset,
    pause,
    resume,
  };
};
