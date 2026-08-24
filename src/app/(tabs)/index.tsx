import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Challenge = {
  strictness: string;
  days: string;
  startDate: string;
};

export default function Home() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    loadChallenge();
  }, []);

  const loadChallenge = async () => {
    const saved = await AsyncStorage.getItem('currentChallenge');
    if (saved !== null) {
      setChallenge(JSON.parse(saved));
    }
  };

  const getDayNumber = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((today.getTime() - start.getTime()) / msPerDay);
    return daysPassed + 1;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {challenge === null && <Text>You have no challenge right now.</Text>}
      {challenge !== null && (
        <Text style={styles.title}>
          Welcome! You are on day {getDayNumber(challenge.startDate)} of your {challenge.strictness} challenge.
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});