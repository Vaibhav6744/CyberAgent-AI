import { Text, View, ScrollView, SafeAreaView, Animated, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

interface ThreatLog {
  id: string;
  timestamp: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  source: string;
  description: string;
  status: 'Detected' | 'Analyzing' | 'Mitigated' | 'Blocked';
  confidence: number;
}

export default function ThreatsScreen() {
  const [threats, setThreats] = useState<ThreatLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const generateThreat = (): ThreatLog => {
    const types = ['Malware', 'DDoS Attack', 'Phishing', 'SQL Injection', 'Brute Force', 'Port Scan', 'Data Exfiltration'];
    const severities: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical'];
    const statuses: ('Detected' | 'Analyzing' | 'Mitigated' | 'Blocked')[] = ['Detected', 'Analyzing', 'Mitigated', 'Blocked'];
    const sources = ['192.168.1.100', '10.0.0.45', '172.16.0.23', '203.0.113.5', '198.51.100.14'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      severity,
      source: sources[Math.floor(Math.random() * sources.length)],
      description: `${type} detected from suspicious source. AI analysis in progress.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
    };
  };

  useEffect(() => {
    // Initial animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Generate initial threats
    const initialThreats = Array.from({ length: 5 }, generateThreat);
    setThreats(initialThreats);

    // Real-time threat simulation
    let interval: NodeJS.Timeout;
    if (realTimeMode) {
      interval = setInterval(() => {
        setThreats(prev => {
          const newThreat = generateThreat();
          const updated = [newThreat, ...prev.slice(0, 9)]; // Keep last 10 threats
          return updated;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [realTimeMode]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newThreats = Array.from({ length: 5 }, generateThreat);
    setThreats(newThreats);
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return '#F44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      default: return '#90CAF9';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Detected': return '#FF5722';
      case 'Analyzing': return '#2196F3';
      case 'Mitigated': return '#4CAF50';
      case 'Blocked': return '#9C27B0';
      default: return '#90CAF9';
    }
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView 
        style={commonStyles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View style={[commonStyles.content, { opacity: fadeAnim }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Icon name="shield-outline" size={40} style={{ color: '#FF5722' }} />
            <Text style={commonStyles.title}>Threat Detection</Text>
            <Text style={styles.subtitle}>Real-time AI-powered threat monitoring</Text>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <Button
              text={realTimeMode ? "⏸️ Pause Real-time" : "▶️ Start Real-time"}
              onPress={() => setRealTimeMode(!realTimeMode)}
              style={[buttonStyles.instructionsButton, { backgroundColor: realTimeMode ? '#FF5722' : '#4CAF50' }]}
            />
          </View>

          {/* Threat Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{threats.filter(t => t.severity === 'Critical').length}</Text>
              <Text style={styles.statLabel}>Critical</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{threats.filter(t => t.severity === 'High').length}</Text>
              <Text style={styles.statLabel}>High</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{threats.filter(t => t.status === 'Mitigated').length}</Text>
              <Text style={styles.statLabel}>Mitigated</Text>
            </View>
          </View>

          {/* Threat Logs */}
          <View style={styles.threatsContainer}>
            <Text style={styles.sectionTitle}>Live Threat Feed</Text>
            {threats.map((threat) => (
              <View key={threat.id} style={styles.threatCard}>
                <View style={styles.threatHeader}>
                  <View style={styles.threatInfo}>
                    <Text style={styles.threatType}>{threat.type}</Text>
                    <Text style={styles.threatTime}>{threat.timestamp}</Text>
                  </View>
                  <View style={styles.threatBadges}>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(threat.severity) }]}>
                      <Text style={styles.badgeText}>{threat.severity}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(threat.status) }]}>
                      <Text style={styles.badgeText}>{threat.status}</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.threatDescription}>{threat.description}</Text>
                
                <View style={styles.threatFooter}>
                  <Text style={styles.threatSource}>Source: {threat.source}</Text>
                  <Text style={styles.confidence}>Confidence: {threat.confidence}%</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Navigation */}
          <View style={commonStyles.buttonContainer}>
            <Button
              text="🛡️ View Mitigation Strategies"
              onPress={() => router.push('/mitigation')}
              style={[buttonStyles.instructionsButton, styles.navButton]}
            />
            <Button
              text="← Back to Dashboard"
              onPress={() => router.back()}
              style={[buttonStyles.backButton, styles.navButton]}
            />
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#90CAF9',
    textAlign: 'center',
    marginTop: 5,
  },
  controls: {
    width: '100%',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#162133',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3e3e3',
  },
  statLabel: {
    fontSize: 12,
    color: '#90CAF9',
    marginTop: 4,
  },
  threatsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 15,
  },
  threatCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  threatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  threatInfo: {
    flex: 1,
  },
  threatType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
  },
  threatTime: {
    fontSize: 12,
    color: '#90CAF9',
    marginTop: 2,
  },
  threatBadges: {
    gap: 5,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  threatDescription: {
    fontSize: 14,
    color: '#e3e3e3',
    marginBottom: 10,
    lineHeight: 20,
  },
  threatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threatSource: {
    fontSize: 12,
    color: '#90CAF9',
  },
  confidence: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  navButton: {
    marginBottom: 10,
  },
};