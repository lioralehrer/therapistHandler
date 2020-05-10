import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import SubGoal from './SubGoal';

const MyGoal = ({ goal, handleTries, handleSuccesses }) => {

    const subgoalsList = Object.keys(goal.subGoals).map((subGoal, i) => {
        return (
            <View>
                <SubGoal
                    subGoal={goal.subGoals[subGoal]}
                    index={i}
                    tries={(num) => handleTries(num, subGoal)}
                    succseses={(num) => handleSuccesses(num, subGoal)} 
                    >
                </SubGoal>
            </View>
        )

    });

    return (
        <View style={styles.view} key={goal.id}>
            <Card
                title={"משימה: " + goal.title + "\n  תיאור: " + goal.description} 
                containerStyle={styles.card}>
                <View style={styles.test01}>
                    {subgoalsList}
                </View>
            </Card>
        </View >
    )
}

export default MyGoal;

const styles = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff69b4',
        backgroundColor: '#fff0f5',
    },
    report: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker: {
        width: 100,
        ...Platform.select({
            android: {
                color: '#89AAFF',
                backgroundColor: '#fff0f5',
            },
        }),
    },
    pickerTitle: {
        color: '#89AAFF',
        fontSize: 15,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    test01: {
        flex: 1,
        backgroundColor: '#fff'

    },
    test02: {
        padding: 10,
        fontSize: 20,
    }
})