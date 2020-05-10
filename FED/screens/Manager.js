import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button } from 'react-native';
import { globalStyles } from '../styles/global'
import Timer from '../components/Timer';
import MyGoal from '../components/MyGoal';
import GoalsList from '../components/GoalsList';
import Reports from '../components/Reports';

export default class Manager extends Component {
    state = {
        goals: [
            {
                id: Math.random(),
                title: ' לעדכן מטרות',
                description: 'תיאור מטרה ראשונה',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 3, text: ' תת 3', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, activities: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שניה',
                description: 'מטרה שנמחקת לא תוצג בעדכון רשימה',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת מטרה 1', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, activities: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה שלישית',
                description: 'הכניסי ID קיים למטרה קיימת',
                checked: false,
                subGoals: [
                    { id: 1, text: 'בדקי שעובד  ', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 2, text: 'תת מטרה 2', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 3, text: 'תת מטרה 3', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 4, text: 'תת מטרה 4', checked: false, tries: 0, succseses: 0, activities: true }]
            },
            {
                id: Math.random(),
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                checked: false,
                subGoals: [
                    { id: 1, text: 'תת 1', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 2, text: 'תת 2', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 3, text: 'תת 3', checked: false, tries: 0, succseses: 0, activities: true },
                    { id: 4, text: 'תת 4', checked: false, tries: 0, succseses: 0, activities: true }]
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
        alert(objectIndex)
        this.forceUpdate();
    }
    deleteGoal = (id) => {
        let goals = [...this.state.goals.filter(goal => goal.id != id)];
        this.setState({
            goals: goals
        })
        this.forceUpdate();
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    paciantPicker = () => {
        alert('blabla')
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
                    <Text style={styles.HeaderInsideText}>
                        שלום {managerName} {'\n'}
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
                            <Text> עדכן מטרות   </Text>
                        </TouchableHighlight>
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.modalVisible}
                            swipeArea={50}
                        >
                            <View style={styles.modal} onStartShouldSetResponder={() => true}>
                                <ScrollView>
                                    <GoalsList
                                        goals={this.state.goals}
                                        newGoal={(goal) => this.handleGoal(goal)}
                                        deleteGoal={(id) => this.deleteGoal(id)}
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
                    {/* <Reports /> */}
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
    }
})