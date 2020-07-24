import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { SessionContext } from '../../context/SessionContext'

// "goals": [{"activities": [Array], "archived": false, "defaultEnv": "ים", "description": "אחלו להם כל טוב", "id": 0.2390894902286022, "minConsecutiveDays": 4, "minTherapists": 3, "serialNum": 1, "skillType": "משחק", "subGoals": [Array]}
const SessionItem = ({ session }) => {
    const { deleteSession } = useContext(SessionContext);
  
    return (
        <TouchableOpacity style={styles.goal}>
            <View style={styles.goalView}>
                <Text style={styles.goalTitle}>{session.scheduledAt.toLocaleString()} </Text>
                <Text style={styles.goalTitle}>שם המטפל/ת: {session.therapist} </Text>
                <Text>מטרות:</Text>
                <FlatList
                    data={session.goals}
                    renderItem={(goal) => <Text style={styles.goalActivity}>{goal.item.description}</Text>}
                    // renderItem={(goal) => {console.log("goal: "), console.log(goal)}}
                    keyExtractor={item => item.id}
                />
                <Text>פעילויות: </Text>
                <FlatList style={styles.activitiesList}
                    data={session.activities}
                    renderItem={(act) => <Text style={styles.goalActivity}>{act.item}</Text>}
                    horizontal={true}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.goalTitle}>{session.sessionPlanMessage} </Text>
            </View>
            <View style={{ margin: 10, padding: 5, width: 100 }}>
                <Button
                    onPress={() => deleteSession(session.id)}
                    title=" מחקי  " />
            </View>
        </TouchableOpacity>
    )
}

export default SessionItem;

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