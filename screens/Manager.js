import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button } from 'react-native';
import MyHeader from '../components/MyHeader';
import MissionCheckbox from '../components/MissionCheckbox';
import Mission from '../components/Mission'
import AddMission from '../components/AddMission';
import { globalStyles } from '../styles/global'
import { NavigationActions } from 'react-navigation';
import Timer from '../components/Timer';

export default class Manager extends Component {
    state = {
        missions: [
            {
                text: 'הוסיפי משימות',
                id: 0,
                checked: false,
                tries: '0',
                succseses: '0',
            },

            {
                text: 'הציגי משימות בעזרת לולאה',
                id: 1,
                checked: false,
                tries: '0',
                succseses: '0',
            },
            {
                text: 'סמני כל משימה בנפרד',
                id: 2,
                checked: false,
                tries: '0',
                succseses: '0',
            },
            {
                text: 'העבירי משימות לכרטיסים בעמוד אחר',
                id: 3,
                checked: false,
                tries: '2',
                succseses: '0',
            },
            {
                text: 'עדיין הרדקודד?',
                id: 4,
                checked: false,
                tries: '1',
                succseses: '1',
            }
        ],
        myMissions: [],
        modalVisible: false,
    }
    checkedMission = (id) => {
        let missions = this.state.missions;
        missions[id].checked = !missions[id].checked
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }
    handleTries = (num, key) => {
        let missions = this.state.missions;
        missions[key].tries = num.toString();
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }
    handleSuccesses = (num, key) => {
        let missions = this.state.missions;
        missions[key].succseses = num.toString();
        this.setState({
            missions: missions,
            myMissions: [...missions.filter(mission => mission.checked)]
        })
    }
    addMission = (mission) => {
        let missions = this.state.missions;
        let newMission = {
            text: mission,
            id: missions.length,
            checked: false,
            tries: '0',
            succseses: '0',
        }
        this.setState({
            missions: [...missions, newMission],
            myMissions: [...missions.filter(mission => mission.checked)]
        })

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
        const myMissionsList = Object.entries(this.state.myMissions).map(([key, value]) => {
            return <Mission mission={this.state.myMissions[key]}
                handleTries={(num) => this.handleTries(num, key)}
                handleSuccesses={(num) => this.handleSuccesses(num, key)}
            />
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                    <MyHeader title='מנהל טיפול' />
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
                                    <MissionCheckbox missions={this.state.missions}
                                        checkedMission={(id) => this.checkedMission(id)} />
                                    <AddMission
                                        addMission={(mission) => { this.addMission(mission) }}
                                    />
                                    <TouchableHighlight
                                        style={globalStyles.circle}
                                        underlayColor='#ccc'
                                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                    >
                                        <Text > סיים   </Text>
                                    </TouchableHighlight>

                                    <View style={{ flex: 1 }}>
                                        <Text>blabla</Text>
                                    </View>
                                </ScrollView>
                            </View>

                        </Modal>

                    </View>
                    <Timer />
                    {myMissionsList}
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
    modal: {
        alignItems: 'center',
        marginTop: 20,
    },
    therapistList: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    }
})