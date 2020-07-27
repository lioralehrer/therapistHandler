import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet, Button, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { GoalContext } from '../../context/GoalContext';
import SelectedItem from '../item/SelectedItem';

const SelectGoals = ({ clear, handleGoals }) => {
    const { goals } = useContext(GoalContext);
    const [visible, setVisible] = useState(false);
    const [selectedGoals, setSelectedGoals] = useState([])
   

    const handleItem = (bool, item) => {
        if (bool) {
            if (!selectedGoals.includes(item)) {
                setSelectedGoals([...selectedGoals, item])
            }
        }
        else {
            if (selectedGoals.includes(item)) {
                setSelectedGoals(selectedGoals.filter((goal) => goal.id !== item.id));
            }
        }

    }
    const onSubmit = () => {
        Alert.alert("handleGoals");
        console.log(selectedGoals);
        handleGoals(selectedGoals);

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={styles.btn}
            >
                <Text style={{ color: 'blue', fontSize: 20 }}> בחרי מטרות</Text>
            </TouchableOpacity>
            {visible &&
                <View style={styles.container}>
                    <View style={styles.goalsList}>
                        <FlatList
                            data={goals}
                            renderItem={({ item }) => <SelectedItem clear={clear} item={item} handleItem={(bool) => handleItem(bool, item)} />}
                            keyExtractor={item => item.id}
                            onPress={(id) => Alert.alert("pressed: change background color, and take the id")}
                        />
                    </View>
                    <Button title='שמירה' onPress={(selectedGoals) => onSubmit(selectedGoals)} color="#841584" />
                </View>
            }
        </SafeAreaView>
    )

}

export default SelectGoals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goalsList: {
        backgroundColor: 'wheat',
        paddingTop: 2,
    },
    btn: {
        height: 30,
        padding: 5,
        backgroundColor: 'lavender',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    }
})