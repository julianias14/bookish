import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';


export default function ChallengesScreen() {
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [numDays, setNum] = useState("");
  
  const strictness = [
      {key:'1', value:'hard'},
      {key:'2', value:'soft'},
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Challenges</Text>

      <Button title="Add Challenge" onPress={() => setShowDropdown(true)} />
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
      </>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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