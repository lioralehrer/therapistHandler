import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global'
import Timer from '../components/Timer';
import MyGoal from '../components/MyGoal';
import GoalsList from '../components/GoalsList';
import Reports from '../components/Reports';
import TherapistHeader from '../components/TherapistHeader';
import SessionConfig from '../components/SessionConfig';
import StartSession from '../components/StartSession';

export default class Manager extends Component {
    state = {
        goals: [
            {
                serialNum: 1,
                id: Math.random(),
                title: '  שפה רצפטיבית',
                description: "כאשר המבוגר יבקש מירדן להביא אובייקט מסוים שנמצא בחדר ומצריך חיפוש כלשהו על מנת לאתרו, ירדן תחפש את האובייקט ותביא אותו ",
                checked: false,
                TherapistsConnected: ["קורל", "הדר", "מאי"],
                activities: ["בועות סבון", "לגו", "פאזל", "צביעה"],
                environment:['בית'],
                arcived: false,
                subGoals: [ 
                    { id: 1, text: 'תת 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, text: 'תת 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, text: ' תת 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, text: 'תת 4', done: "", tries: 0, succseses: 0 }]
            },
            {
                serialNum: 2,
                id: Math.random(),
                title: 'מטרה שניה',
                description: 'מטרה שנמחקת לא תוצג בעדכון רשימה',
                checked: false,
                TherapistsConnected: ["קורל", "הדר", "מאי"],
                activities: ["מחיאות כפיים", "גולות", "לחצנים", "כדור"],
                environment:["בית"],
                arcived: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, text: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, text: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, text: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }]
            },
            {
                serialNum: 3,
                id: Math.random(),
                title: 'מטרה שלישית',
                description: 'הכניסי ID קיים למטרה קיימת',
                checked: false,
                TherapistsConnected: ["קורל", "הדר", "מאי", "עדי"],
                activities: ["מחיאות כפיים", "גולות", "לחצנים", "כדור"],
                environment:["חצר"],
                arcived: false,
                subGoals: [
                    { id: 1, text: 'בדקי שעובד  ', done: "", tries: 0, succseses: 0 },
                    { id: 2, text: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, text: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, text: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }]
            },
            {
                serialNum: 4,
                id: Math.random(),
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                checked: false,
                TherapistsConnected: ["קורל", "הדר", "מאי", "עדי"],
                activities: ["מחיאות כפיים", "גולות", "לחצנים", "כדור"],
                environment:["גינה"],
                arcived: false,
                subGoals: [
                    { id: 1, text: 'תת 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, text: 'תת 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, text: 'תת 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, text: 'תת 4', done: "", tries: 0, succseses: 0 }]
            },
        ],
        myGoals: [],
        environment:[{title:'חצר'},{title:'בית'},{title:'גינה'},{title:'רחוב'}],
        activities: [{title:'חריזה'},{title:'לגו'},{title:'גזירה'}, {title:'כדור' }],
        modalVisible01: false,
        modalVisible02: false,
        modalVisible03: false,
        modalVisible04: false,
    }
    checkedGoal = (id) => {
        let goals = this.state.goals;
        goals.forEach((goal) => { id == goal.id ? goal.checked = !goal.checked : '' })
        this.setState({
            goals: goals,
            myGoals: [...goals.filter(goal => goal.checked)],
        })

    }
    checkedActivity = (activity) => {
        let activities = this.state.activities;
        let exist = activities.includes(activity);
        if (!exist) {
            activities.push(activity);
            this.setState({
                activities: activities
            })
        }
        alert(activity + " נבחר ");
    }
    handleTries = (num, subgoal, key) => {
        let goals = this.state.goals;
        goals[key].subGoals[subgoal].tries = num.toString();
        this.setState({
            goals: goals,
            mygoals: [...goals.filter(goal => goal.checked)]
        })
    }
    handleSuccesses = (num, subgoal, key) => {
        let goals = this.state.goals;
        goals[key].subGoals[subgoal].succseses = num.toString();
        this.setState({
            goals: goals,
            mygoals: [...goals.filter(goal => goal.checked)]
        })
    }

    handleGoal = (goal) => {
        let goals = this.state.goals;
        let objectIndex = this.state.goals.findIndex(go => go.id == goal.id)
        if (objectIndex >= 0) {
            goals[objectIndex] = goal;
        } else {
            goals.push(goal)
        }
        this.setState({
            goals: goals
        })
        this.forceUpdate();
    }
    deleteGoal = (id) => {
        // let goals = [...this.state.goals.filter(goal => goal.id != id)];
        let goals = [...this.state.goals];
        let foudIndex = goals.findIndex((goal)=> goal.id == id);
        goals[foudIndex].arcived = true;
        this.setState({
            goals: goals
        })
        this.forceUpdate();
    }
    setModalVisible01(visible) {
        this.setState({ modalVisible01: visible });
    }
    setModalVisible02(visible) {
        this.setState({ modalVisible02: visible });
    }
    setModalVisible03(visible) {
        this.setState({ modalVisible03: visible });
    }
    setModalVisible04(visible) {
        this.setState({ modalVisible04: visible });
    }

    render() {
        const { managerName } = this.props.route.params;
        const { patient } = this.props.route.params;
        const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
            return <View style={styles.goal}>
                <MyGoal goal={this.state.myGoals[key]}
                    handleTries={(num, subgoal) => this.handleTries(num, subgoal, key)}
                    handleSuccesses={(num, subgoal) => this.handleSuccesses(num, subgoal, key)}
                />
            </View>
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TherapistHeader userName={managerName} lastPatient={patient}></TherapistHeader>
                    <SessionConfig
                        title="מה תרצי לעשות ?"
                        icon01="bullseye"
                        icon02="calendar-check-o"
                        btn01Title="מטרות ופעילויות"
                        btn02Title="דוחות"
                        onPressBtn01={() => this.setModalVisible01(!this.state.modalVisible01)}
                        onPressBtn02={() => this.setModalVisible02(!this.state.modalVisible02)}
                    />
                    <SessionConfig
                        title="או"
                        icon01="user-circle"
                        icon02="life-buoy"
                        btn01Title="תכנון שבועי"
                        btn02Title="התחילי טיפול"
                        onPressBtn01={() => this.setModalVisible03(!this.state.modalVisible03)}
                        onPressBtn02={() => this.setModalVisible04(!this.state.modalVisible04)}
                    />

                    {/* Modal for Goals and Activities */}
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible01}
                        swipeArea={50}
                    >
                        <View style={styles.modal} onStartShouldSetResponder={() => true}>
                            <ScrollView>
                            <View style={globalStyles.modalContainer}>
                                <GoalsList
                                    // activities = {this.state.activities}
                                    goals={this.state.goals.filter(goal => goal.arcived != true)}
                                    newGoal={(goal) => this.handleGoal(goal)}
                                    deleteGoal={(id) => this.deleteGoal(id)}
                                />
                                <SessionConfig
                                    title=""
                                    icon01="pencil-square-o"
                                    icon02="home"
                                    btn01Title="פעילויות "
                                    btn02Title=" חזרה לראשי"
                                    onPressBtn01={() => Alert.alert("TO DO Activities")}
                                    onPressBtn02={() => this.setModalVisible01(!this.state.modalVisible01)}
                                />
                               
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>
                    {/* Modal for Reports */}
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible02}
                        swipeArea={50}
                    >
                        <View style={styles.modal} onStartShouldSetResponder={() => true}>
                            <ScrollView>
                                <SessionConfig
                                    title=""
                                    icon01="pencil-square-o"
                                    icon02="home"
                                    btn01Title="צפייה בטיפולים קודמים"
                                    btn02Title=" חזרה לראשי"
                                    onPressBtn01={() => Alert.alert("TO DO")}
                                    onPressBtn02={() => this.setModalVisible02(!this.state.modalVisible02)}
                                />
                                <TouchableHighlight
                                    style={globalStyles.circle}
                                    underlayColor='#ccc'
                                    onPress={() => this.setModalVisible02(!this.state.modalVisible02)}
                                >
                                    <Text > סיים   </Text>
                                </TouchableHighlight>
                                <View style={{ flex: 1 }}>
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>
                    {/* Modal for Planing  Session */}
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible03}
                        swipeArea={50}
                    >
                        <View style={styles.modal} onStartShouldSetResponder={() => true}>
                            <ScrollView>
                                <SessionConfig
                                    title=""
                                    icon01="pencil-square-o"
                                    icon02="home"
                                    btn01Title=" "
                                    btn02Title=" חזרה לראשי"
                                    onPressBtn01={() => Alert.alert("TO DO")}
                                    onPressBtn02={() => this.setModalVisible03(!this.state.modalVisible03)}
                                />
                                <TouchableHighlight
                                    style={globalStyles.circle}
                                    underlayColor='#ccc'
                                    onPress={() => this.setModalVisible03(!this.state.modalVisible03)}
                                >
                                    <Text > סיים   </Text>
                                </TouchableHighlight>
                                <View style={{ flex: 1 }}>
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>
                    {/* Modal for Starting Session */}
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible04}
                        swipeArea={50}
                    >

                        <View style={styles.modal} onStartShouldSetResponder={() => true}>
                            <ScrollView>
                                <StartSession
                                    userName={managerName}
                                    goals={this.state.goals}
                                    checkedActivity={(activity) => this.checkedActivity(activity)}
                                    checkedGoal={(id) => this.checkedGoal(id)}
                                />

                                <SessionConfig
                                    title=""
                                    icon01="pencil-square-o"
                                    icon02="home"
                                    btn01Title=" "
                                    btn02Title=" חזרה לראשי"
                                    onPressBtn01={() => Alert.alert("TO DO")}
                                    onPressBtn02={() => this.setModalVisible04(!this.state.modalVisible04)}
                                />
                                <View style={{ flex: 1 }}>
                                </View>
                            </ScrollView>
                        </View>

                    </Modal>
                </ScrollView>
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    HeaderInsideText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        margin: 10,

    },
    therapistList: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    modal: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#4c2a4c'
    },
    activityButton: {
        flex: 0.8,
        maxHeight: 170,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
    },
    buttonText: {
        color: 'darkslateblue',
        fontFamily: 'sans-serif',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 18,
    },
    buttonIcon: {

    },
    configContainer: {
        flex: 1,
        // margin: 20,
        marginTop: 30,
        // paddingTop: 30,
    },
    text: {
        fontSize: 20,
        fontFamily: 'sans-serif-light',
        color: '#555',
        textAlign: 'center',
    },
    buttonsContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    goalsButton: {
        flex: 0.8,
        maxHeight: 170,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
        marginLeft: 6,
    },
    activityButton: {
        flex: 0.8,
        maxHeight: 170,
        justifyContent: 'center',
        backgroundColor: '#c2bad8',
        marginLeft: 6,
        marginRight: 6,
    },
    button: {
        // padding: 12,
    },
    buttonText: {
        color: 'darkslateblue',
        fontFamily: 'sans-serif',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 18,
    },
    goalsIcon: {
        fontSize: 95,
        color: 'darkslateblue',
        textAlign: 'center',
    },
    activityIcon: {
        fontSize: 95,
        paddingLeft: 29,
        color: 'darkslateblue',
        textAlign: 'center',
    },
    textWrapper: {
        flex: 0.1,
        justifyContent: 'center',
        maxWidth: 30,
        maxHeight: 120,
        margin: 10,

    },
})