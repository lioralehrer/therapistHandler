import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, Button, StatusBar,TouchableHighlight } from 'react-native';
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
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: ' תת 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שניה',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שלישית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 3, text: 'תת 3', checked: false, tries: 0, succseses: 0, active: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, active: true }]
            },
        ],
        myGoals: [],
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
                            <Text> עדכן פעילויות </Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        >
                            <Text> עדכן משימות   </Text>
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
                                        checkedGoal={(id) => this.checkedGoal(id)} />
                                    {/* TO DO: able to update goals */}
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