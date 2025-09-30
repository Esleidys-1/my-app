import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

export function CustomAlert({ visible, title, message, onClose, type = 'info' }: CustomAlertProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return { light: '#4CAF50', dark: '#2E7D32' };
      case 'error':
        return { light: '#F44336', dark: '#C62828' };
      default:
        return { light: '#2196F3', dark: '#1565C0' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ThemedView style={styles.alertContainer}>
          <View style={styles.header}>
            <Text style={styles.icon}>{getIcon()}</Text>
            <ThemedText type="defaultSemiBold" style={styles.title}>
              {title}
            </ThemedText>
          </View>
          
          <ThemedText style={styles.message}>
            {message}
          </ThemedText>
          
          <TouchableOpacity 
            style={[
              styles.button,
              { 
                backgroundColor: type === 'success' ? '#4CAF50' : 
                                type === 'error' ? '#F44336' : '#2196F3' 
              }
            ]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'left',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});