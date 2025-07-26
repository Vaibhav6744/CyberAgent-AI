import { Text, View, ScrollView, SafeAreaView, Animated } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

interface AnalyticsData {
  threatsBlocked: number;
  falsePositives: number;
  responseTime: number;
  systemUptime: number;
  mlAccuracy: number;
  rlPerformance: number;
}

export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    threatsBlocked: 0,
    falsePositives: 0,
    responseTime: 0,
    systemUptime: 0,
    mlAccuracy: 0,
    rlPerformance: 0,
  });
  const [timeRange, setTimeRange] = useState('24h');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const countUpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Simulate loading analytics data
    const loadData = () => {
      const newData: AnalyticsData = {
        threatsBlocked: Math.floor(Math.random() * 500) + 1200,
        falsePositives: Math.floor(Math.random() * 20) + 5,
        responseTime: Math.random() * 2 + 0.5,
        systemUptime: 99.8 + Math.random() * 0.15,
        mlAccuracy: 94 + Math.random() * 4,
        rlPerformance: 91 + Math.random() * 6,
      };
      
      setAnalytics(newData);
    };

    loadData();

    // Animate counters
    Animated.timing(countUpAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Update data periodically
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const threatTrends = [
    { type: 'Malware', count: 45, trend: '+12%' },
    { type: 'DDoS', count: 23, trend: '-8%' },
    { type: 'Phishing', count: 67, trend: '+25%' },
    { type: 'SQL Injection', count: 12, trend: '-15%' },
    { type: 'Brute Force', count: 34, trend: '+5%' },
  ];

  const agentPerformance = [
    { name: 'Detection Agent', accuracy: 96.2, speed: 'Fast' },
    { name: 'Analysis Agent', accuracy: 94.8, speed: 'Medium' },
    { name: 'Remediation Agent', accuracy: 92.1, speed: 'Fast' },
    { name: 'RL Agent', accuracy: 89.7, speed: 'Learning' },
  ];

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container}>
        <Animated.View style={[commonStyles.content, { opacity: fadeAnim }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Icon name="analytics" size={40} style={{ color: '#2196F3' }} />
            <Text style={commonStyles.title}>Analytics & Reports</Text>
            <Text style={styles.subtitle}>AI performance metrics and threat intelligence</Text>
          </View>

          {/* Time Range Selector */}
          <View style={styles.timeRangeContainer}>
            {['1h', '24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                text={range}
                onPress={() => setTimeRange(range)}
                style={[
                  styles.timeRangeButton,
                  timeRange === range && styles.activeTimeRange
                ]}
              />
            ))}
          </View>

          {/* Key Metrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Icon name="shield-checkmark" size={24} style={{ color: '#4CAF50' }} />
              <Text style={styles.metricValue}>{analytics.threatsBlocked.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Threats Blocked</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Icon name="time" size={24} style={{ color: '#2196F3' }} />
              <Text style={styles.metricValue}>{analytics.responseTime.toFixed(1)}s</Text>
              <Text style={styles.metricLabel}>Avg Response Time</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Icon name="warning" size={24} style={{ color: '#FF9800' }} />
              <Text style={styles.metricValue}>{analytics.falsePositives}</Text>
              <Text style={styles.metricLabel}>False Positives</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Icon name="pulse" size={24} style={{ color: '#4CAF50' }} />
              <Text style={styles.metricValue}>{analytics.systemUptime.toFixed(2)}%</Text>
              <Text style={styles.metricLabel}>System Uptime</Text>
            </View>
          </View>

          {/* AI Performance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤖 AI Agent Performance</Text>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceTitle}>ML Model Accuracy</Text>
                <Text style={styles.performanceValue}>{analytics.mlAccuracy.toFixed(1)}%</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${analytics.mlAccuracy}%` }]} />
                </View>
              </View>
              
              <View style={styles.performanceCard}>
                <Text style={styles.performanceTitle}>RL Agent Performance</Text>
                <Text style={styles.performanceValue}>{analytics.rlPerformance.toFixed(1)}%</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${analytics.rlPerformance}%`, backgroundColor: '#FF9800' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Threat Trends */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 Threat Trends ({timeRange})</Text>
            {threatTrends.map((threat, index) => (
              <View key={index} style={styles.trendCard}>
                <View style={styles.trendInfo}>
                  <Text style={styles.trendType}>{threat.type}</Text>
                  <Text style={styles.trendCount}>{threat.count} incidents</Text>
                </View>
                <Text style={[
                  styles.trendChange,
                  { color: threat.trend.startsWith('+') ? '#F44336' : '#4CAF50' }
                ]}>
                  {threat.trend}
                </Text>
              </View>
            ))}
          </View>

          {/* Agent Performance Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Individual Agent Metrics</Text>
            {agentPerformance.map((agent, index) => (
              <View key={index} style={styles.agentCard}>
                <View style={styles.agentHeader}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentSpeed}>{agent.speed}</Text>
                </View>
                <View style={styles.agentMetrics}>
                  <Text style={styles.agentAccuracy}>Accuracy: {agent.accuracy}%</Text>
                  <View style={styles.miniProgressBar}>
                    <View style={[styles.miniProgressFill, { width: `${agent.accuracy}%` }]} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* RAG System Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 RAG System Status</Text>
            <View style={styles.ragCard}>
              <View style={styles.ragMetric}>
                <Icon name="document-text" size={20} style={{ color: '#2196F3' }} />
                <Text style={styles.ragLabel}>Knowledge Base</Text>
                <Text style={styles.ragValue}>15,847 entries</Text>
              </View>
              <View style={styles.ragMetric}>
                <Icon name="search" size={20} style={{ color: '#4CAF50' }} />
                <Text style={styles.ragLabel}>Query Response</Text>
                <Text style={styles.ragValue}>0.3s avg</Text>
              </View>
              <View style={styles.ragMetric}>
                <Icon name="checkmark-circle" size={20} style={{ color: '#FF9800' }} />
                <Text style={styles.ragLabel}>Relevance Score</Text>
                <Text style={styles.ragValue}>94.2%</Text>
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View style={commonStyles.buttonContainer}>
            <Button
              text="⚙️ Configure Agents"
              onPress={() => router.push('/config')}
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
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 5,
  },
  timeRangeButton: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  activeTimeRange: {
    backgroundColor: '#193cb8',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  metricValue: {
    fontSize: 20,
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
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 15,
  },
  performanceGrid: {
    gap: 10,
  },
  performanceCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  performanceTitle: {
    fontSize: 14,
    color: '#90CAF9',
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3e3e3',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#101824',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  trendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#162133',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  trendInfo: {
    flex: 1,
  },
  trendType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e3e3e3',
  },
  trendCount: {
    fontSize: 12,
    color: '#90CAF9',
    marginTop: 2,
  },
  trendChange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  agentCard: {
    backgroundColor: '#162133',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e3e3e3',
  },
  agentSpeed: {
    fontSize: 12,
    color: '#90CAF9',
  },
  agentMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agentAccuracy: {
    fontSize: 12,
    color: '#4CAF50',
    minWidth: 100,
  },
  miniProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#101824',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  ragCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  ragMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  ragLabel: {
    flex: 1,
    fontSize: 14,
    color: '#e3e3e3',
  },
  ragValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  navButton: {
    marginBottom: 10,
  },
};