import { Text, View, ScrollView, SafeAreaView, Animated } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function MainScreen() {
  const [systemStatus, setSystemStatus] = useState('Initializing...');
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [systemHealth, setSystemHealth] = useState(98);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate entrance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Pulse animation for status indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Simulate system initialization
    const initTimer = setTimeout(() => {
      setSystemStatus('Active - Monitoring');
      setThreatsDetected(Math.floor(Math.random() * 5));
    }, 2000);

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setThreatsDetected(prev => prev + Math.floor(Math.random() * 2));
      setSystemHealth(prev => Math.max(95, prev + (Math.random() - 0.5) * 2));
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(updateInterval);
      pulseAnimation.stop();
    };
  }, []);

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Animated.View style={[commonStyles.content, { opacity: fadeAnim }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Animated.View style={[styles.statusIndicator, { transform: [{ scale: pulseAnim }] }]}>
              <Icon name="shield-checkmark" size={40} style={{ color: '#4CAF50' }} />
            </Animated.View>
            <Text style={commonStyles.title}>AutoSecAgent</Text>
            <Text style={styles.subtitle}>Autonomous Cybersecurity Threat Remediation</Text>
          </View>

          {/* System Status Dashboard */}
          <View style={styles.dashboard}>
            <View style={styles.statusCard}>
              <Text style={styles.cardTitle}>System Status</Text>
              <Text style={[styles.statusText, { color: systemStatus.includes('Active') ? '#4CAF50' : '#FFC107' }]}>
                {systemStatus}
              </Text>
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Icon name="warning" size={24} style={{ color: '#FF5722' }} />
                <Text style={styles.metricValue}>{threatsDetected}</Text>
                <Text style={styles.metricLabel}>Threats Detected</Text>
              </View>
              
              <View style={styles.metricCard}>
                <Icon name="pulse" size={24} style={{ color: '#4CAF50' }} />
                <Text style={styles.metricValue}>{systemHealth.toFixed(1)}%</Text>
                <Text style={styles.metricLabel}>System Health</Text>
              </View>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={commonStyles.buttonContainer}>
            <Button
              text="🔍 Threat Detection Dashboard"
              onPress={() => router.push('/threats')}
              style={[buttonStyles.instructionsButton, styles.navButton]}
            />
            
            <Button
              text="🛡️ Mitigation Strategies"
              onPress={() => router.push('/mitigation')}
              style={[buttonStyles.instructionsButton, styles.navButton]}
            />
            
            <Button
              text="📊 Analytics & Reports"
              onPress={() => router.push('/analytics')}
              style={[buttonStyles.instructionsButton, styles.navButton]}
            />
            
            <Button
              text="⚙️ Agent Configuration"
              onPress={() => router.push('/config')}
              style={[buttonStyles.instructionsButton, styles.navButton]}
            />
          </View>

          {/* AI Agent Status */}
          <View style={styles.agentStatus}>
            <Text style={styles.sectionTitle}>AI Agents Status</Text>
            <View style={styles.agentList}>
              <View style={styles.agentItem}>
                <Icon name="eye" size={20} style={{ color: '#4CAF50' }} />
                <Text style={styles.agentName}>Detection Agent</Text>
                <Text style={styles.agentStatusText}>Active</Text>
              </View>
              <View style={styles.agentItem}>
                <Icon name="shield" size={20} style={{ color: '#4CAF50' }} />
                <Text style={styles.agentName}>Remediation Agent</Text>
                <Text style={styles.agentStatusText}>Active</Text>
              </View>
              <View style={styles.agentItem}>
                <Icon name="analytics" size={20} style={{ color: '#2196F3' }} />
                <Text style={styles.agentName}>Analysis Agent</Text>
                <Text style={styles.agentStatusText}>Learning</Text>
              </View>
            </View>
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusIndicator: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#90CAF9',
    textAlign: 'center',
    marginTop: 5,
  },
  dashboard: {
    width: '100%',
    marginBottom: 30,
  },
  statusCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3e3e3',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#90CAF9',
    textAlign: 'center',
    marginTop: 4,
  },
  navButton: {
    marginBottom: 12,
    backgroundColor: '#193cb8',
  },
  agentStatus: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 15,
    textAlign: 'center',
  },
  agentList: {
    gap: 10,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162133',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  agentName: {
    flex: 1,
    fontSize: 14,
    color: '#e3e3e3',
    marginLeft: 10,
  },
  agentStatusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
};