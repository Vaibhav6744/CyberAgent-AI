import { Text, View, ScrollView, SafeAreaView, Animated, Switch } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';

interface AgentConfig {
  id: string;
  name: string;
  enabled: boolean;
  sensitivity: number;
  autoResponse: boolean;
  learningRate: number;
  description: string;
}

export default function ConfigScreen() {
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [systemSettings, setSystemSettings] = useState({
    realTimeMonitoring: true,
    autoMitigation: false,
    alertThreshold: 75,
    logRetention: 30,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const initialAgents: AgentConfig[] = [
    {
      id: '1',
      name: 'Detection Agent',
      enabled: true,
      sensitivity: 85,
      autoResponse: true,
      learningRate: 0.01,
      description: 'Monitors network traffic and identifies potential threats using ML models'
    },
    {
      id: '2',
      name: 'Analysis Agent',
      enabled: true,
      sensitivity: 90,
      autoResponse: false,
      learningRate: 0.005,
      description: 'Performs deep analysis of detected threats using RAG and LLM'
    },
    {
      id: '3',
      name: 'Remediation Agent',
      enabled: true,
      sensitivity: 80,
      autoResponse: true,
      learningRate: 0.02,
      description: 'Executes mitigation strategies based on RL recommendations'
    },
    {
      id: '4',
      name: 'RL Agent',
      enabled: true,
      sensitivity: 75,
      autoResponse: false,
      learningRate: 0.1,
      description: 'Learns optimal response strategies through reinforcement learning'
    }
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setAgents(initialAgents);
  }, []);

  const updateAgentConfig = (agentId: string, field: keyof AgentConfig, value: any) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, [field]: value } : agent
    ));
  };

  const updateSystemSetting = (setting: string, value: any) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
  };

  const saveConfiguration = () => {
    console.log('Saving configuration...', { agents, systemSettings });
    // Here you would typically save to backend or local storage
    alert('Configuration saved successfully!');
  };

  const resetToDefaults = () => {
    setAgents(initialAgents);
    setSystemSettings({
      realTimeMonitoring: true,
      autoMitigation: false,
      alertThreshold: 75,
      logRetention: 30,
    });
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container}>
        <Animated.View style={[commonStyles.content, { opacity: fadeAnim }]}>
          
          {/* Header */}
          <View style={styles.header}>
            <Icon name="settings" size={40} style={{ color: '#FF9800' }} />
            <Text style={commonStyles.title}>Agent Configuration</Text>
            <Text style={styles.subtitle}>Configure AI agents and system parameters</Text>
          </View>

          {/* System Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚙️ System Settings</Text>
            
            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Real-time Monitoring</Text>
                <Switch
                  value={systemSettings.realTimeMonitoring}
                  onValueChange={(value) => updateSystemSetting('realTimeMonitoring', value)}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                  thumbColor={systemSettings.realTimeMonitoring ? '#ffffff' : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Auto Mitigation</Text>
                <Switch
                  value={systemSettings.autoMitigation}
                  onValueChange={(value) => updateSystemSetting('autoMitigation', value)}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                  thumbColor={systemSettings.autoMitigation ? '#ffffff' : '#f4f3f4'}
                />
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Alert Threshold: {systemSettings.alertThreshold}%</Text>
                <Text style={styles.settingDescription}>Minimum confidence level for threat alerts</Text>
              </View>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Log Retention: {systemSettings.logRetention} days</Text>
                <Text style={styles.settingDescription}>How long to keep security logs</Text>
              </View>
            </View>
          </View>

          {/* Agent Configurations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤖 AI Agent Configuration</Text>
            
            {agents.map((agent) => (
              <View key={agent.id} style={styles.agentCard}>
                <View style={styles.agentHeader}>
                  <View style={styles.agentInfo}>
                    <Text style={styles.agentName}>{agent.name}</Text>
                    <Text style={styles.agentDescription}>{agent.description}</Text>
                  </View>
                  <Switch
                    value={agent.enabled}
                    onValueChange={(value) => updateAgentConfig(agent.id, 'enabled', value)}
                    trackColor={{ false: '#767577', true: '#4CAF50' }}
                    thumbColor={agent.enabled ? '#ffffff' : '#f4f3f4'}
                  />
                </View>
                
                {agent.enabled && (
                  <View style={styles.agentSettings}>
                    <View style={styles.parameterRow}>
                      <Text style={styles.parameterLabel}>Sensitivity: {agent.sensitivity}%</Text>
                      <View style={styles.sensitivityBar}>
                        <View style={[styles.sensitivityFill, { width: `${agent.sensitivity}%` }]} />
                      </View>
                    </View>
                    
                    <View style={styles.parameterRow}>
                      <Text style={styles.parameterLabel}>Learning Rate: {agent.learningRate}</Text>
                      <Text style={styles.parameterDescription}>
                        {agent.learningRate > 0.05 ? 'Fast Learning' : 
                         agent.learningRate > 0.01 ? 'Moderate Learning' : 'Conservative Learning'}
                      </Text>
                    </View>
                    
                    <View style={styles.parameterRow}>
                      <Text style={styles.parameterLabel}>Auto Response</Text>
                      <Switch
                        value={agent.autoResponse}
                        onValueChange={(value) => updateAgentConfig(agent.id, 'autoResponse', value)}
                        trackColor={{ false: '#767577', true: '#2196F3' }}
                        thumbColor={agent.autoResponse ? '#ffffff' : '#f4f3f4'}
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Model Configuration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧠 Model Configuration</Text>
            
            <View style={styles.modelCard}>
              <Text style={styles.modelTitle}>LLM Configuration</Text>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Model: GPT-4 Turbo</Text>
                <Text style={styles.modelValue}>Active</Text>
              </View>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Temperature: 0.3</Text>
                <Text style={styles.modelValue}>Conservative</Text>
              </View>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Max Tokens: 2048</Text>
                <Text style={styles.modelValue}>Standard</Text>
              </View>
            </View>
            
            <View style={styles.modelCard}>
              <Text style={styles.modelTitle}>RAG Configuration</Text>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Vector Database: Pinecone</Text>
                <Text style={styles.modelValue}>Connected</Text>
              </View>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Embedding Model: text-embedding-3-small</Text>
                <Text style={styles.modelValue}>Active</Text>
              </View>
              <View style={styles.modelSetting}>
                <Text style={styles.modelLabel}>Similarity Threshold: 0.8</Text>
                <Text style={styles.modelValue}>High Precision</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.buttonContainer}>
            <Button
              text="💾 Save Configuration"
              onPress={saveConfiguration}
              style={[buttonStyles.instructionsButton, { backgroundColor: '#4CAF50' }]}
            />
            
            <Button
              text="🔄 Reset to Defaults"
              onPress={resetToDefaults}
              style={[buttonStyles.backButton, styles.actionButton]}
            />
            
            <Button
              text="🧪 Test Configuration"
              onPress={() => alert('Running configuration test...')}
              style={[buttonStyles.instructionsButton, { backgroundColor: '#2196F3' }, styles.actionButton]}
            />
            
            <Button
              text="← Back to Dashboard"
              onPress={() => router.back()}
              style={[buttonStyles.backButton, styles.actionButton]}
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
  settingCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingItem: {
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e3e3e3',
  },
  settingDescription: {
    fontSize: 12,
    color: '#90CAF9',
    marginTop: 4,
  },
  agentCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  agentInfo: {
    flex: 1,
    marginRight: 15,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 4,
  },
  agentDescription: {
    fontSize: 12,
    color: '#90CAF9',
    lineHeight: 16,
  },
  agentSettings: {
    borderTopWidth: 1,
    borderTopColor: '#64B5F6',
    paddingTop: 15,
    gap: 12,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parameterLabel: {
    fontSize: 13,
    color: '#e3e3e3',
    flex: 1,
  },
  parameterDescription: {
    fontSize: 11,
    color: '#90CAF9',
  },
  sensitivityBar: {
    width: 100,
    height: 6,
    backgroundColor: '#101824',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sensitivityFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  modelCard: {
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#64B5F6',
  },
  modelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e3e3e3',
    marginBottom: 12,
  },
  modelSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modelLabel: {
    fontSize: 13,
    color: '#e3e3e3',
  },
  modelValue: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  actionButton: {
    marginBottom: 10,
  },
};