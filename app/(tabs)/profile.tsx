//Mi nueva vista
import { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomAlert } from '@/components/custom-alert';

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    telefono: '',
    correo: ''
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.cedula || !formData.nombre || !formData.telefono || !formData.correo) {
      return 'Por favor, complete todos los campos';
    }

    if (!/^\d+$/.test(formData.cedula)) {
      return 'La cédula debe contener solo números';
    }

    if (!/^\d+$/.test(formData.telefono)) {
      return 'El teléfono debe contener solo números';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      return 'Por favor, ingrese un correo electrónico válido';
    }

    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    
    if (error) {
      setAlertType('error');
      setAlertTitle('Error de Validación');
      setAlertMessage(error);
      setAlertVisible(true);
    } else {
      setAlertType('success');
      setAlertTitle('¡Registro Exitoso!');
      setAlertMessage(
        `Sus datos han sido registrados correctamente:\n\n` +
        `Cédula: ${formData.cedula}\n` +
        `Nombre: ${formData.nombre}\n` +
        `Teléfono: ${formData.telefono}\n` +
        `Correo: ${formData.correo}`
      );
      setAlertVisible(true);
      
      // NO limpiamos el formulario inmediatamente, lo haremos después de cerrar la alerta
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    
    // Solo limpiamos el formulario si fue un registro exitoso
    if (alertType === 'success') {
      setFormData({
        cedula: '',
        nombre: '',
        telefono: '',
        correo: ''
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Registro de Usuario
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Complete sus datos personales
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        {/* Campo Cédula */}
        <ThemedView style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Cédula *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su cédula"
            placeholderTextColor="#999"
            value={formData.cedula}
            onChangeText={(text) => handleInputChange('cedula', text)}
            keyboardType="numeric"
          />
        </ThemedView>

        {/* Campo Nombre */}
        <ThemedView style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Nombre Completo *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre completo"
            placeholderTextColor="#999"
            value={formData.nombre}
            onChangeText={(text) => handleInputChange('nombre', text)}
            autoCapitalize="words"
          />
        </ThemedView>

        {/* Campo Teléfono */}
        <ThemedView style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Teléfono *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su teléfono"
            placeholderTextColor="#999"
            value={formData.telefono}
            onChangeText={(text) => handleInputChange('telefono', text)}
            keyboardType="phone-pad"
          />
        </ThemedView>

        {/* Campo Correo */}
        <ThemedView style={styles.inputGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Correo Electrónico *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo electrónico"
            placeholderTextColor="#999"
            value={formData.correo}
            onChangeText={(text) => handleInputChange('correo', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </ThemedView>

        {/* Botón de Registro */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <ThemedText style={styles.buttonText}>
            Registrar Datos
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Alerta Personalizada */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        onClose={handleAlertClose}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  formContainer: {
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '50%',
    backgroundColor: '#0b396aff',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});