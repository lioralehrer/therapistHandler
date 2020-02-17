import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button } from 'react-native';
import MyHeader from '../components/MyHeader';
import MissionCheckbox from '../components/MissionCheckbox';
import { Mission } from '../components/Mission'
import AddMission from '../components/AddMission';
import { globalStyles } from '../styles/global'
import { NavigationActions } from 'react-navigation';
import Timer from '../components/Timer';

export default class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    // addMission = (mission) => {
    //     this.props.addMission(mission);
    // }
    addMission = (mission) => {

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    paciantPicker = () => {
        alert('blabla')
    }
    checkedMission = (id) => {
        missions[id].checked = !missions[id].checked
        NavigationActions.setParams({
            params: {
                missions: missions,
                myMissions: [...missions.filter(mission => mission.checked)]
            },
            // key: 'Home'
        })
    }


    render() {
        const { managerName } = this.props.route.params;
        const { patient } = this.props.route.params;
        const { missions } = this.props.route.params;
        const { myMissions } = this.props.route.params;
        const myMissionsList = Object.entries(myMissions).map(([key, value]) => {
            return <Mission mission={myMissions[key]}
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
                        המטופל שלך: {patient}
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
                                    <MissionCheckbox missions={missions}
                                        checkedMission={(id) => {
                                            let newMissions = missions;
                                            newMissions[id].checked = !missions[id].checked
                                            NavigationActions.setParams({
                                                params: {
                                                    missions: newMissions,
                                                    myMissions: [...missions.filter(mission => mission.checked)]
                                                },
                                                // key: 'Home'
                                            })
                                            this.forceUpdate();
                                        }
                                        }
                                    />
                                    <AddMission addMission={(mission) => this.addMission(mission)} />
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
    }
})