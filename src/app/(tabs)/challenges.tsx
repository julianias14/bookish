import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';

type Challenge = {
  strictness: string;
  days: string;
  startDate: string;
};

export default function ChallengesScreen() {
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [numDays, setNum] = useState("");
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

  const strictness = [
    { key: '1', value: 'hard' },
    { key: '2', value: 'soft' },
  ]

  const onSave = async () => {
    if (selected === "" || numDays === "") {
      alert('Please fill in both fields before saving.');
      return;
    }
    const newChallenge = {
      strictness: selected,
      days: numDays,
      startDate: new Date().toISOString(),
    };

    await AsyncStorage.setItem('currentChallenge', JSON.stringify(newChallenge));
    setChallenge(newChallenge);
    alert('Challenge saved!');
  };

  const onEditPress = () => {
    if (challenge !== null) {
        setSelected(challenge.strictness);
        setNum(challenge.days);
    }
    setShowDropdown(true);
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>All Challenges</Text>

        {challenge === null && (
          <Button title="Add Challenge" onPress={() => setShowDropdown(true)} />
        )}

        {challenge !== null && (
            <Button title="Edit Challenge" onPress={onEditPress} />
        )}

        {showDropdown && (
          <>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={strictness}
              save="value"
            />
            <Text style={styles.result}>You picked: {selected}</Text>
            <TextInput
              placeholder="Enter a number"
              value={numDays}
              onChangeText={setNum}
              keyboardType="numeric"
            />
            <Text style={styles.result}>Number entered: {numDays}</Text>
            <Button title="Save" onPress={onSave} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 16,
  },
});