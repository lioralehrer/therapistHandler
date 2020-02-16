import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button } from 'react-native';
import MyHeader from '../components/MyHeader';
import MissionCheckbox from '../components/MissionCheckbox';
import AddMission from '../components/AddMission';
import { globalStyles } from '../styles/global'


export default class Manager extends Component {
    constructor(props) {
        super(props);
        // this.managerName = this.props.navigation.state.managerName;
        // this.missions = props.navigation.state.params.missions
        
        this.state = {
            modalVisible: false,

        };
    }
   
    addMission = (mission) => {
        this.props.addMission(mission);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    paciantPicker = () => {
        alert('blabla')
    }
    checkedMission = (id) => {
        this.props.checkedMission(id);
    }
  

    render() {
        const {managerName} = this.props.route.params;
        const {patient} = this.props.route.params;
        const {missions} = this.props.route.params;
        // const myMissionsList = Object.entries(this.props.myMissions).map(([key, value]) => {
        //     return <Mission mission={this.props.myMissions[key]}
        //         handleTries={(num) => this.handleTries(num, key)}
        //         handleSuccesses={(num) => this.handleSuccesses(num, key)}
        //     />
        // })
        return (
            <View style={globalStyles.MainContainer}>
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
                                <MissionCheckbox missions={missions} checkedMission={(id) => this.checkedMission(id)}
                                />
                                {/* <AddMission addMission={(mission) => this.addMission(mission)} />  */}
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
                {/* {myMissionsList} */}
                <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    HeaderInsideText: {
        color: '#900',
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