import { Text, View, ScrollView, SafeAreaView, Animated } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

interface MitigationStrategy {
  id: string;
  threatType: string;
  strategy: string;
  effectiveness: number;
  automationLevel: 'Manual' | 'Semi-Auto' | 'Fully Auto';
  estimatedTime: string;
  description: string;
  steps: string[];
  rlConfidence: number;
}

export default function MitigationScreen() {
  const [strategies, setStrategies] = useState<MitigationStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<{ [key: string]: string }>({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const mitigationStrategies: MitigationStrategy[] = [
    {
      id: '1',
      threatType: 'DDoS Attack',
      strategy: 'Rate Limiting + IP Blocking',
      effectiveness: 95,
      automationLevel: 'Fully Auto',
      estimatedTime: '30 seconds',
      description: 'Deploy intelligent rate limiting and block malicious IPs using ML-based pattern recognition.',
      steps: [
        'Analyze traffic patterns using AI',
        'Identify malicious IP ranges',
        'Deploy rate limiting rules',
        'Block confirmed malicious sources',
        'Monitor effectiveness'
      ],
      rlConfidence: 92
    },
    {
      id: '2',
      threatType: 'Malware',
      strategy: 'Quarantine + Deep Scan',
      effectiveness: 88,
      automationLevel: 'Semi-Auto',
      estimatedTime: '2 minutes',
      description: 'Isolate infected systems and perform comprehensive malware analysis using AI-powered detection.',
      steps: [
        'Isolate affected systems',
        'Run AI-powered malware scan',
        'Analyze behavioral patterns',
        'Remove or quarantine threats',
        'Restore system integrity'
      ],
      rlConfidence: 87
    },
    {
      id: '3',
      threatType: 'SQL Injection',
      strategy: 'WAF Rules + Input Validation',
      effectiveness: 93,
      automationLevel: 'Fully Auto',
      estimatedTime: '15 seconds',
      description: 'Deploy Web Application Firewall rules and enhance input validation using LLM-based analysis.',
      steps: [
        'Analyze injection patterns',
        'Update WAF rules automatically',
        'Implement input sanitization',
        'Block malicious requests',
        'Log and monitor attempts'
      ],
      rlConfidence: 94
    },
    {
      id: '4',
      threatType: 'Phishing',
      strategy: 'Email Filtering + User Alert',
      effectiveness: 85,
      automationLevel: 'Semi-Auto',
      estimatedTime: '1 minute',
      description: 'Enhanced email filtering with AI-based content analysis and automated user notifications.',
      steps: [
        'Analyze email content with NLP',
        'Check sender reputation',
        'Quarantine suspicious emails',
        'Alert affected users',
        'Update filtering rules'
      ],
      rlConfidence: 83
    },
    {
      id: '5',
      threatType: 'Brute Force',
      strategy: 'Account Lockout + CAPTCHA',
      effectiveness: 91,
      automationLevel: 'Fully Auto',
      estimatedTime: '10 seconds',
      description: 'Implement intelligent account lockout and CAPTCHA challenges based on behavioral analysis.',
      steps: [
        'Detect unusual login patterns',
        'Implement progressive delays',
        'Deploy CAPTCHA challenges',
        'Lock suspicious accounts',
        'Notify security team'
      ],
      rlConfidence: 89
    }
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setStrategies(mitigationStrategies);
  }, []);

  const deployStrategy = async (strategyId: string) => {
    setDeploymentStatus(prev => ({ ...prev, [strategyId]: 'Deploying...' }));
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDeploymentStatus(prev => ({ ...prev, [strategyId]: 'Deployed' }));
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setDeploymentStatus(prev => ({ ...prev, [strategyId]: '' }));
    }, 3000);
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return '#4CAF50';
    if (effectiveness >= 80) return '#FFC107';
    if (effectiveness >= 70) return '#FF9800';
    return '#F44336';
  };

  const getAutomationColor = (level: string) => {
    switch (level) {
      case 'Fully Auto': return '#4CAF50';
      case 'Semi-Auto': return '#FF9800';
      case 'Manual': return '#F44336';
      default: return '#90CAF9';
    }
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container}>
        <Animated.View style={[commonStyles.content, { opacity: fadeAnim }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Icon name="shield" size={40} style={{ color: '#4CAF50' }} />
            <Text style={commonStyles.title}>Mitigation Strategies</Text>
            <Text style={styles.subtitle}>AI-powered threat remediation using Reinforcement Learning</Text>
          </View>

          {/* RL Agent Status */}
          <View style={styles.agentStatus}>
            <Text style={styles.sectionTitle}>🤖 RL Agent Status</Text>
            <View style={styles.agentCard}>
              <View style={styles.agentInfo}>
                <Icon name="brain" size={24} style={{ color: '#2196F3' }} />
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>Reinforcement Learning Agent</Text>
                  <Text style={styles.agentState}>Learning optimal strategies...</Text>
                </View>
              </View>
              <View style={styles.agentMetrics}>
                <Text style={styles.metricText}>Success Rate: 94.2%</Text>
                <Text style={styles.metricText}>Episodes: 15,847</Text>
              </View>
            </View>
          </View>

          {/* Mitigation Strategies */}
          <View style={styles.strategiesContainer}>
            <Text style={styles.sectionTitle}>Available Strategies</Text>
            {strategies.map((strategy) => (
              <View key={strategy.id} style={styles.strategyCard}>
                <View style={styles.strategyHeader}>
                  <Text style={styles.threatType}>{strategy.threatType}</Text>
                  <View style={styles.badges}>
                    <View style={[styles.effectivenessBadge, { backgroundColor: getEffectivenessColor(strategy.effectiveness) }]}>
                      <Text style={styles.badgeText}>{strategy.effectiveness}%</Text>
                    </View>
                    <View style={[styles.automationBadge, { backgroundColor: getAutomationColor(strategy.automationLevel) }]}>
                      <Text style={styles.badgeText}>{strategy.automationLevel}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.strategyName}>{strategy.strategy}</Text>
                <Text style={styles.strategyDescription}>{strategy.description}</Text>

                <View style={styles.strategyMetrics}>
                  <Text style={styles.metricItem}>⏱️ Time: {strategy.estimatedTime}</Text>
                  <Text style={styles.metricItem}>🎯 RL Confidence: {strategy.rlConfidence}%</Text>
                </View>

                {selectedStrategy === strategy.id && (
                  <View style={styles.strategySteps}>
                    <Text style={styles.stepsTitle}>Deployment Steps:</Text>
                    {strategy.steps.map((step, index) => (
                      <Text key={index} style={styles.stepItem}>
                        {index + 1}. {step}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.strategyActions}>
                  <Button
                    text={selectedStrategy === strategy.id ? "Hide Details" : "Show Details"}
                    onPress={() => setSelectedStrategy(selectedStrategy === strategy.id ? null : strategy.id)}
                    style={[buttonStyles.backButton, styles.detailsButton]}
                  />
                  
                  <Button
                    text={deploymentStatus[strategy.id] || "Deploy Strategy"}
                    onPress={() => deployStrategy(strategy.id)}
                    style={[
                      buttonStyles.instructionsButton, 
                      styles.deployButton,
                      deploymentStatus[strategy.id] === 'Deployed' && { backgroundColor: '#4CAF50' }
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Multi-Agent Coordination */}
          <View style={styles.coordinationSection}>
            <Text style={styles.sectionTitle}>🤝 Multi-Agent Coordination</Text>
            <View style={styles.coordinationCard}>
              <Text style={styles.coordinationTitle}>Agent Communication Status</Text>
              <View style={styles.agentConnections}>
                <View style={styles.connectionItem}>
                  <Icon name="eye" size={16} style={{ color: '#4CAF50' }} />
                  <Text style={styles.connectionText}>Detection Agent ↔ Remediation Agent</Text>
                  <Text style={styles.connectionStatus}>Active</Text>
                </View>
                <View style={styles.connectionItem}>
                  <Icon name="analytics" size={16} style={{ color: '#2196F3' }} />
                  <Text style={styles.connectionText}>Analysis Agent ↔ RL Agent</Text>
                  <Text style={styles.connectionStatus}>Syncing</Text>
                </View>
                <View style={styles.connectionItem}>
                  <Icon name="shield" size={16} style={{ color: '#FF9800' }} />
                  <Text style={styles.connectionText}>All Agents ↔ Threat Model</Text>
                  <Text style={styles.connectionStatus}>Updating</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Navigation */}
          <View style={commonStyles.buttonContainer}>
            <Button
              text="📊 View Analytics"
              onPress={() => router.push('/analytics')}
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
  agentStatus: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 15,
  },
  agentCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  agentDetails: {
    marginLeft: 10,
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
  },
  agentState: {
    fontSize: 12,
    color: '#90CAF9',
    marginTop: 2,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  strategiesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  strategyCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  strategyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  threatType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
  },
  badges: {
    flexDirection: 'row',
    gap: 5,
  },
  effectivenessBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  automationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  strategyName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64B5F6',
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 13,
    color: '#e3e3e3',
    lineHeight: 18,
    marginBottom: 10,
  },
  strategyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metricItem: {
    fontSize: 12,
    color: '#90CAF9',
  },
  strategySteps: {
    backgroundColor: '#101824',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  stepsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 8,
  },
  stepItem: {
    fontSize: 12,
    color: '#90CAF9',
    marginBottom: 4,
    lineHeight: 16,
  },
  strategyActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailsButton: {
    flex: 1,
  },
  deployButton: {
    flex: 1,
  },
  coordinationSection: {
    width: '100%',
    marginBottom: 20,
  },
  coordinationCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  coordinationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 12,
  },
  agentConnections: {
    gap: 8,
  },
  connectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectionText: {
    flex: 1,
    fontSize: 12,
    color: '#e3e3e3',
  },
  connectionStatus: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  navButton: {
    marginBottom: 10,
  },
};