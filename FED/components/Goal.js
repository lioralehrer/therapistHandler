import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

const Goal = ({ goal, checkedGoal }) => {
    // const [goal , setGoal] = useState({goal});
    const [expanded, setExpanded] = useState(true);
    const toggle = () => {
        setExpanded(!expanded);
    }
    return (
        <View style={styles.goal}>
            <View style={styles.text}>

                <View style={styles.head}>
                    <Text style={styles.title}>{goal.title}</Text>
                    <TouchableHighlight
                        onPress={() => toggle()}
                    >
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={expanded ? require('../assets/Arrowhead-Down.png') : require('../assets/Arrowhead-01-128.png')} />
                    </TouchableHighlight>
                </View>
                <CheckBox
                    iconRight
                    checkedColor='green'
                    right
                    title={goal.description}
                    checked={goal.checked}
                    onPress={ () => checkedGoal(goal.id)}
                />
            </View>
            {Object.keys(goal.subGoals).map((subgoal, index) => {
                return expanded ? <View></View> :
                    // <CheckBox
                    //     iconRight
                    //     right
                    //     checkedColor='green'
                    //     title={goal.subGoals[subgoal].text}
                    //     checked={goal.subGoals[subgoal].checked}
                    //      onPress={() => checkedGoal(goal.subGoals[subgoal].id, goal)}
                    // />
                    <View>
                        <ListItem
                            key={index}
                            title={goal.subGoals[subgoal].text}
                            bottomDivider
                            chevron
                        />
                    </View>
            })}

        </View>
    );
}

export default Goal;

const styles = StyleSheet.create({
    goal: {
        backgroundColor: '#6d3d6d',
        margin: 10,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        margin: 10,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    description: {
        color: '#fff',
        paddingHorizontal: 20
    },

})