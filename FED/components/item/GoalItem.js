import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { GoalContext } from '../../context/GoalContext'

const GoalItem = ({ goal }) => {
    const { deleteGoal } = useContext(GoalContext);
    return (
        <TouchableOpacity style={styles.goal}>
            <View style={styles.goalView}>
                <Text style={styles.goalTitle}>  {goal.serialNum}   תחום: {goal.skillType} </Text>
                <Text style={styles.goalTitle}> {goal.description} </Text>
                <Text> תת מטרות : </Text>
                <FlatList
                    data={goal.subGoals}
                    renderItem={(subgoal) => <Text style={styles.goalActivity}>{subgoal.item.title}</Text>}
                />
                <Text>פעילויות: </Text>
                <FlatList style={styles.activitiesList}
                    data={goal.activities}
                    renderItem={(act) => <Text style={styles.goalActivity}>{act.item.title}</Text>}
                    horizontal={true}
                /> 
                <Text style={styles.goalTitle}> סביבה דיפולטיבית : {goal.defaultEnv} </Text>
            </View>
            <View style={{ margin: 10, padding: 5, width: 100 }}>
                <Button
                    onPress={() => deleteGoal(goal.id)}
                    title=" מחקי  " />
            </View>
        </TouchableOpacity>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    goal: {
        padding: 15,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 2,
        marginLeft: 11,
        marginRight: 11,
    },
    goalView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    goalInfo: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row-reverse',
        alignContent: 'flex-start',
    },
    goalTitle: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        height: 20,
    },
    activitiesList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 5,
    },
    goalActivity: {
        flexWrap: 'wrap',
        backgroundColor: "wheat",
        borderRadius: 3,
        margin: 3,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        fontSize: 12,
        // textAlign: 'center',
        height: 20,
    },
})