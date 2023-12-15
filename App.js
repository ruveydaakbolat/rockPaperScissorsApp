import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import color from './constants/color';
import choices from './data/mockData';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = choice => {
    setUserChoice(choice);
    randomComputerChoice(choice);
  };

  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computerChoiceText) => {
    if (user?.name === computerChoiceText?.name) {
      setResult('Berabere!');
    } else if (
      (user?.name === 'Taş' && computerChoiceText?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computerChoiceText?.name === 'Taş') ||
      (user?.name === 'Makas' && computerChoiceText?.name === 'Kağıt')
    ) {
      setResult('Kazandınız!');
    } else {
      setResult('Kaybettiniz!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.backgroundColor}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.computerChoiceText}>Kullanıcının Seçimi:</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleUserChoice(choice)}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.buttonActive]
                  : styles.button
              }>
              <Image source={choice?.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.computerChoiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: {marginVertical: 20, fontSize: 20, color: '#fff'},
  choice: {},
  button: {padding: 10, borderRadius: 10, backgroundColor: color.white},
  buttonActive: {borderWidth: 1},
  choices: {flexDirection: 'row', justifyContent: 'space-around', gap: 10},
  image: {width: 90, height: 90},
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: color.white,
  },
});
