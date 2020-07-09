import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global'
import TherapistHeader from '../components/TherapistHeader';
import SessionConfig from '../components/SessionConfig';
import PlanSessions from '../sessions/PlanSessions';
// import ActivitySelection from '../components/ActivitySelection '
import UpperMenu from '../components/Headers/UpperMenu';
// import StarSessionButton from '../components/StartSessionButton ';
import { SessionProvider } from '../context/SessionContext';
import { SkillProvider } from '../context/SkillContext';
import { GoalProvider } from '../context/GoalContext'
import Acquired from '../components/form/Acquired';
import PlanProgram from '../components/form/PlanProgram';
import GoalList from '../components/list/GoalList';

export default class Manager extends Component {
    state = {
        goals: [
            {
                serialNum: 1,
                id: Math.random(),
                skillType: '  שפה רצפטיבית',
                title: 'מטרה 1',
                description: "כאשר המבוגר יבקש מירדן להביא אובייקט מסוים שנמצא בחדר ומצריך חיפוש כלשהו על מנת לאתרו, ירדן תחפש את האובייקט ותביא אותו ",
                activities: [{ title: 'מגלשה', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
                arcived: false,
                subGoals: [
                    { id: 1, title: 'תת 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, title: 'תת 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, title: ' תת 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, title: 'תת 4', done: "", tries: 0, succseses: 0 }],
                numOfTherapists: 1,
                numOfDays: 4,
            },
            {
                serialNum: 2,
                id: Math.random(),
                skillType: 'כישורים חברתיים',
                title: 'מטרה שניה',
                description: '0במהלך פעילות תנועה או פעילות משחקית, ירדן תשתף את המבוגר בפעילות באופן מילולי המלווה במבט. היא תעשה זאת בלפחות שתי פעילויות שונות, עם שני מבוגרים שונים, לאורך 3 ימים עוקבים.")',
                checked: false,
                TherapistsConnected: ["קורל", "הדר", "מאי"],
                activities: [{ title: 'גואש', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
                arcived: false,
                subGoals: [
                    { id: 1, title: 'תת מטרה 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, title: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, title: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, title: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }],
                numOfTherapists: 2,
                numOfDays: 3,
            },
            {
                serialNum: 3,
                id: Math.random(),
                skillType: 'שפה אקספרסיבית',
                title: 'מטרה שלישית',
                description: 'במהלך משחק משותף, כאשר המבוגר מציג לירדן תמונות\ציורים של דמויות עצובות\שמחות, ירדן תשיים אותן ותגיש למבוגר את התמונה\ציור הנכונים ע""פ בקשה מסוימת כגון ""תני לי אופיר עצובה"", עבור 5 דמויות שונות. היא תעשה זאת עם שני מבוגרים שונים, לאורך 3 ימים עוקבים.")',
                activities: [{ title: 'פאזל', description: '', environments: { default: 'חדר טיפולים', more: ['env1', 'env2'] } }, { title: 'כדור', description: '', environments: { default: '', more: [] } }],
                arcived: false,
                subGoals: [
                    { id: 1, title: 'בדקי שעובד  ', done: "", tries: 0, succseses: 0 },
                    { id: 2, title: 'תת מטרה 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, title: 'תת מטרה 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, title: 'תת מטרה 4', done: "", tries: 0, succseses: 0 }],
                numOfTherapists: 3,
                numOfDays: 3,
            },
            {
                serialNum: 4,
                id: Math.random(),
                skillType: 'קשב משותף',
                title: 'מטרה רביעית',
                description: 'בלהבהבךבב',
                activities: [{ title: 'חרוזים', description: '', environments: { default: 'חדר טיפולים', more: [] } }],
                arcived: false,
                subGoals: [
                    { id: 1, title: 'תת 1', done: "", tries: 0, succseses: 0 },
                    { id: 2, title: 'תת 2', done: "", tries: 0, succseses: 0 },
                    { id: 3, title: 'תת 3', done: "", tries: 0, succseses: 0 },
                    { id: 4, title: 'תת 4', done: "", tries: 0, succseses: 0 }],
                numOfTherapists: 3,
                numOfDays: 3,

            },
        ],
        myGoals: [],
        environment: [{ title: 'חצר' }, { title: 'בית' }, { title: 'גינה' }, { title: 'רחוב' }],
        activities: [{ title: 'חריזה' }, { title: 'לגו' }, { title: 'גזירה' }, { title: 'כדור' }],
        modalVisible01: false,
        modalVisible02: false,
        modalVisible03: false,
        modalVisible04: false,
        visibleSyllabus : true,
        visiblePlan: false,
        visibleGoalList : false,
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
        let foudIndex = goals.findIndex((goal) => goal.id == id);
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
    setVisiblePlan(visiblePlan) {
        this.setState({ visiblePlan: visiblePlan });
    }
    setVisibleGoalList(visibleGoalList){
        this.setState({visibleGoalList : visibleGoalList})
        if (visibleGoalList){
            this.setState({visiblePlan : false, visibleSyllabus : false})
        }else {
            this.setState({visibleSyllabus : true})
        }
    }


    render() {
        const { managerName } = this.props.route.params;
        const { patient } = this.props.route.params;
        // const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
        //     key=value;
        //     return <View style={styles.goal}>
        //         <MyGoal goal={this.state.myGoals[key]}
        //             handleTries={(num, subgoal) => this.handleTries(num, subgoal, key)}
        //             handleSuccesses={(num, subgoal) => this.handleSuccesses(num, subgoal, key)}
        //         />
        //     </View>
        // })
        return (
            <SessionProvider>
                <View style={styles.container}>
                    <ScrollView>
                        <UpperMenu />
                        <TherapistHeader userName={managerName} lastPatient={patient}></TherapistHeader>
                        <SessionConfig
                            title="מה תרצי לעשות ?"
                            icon01="bullseye"
                            icon02="calendar-check-o"
                            btn01Title="בניית תוכנית אישית"
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

                        {/* Modal of Planning Goals and Activities for 12 weeks */}
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.modalVisible01}
                            swipeArea={50}
                        >
                            <View style={styles.modal} onStartShouldSetResponder={() => true}>
                                <ScrollView>
                                    <View style={globalStyles.modalContainer}>
                                        <SkillProvider>
                                            <GoalProvider>
                                               {this.state.visibleSyllabus && <Acquired handleVisible={(visiblePlan) => this.setVisiblePlan(visiblePlan)} /> } 
                                                {this.state.visibleGoalList && <GoalList />}
                                                {this.state.visiblePlan &&  <PlanProgram />}
                                            </GoalProvider>
                                        </SkillProvider>
                                        {/* <GoalsList
                                            goals={this.state.goals.filter(goal => goal.arcived != true)}
                                            newGoal={(goal) => this.handleGoal(goal)}
                                            deleteGoal={(id) => this.deleteGoal(id)}
                                        /> */}

                                        <View style={{ margin: 10, padding: 15, width: 200 ,flexDirection:'row', alignSelf:'center'}}>
                                            <Button onPress={() => this.setModalVisible01(!this.state.modalVisible01)} title="Go Back"  />
                                       <Button title={this.state.visibleGoalList ? 'close goalList' : 'GoalList'} onPress={()=>this.setVisibleGoalList(!this.state.visibleGoalList)}  color='#5f9ea0'/>
                                        </View>
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
                                    <View style={globalStyles.modalContainer}>
                                        <PlanSessions />
                                        <View style={{ margin: 10, padding: 5, width: 100 }}>
                                            <Button onPress={() => this.setModalVisible03(!this.state.modalVisible03)} title="Go Back" />
                                        </View>

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
                                    {/* <StartSession
                                    userName={managerName}
                                    goals={this.state.goals}
                                    checkedActivity={(activity) => this.checkedActivity(activity)}
                                    checkedGoal={(id) => this.checkedGoal(id)}
                                /> */}
                                    <View style={styles.container}>
                                        <UpperMenu />
                                        <TherapistHeader />
                                        {/* <ActivitySelection />   */}
                                        {/* <StarSessionButton /> */}
                                    </View>

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
            </SessionProvider>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#07121B',
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
        marginTop: 30,
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