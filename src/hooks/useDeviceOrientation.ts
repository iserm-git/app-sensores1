import { useState, useEffect } from 'react';
import { useAccelerometer } from './useAccelerometer';
import { calculateOrientation } from '@utils/sensorUtils';
import { OrientationData, DeviceOrientation } from '@types/sensors.types';

interface UseDeviceOrientationReturn {
  orientation: OrientationData;
  deviceOrientation: DeviceOrientation;
  isAvailable: boolean;
}

export const useDeviceOrientation = (enabled: boolean = true): UseDeviceOrientationReturn => {
  const { data, isAvailable } = useAccelerometer({
    updateInterval: 100,
    enabled,
  });

  const [orientation, setOrientation] = useState<OrientationData>({
    pitch: 0,
    roll: 0,
    yaw: 0,
  });

  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientation>('portrait');

  useEffect(() => {
    if (!enabled || !isAvailable) return;

    const calculatedOrientation = calculateOrientation(data);
    setOrientation(calculatedOrientation);

    // Determinar orientación del dispositivo
    const { pitch, roll } = calculatedOrientation;

    if (Math.abs(pitch) > 45 && Math.abs(roll) < 45) {
      if (pitch > 0) {
        setDeviceOrientation('portrait-upside-down');
      } else {
        setDeviceOrientation('portrait');
      }
    } else if (Math.abs(roll) > 45 && Math.abs(pitch) < 45) {
      if (roll > 0) {
        setDeviceOrientation('landscape-right');
      } else {
        setDeviceOrientation('landscape');
      }
    }
  }, [data, enabled, isAvailable]);

  return {
    orientation,
    deviceOrientation,
    isAvailable,
  };
};
