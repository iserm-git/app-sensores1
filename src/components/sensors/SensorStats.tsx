import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@components/common/Card';
import { colors } from '@constants/colors';

interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
}

interface SensorStatsProps {
  title?: string;
  stats: StatItem[];
}

export const SensorStats: React.FC<SensorStatsProps> = ({
  title = 'Estadísticas',
  stats,
}) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            {stat.icon && <Text style={styles.statIcon}>{stat.icon}</Text>}
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={styles.statValueContainer}>
              <Text style={styles.statValue}>{stat.value}</Text>
              {stat.unit && <Text style={styles.statUnit}>{stat.unit}</Text>}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statUnit: {
    fontSize: 12,
    color: colors.text.light,
    marginLeft: 2,
  },
});
