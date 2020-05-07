import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Modal, ScrollView, Button } from 'react-native';
import { globalStyles } from '../styles/global'

export default class Manager extends Component {
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    paciantPicker = () => {
        alert('blabla')
    }
    render() {
        // const myGoalsList = Object.entries(this.state.myGoals).map(([key, value]) => {
        //     return <View style={styles.goal}>
        //         <MyGoal goal={this.state.myGoals[key]}
        //             handleTries={(num, subgoal) => this.handleTries(num, subgoal, key)}
        //             handleSuccesses={(num, subgoal) => this.handleSuccesses(num, subgoal, key)}
        //         />
        //     </View>
        // })
        return (
            <View style={styles.container}>
                    <View style={styles.btnContainer}>
                        {/* <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => this.paciantPicker()}
                        >
                            <Text>   </Text>
                        </TouchableHighlight> */}
                        {/* <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => alert('Yaay!')}
                        >
                            <Text>   </Text>
                        </TouchableHighlight> */}

                        <TouchableHighlight
                            style={globalStyles.circle}
                            underlayColor='#ccc'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        >
                            <Text>  דיווח  </Text>
                        </TouchableHighlight>
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={this.state.modalVisible}
                            swipeArea={50}
                        >
                            <View style={styles.modal} onStartShouldSetResponder={() => true}>
                                <ScrollView>
                                    {/* <GoalsList
                                        goals={this.state.goals}
                                        newGoal={(goal) => this.handleGoal(goal)}
                                        deleteGoal={(id) => this.deleteGoal(id)}
                                        checkedGoal={(id) => this.checkedGoal(id)} /> */}
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