import React, { Component } from 'react';
import {  TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView,Button } from 'react-native';
import MyHeader from './MyHeader';
import MissionCheckbox from './MissionCheckbox';
import AddMission from './AddMission';
import { globalStyles } from '../styles/global'

export default class Manager extends Component {
    constructor(props) {
        super(props);
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
        return (
            <View style={globalStyles.MainContainer}>
                <MyHeader title='מנהל טיפול' />
                <Text style={styles.HeaderInsideText}>
                    שלום {this.props.managerName} {'\n'}
                    המטופל שלך: {this.props.patient}
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
                        <Text> בחר פעילויות </Text>
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
                                <MissionCheckbox missions={this.props.missions} checkedMission={(id) => this.checkedMission(id)}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
});
