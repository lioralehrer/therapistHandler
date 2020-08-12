import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, FlatList, Button, Alert, Modal } from 'react-native';
import { GoalContext } from '../../context/GoalContext';
import PlanProgram from '../form/PlanProgram';

const GoalItem = ({ goal }) => {
    const { deleteGoal } = useContext(GoalContext);
    const [visible, setVisible] = useState(false)
    const updateGoal = () => {
        console.log(goal)
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
                    <View style={{ width: '100%', height: '100%' }}>
                        <PlanProgram goal={goal} closeForm={(f)=>setVisible(f)}/>

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

            < TouchableOpacity style={styles.goal}>
                <View style={styles.goalView}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={styles.num}>  {goal.serialNum}  </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text >תחום : </Text>
                        <Text style={styles.goalTitle}>{goal.skillType}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.goalTitle}> {goal.description} </Text>
                    </View>
                    <Text> תת מטרות : </Text>
                    <FlatList
                        data={goal.subGoals}
                        renderItem={(subgoal) => <Text style={styles.goalActivity}>{subgoal.item.title}</Text>}
                    />
                    <Text>פעילויות: </Text>
                    <FlatList style={styles.activitiesList}
                        data={goal.activities}
                        renderItem={(act) =>
                            <TouchableWithoutFeedback>
                                <TouchableOpacity onPress={() => Alert.alert(act.item.description)}>
                                    <Text style={styles.goalActivity}>{act.item.title}</Text>
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>
                        }
                        horizontal={true}
                    />
                    <Text style={styles.goalTitle}> סביבה דיפולטיבית : {goal.defaultEnv} </Text>
                </View>
                <View style={styles.btn}>
                    <Button
                        onPress={() => deleteGoal(goal.id)}
                        title=" מחקי  "
                        color='#9370db' />
                    <Button
                        onPress={() => updateGoal(goal)}
                        title=" update  "
                        color='#9370db' />

                </View>
            </TouchableOpacity>

        </View>
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
        // flex: 1,
        // justifyContent: 'space-between',
    },
    goalInfo: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row-reverse',
        alignContent: 'flex-start',
    },
    num: {
        fontSize: 20,
        fontWeight: '600',
        color: '#9370db',
    },
    goalTitle: {
        // flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
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
        height: 20,
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