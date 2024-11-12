import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../src/pages/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockSetIsAuthenticated = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with correct credentials', async () => {
    const user = {
      email: 'teste@email.com',
      password: 'senha1',
    };

    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(user));

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <LoginScreen setIsAuthenticated={mockSetIsAuthenticated} navigation={{ navigate: mockNavigate }} />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'teste@email.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'senha1');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Main');
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    });
  });

  it('should show error if email or password is incorrect', async () => {
    const user = {
      email: 'teste@email.com',
      password: 'senha1',
    };

    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(user));

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <NavigationContainer>
        <LoginScreen setIsAuthenticated={mockSetIsAuthenticated} navigation={{ navigate: mockNavigate }} />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('E-mail'), 'erro@email.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'errado1');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(getByTestId('error-message')).toBeTruthy();
    });
  });

  it('should show error if no user is registered', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <LoginScreen setIsAuthenticated={mockSetIsAuthenticated} navigation={{ navigate: mockNavigate }} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(getByTestId('error-message')).toBeTruthy();
    });
  });
});