import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, TouchableWithoutFeedback, Modal, TouchableHighlight } from 'react-native';
import { SessionContext } from '../../context/SessionContext';
import { AddSession } from '../../sessions/AddSession';
import { globalStyles } from '../../styles/global';

// "goals": [{"activities": [Array], "archived": false, "defaultEnv": "ים", "description": "אחלו להם כל טוב", "id": 0.2390894902286022, "minConsecutiveDays": 4, "minTherapists": 3, "serialNum": 1, "skillType": "משחק", "subGoals": [Array]}
const SessionItem = ({ session }) => {
    const { deleteSession } = useContext(SessionContext);
    const [visible, setVisible] = useState(false);
    const updateSession = () => {
        setVisible(true)
    }
    return (
        <View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}>
                <View style={{ marginTop: 22 }}>
                    <View >
                        <AddSession oldsession={session} closeForm={(f) => setVisible(f)} />
                        <TouchableHighlight
                            style={styles.back}
                            onPress={() => {
                                setVisible(!visible);
                            }}>
                            <Text>BACK  </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.goal}>
                <View style={styles.goalView}>
                    <Text style={styles.goalTitle}>{session.scheduledAt.toLocaleString()} </Text>
                    <Text style={styles.goalTitle}>שם המטפל/ת: {session.therapist} </Text>
                    <Text>מטרות:</Text>
                    <FlatList
                        data={session.goals}
                        renderItem={(goal) => <Text style={styles.goalActivity}>{goal.item.description}</Text>}
                        keyExtractor={item => item.id}
                    />

                    <Text>פעילויות: </Text>
                    <FlatList style={styles.activitiesList}
                        data={session.activities}
                        renderItem={(act) =>
                            <TouchableWithoutFeedback>
                                <TouchableOpacity onPress={() => Alert.alert(act.item.description)}>
                                    <Text style={styles.goalActivity}> {act.item.title}</Text>
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>

                        }
                        horizontal={true}
                        keyExtractor={item => item.id}
                    />

                    <Text style={styles.goalTitle}>{session.sessionPlanMessage} </Text>
                </View>
                <View style={styles.btn}>
                    <Button
                        onPress={() => deleteSession(session.id)}
                        title=" מחקי  "
                        color='#9370db'
                    />
                    <Button
                        onPress={() => updateSession(session)}
                        title=" update  "
                        color='#9370db'
                    />
                </View>
            </TouchableOpacity>
        </View>
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
    },
    btn: {
        margin: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        backgroundColor: '#5f9ea0',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})