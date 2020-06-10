import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, Button, StatusBar, TouchableHighlight,Alert} from 'react-native';
import { globalStyles } from '../styles/global';
import Timer from '../components/Timer';
import MyGoal from '../components/MyGoal';
import TherapistGoalsList from '../components/TherapistGoalList';


export default class Therapist extends Component {
    state = {
        goals: [
            {
                id: Math.random(),
                title: 'מטרה ראשונה',
                description: 'תיאור מטרה ראשונה',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, activities: ['בועות סבון', 'משיכת חבל'] },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, activities: ['כדור'] },
                    { id: 3, text: ' תת 3', checked: false, tries: 0, succseses: 0, activities: ['אופניים'] },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, activities: ['לגו'] }]
            },
            {
                id: Math.random(),
                title: 'מטרה שניה',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, activities: ['צביעה'] },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, activities: ['לחצנים'] },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, activities: ['חמש אבנים'] },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, activities: ['כדור'] }]
            },
            {
                id: Math.random(),
                title: 'מטרה שלישית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, activities: ['קיפולי נייר'] },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, activities: ['הך פטיש'] },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, activities: ['פאזל'] },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, activities: ['גזירת דמויות'] }]
            },
            {
                id: Math.random(),
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, activities: ['הדבקת חול'] },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, activities: ['עיסת נייר'] },
                    { id: 3, text: 'תת 3', checked: false, tries: 0, succseses: 0, activities: ['צביעה'] },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, activities: ['לחצנים'] }]
            },
        ],
        myGoals: [],
        activities: [],
        modalVisible: false,
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
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    paciantPicker = () => {
        alert('blabla')
    }

    render() {
        const { therapistName } = this.props.route.params;
        const { patient } = this.props.route.params;
        const myActivities = this.state.activities.map(act => {
            return (
                <View style={styles.goal}>
                    <Text style={styles.HeaderInsideText}>{act}</Text>
                </View>
            )
        })
        const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
            return <View style={styles.goal}>
                <MyGoal goal={this.state.myGoals[key]}
                    handleTries={(num, subgoal) => this.handleTries(num, subgoal, key)}
                    handleSuccesses={(num, subgoal) => this.handleSuccesses(num, subgoal, key)}
                />
            </View>
        })

        return (
            <View style={styles.container} >
                <StatusBar barStyle='light-content' />
                <ScrollView>
                    <Text style={styles.HeaderInsideText}>
                        שלום {therapistName} {'\n'}
                        המטופל שלך: {patient} {'\n'}
                    </Text>
                    <View style={styles.btnContainer}>
                        <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => this.paciantPicker()}
                        >
                            <Text>  מטופל אחר </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => alert('Yaay!')}
                        >
                            <Text>  פעילויות </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        >
                            <Text>מטרות ופעילויות </Text>
                        </TouchableHighlight>
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.modalVisible}
                            swipeArea={50}
                        >
                            <View style={styles.modal} onStartShouldSetResponder={() => true}>
                                <ScrollView>
                                    <TherapistGoalsList
                                        goals={this.state.goals}
                                        checkedActivity={(activity) => this.checkedActivity(activity)}
                                        checkedGoal={(id) => this.checkedGoal(id)} />
                                    <TouchableHighlight
                                        style={globalStyles.circle}
                                        underlayColor='#ccc'
                                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                    >
                                        <Text > סיים   </Text>
                                    </TouchableHighlight>
                                    <View style={{ flex: 1 }}>
                                    </View>
                                </ScrollView>
                            </View>

                        </Modal>
                    </View>
                    <Timer />
                    {myGoalsList}
                    <View>
                        <Text style={styles.HeaderInsideText}>פעילויות שנבחרו: </Text>
                    </View>
                    {myActivities}
                </ScrollView>
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07121B',
    },

    text: {
        color: '#fff',
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
    }


})