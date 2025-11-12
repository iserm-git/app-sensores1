export const sensorConfig = {
  accelerometer: {
    updateInterval: 100,
    enabled: true,
  },
  gyroscope: {
    updateInterval: 100,
    enabled: true,
  },
  shake: {
    threshold: 15,
    timeWindow: 500,
    requiredShakes: 3,
  },
  antiFraud: {
    minShakeIntensity: 10.0,
    maxShakeIntensity: 50.0,
    minMovementVariance: 5.0,
    requiredTrustScore: 0.7,
  },
};
