import React, { useState, useContext } from 'react';
import { View, Alert, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { SkillContext } from '../../context/SkillContext'

const SkillItem = ({ skill }) => {
     const [acquired, setAcquired] = useState(skill.acquired)
     const { updateSkill } = useContext(SkillContext)

     const HandleAcquired = ()=>{
         setAcquired(!acquired);
         updateSkill(skill)
     }

    return (

        <TouchableHighlight
            key={skill.id}
            onPress={() => HandleAcquired()}
            style={styles.container}
        >
            <View style={acquired ? styles.acquiredSkill : styles.skill}>
                <View  style={styles.levelContainer}>
                <Text style={styles.level}>{skill.level}</Text>
                </View>
                <Text>{skill.title}</Text>
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 2,
        marginLeft: 11,
        marginRight: 11,
        height: 50,
        
    },
    skill: {
        backgroundColor: 'white',
        justifyContent:'space-between',
         flexDirection: 'row-reverse',
         height:40
    },
    acquiredSkill:{
        backgroundColor: 'lightblue',
        justifyContent:'space-between',
         flexDirection: 'row-reverse',
         height:40
    },
    levelContainer:{
        backgroundColor:'lightcoral',
        width:30,
        padding:5,

    },
    level:{
        fontSize:20,
        fontWeight:'bold',
        color:'blue',
    }
})

export default SkillItem;