import React, { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet, Button, FlatList , TouchableHighlight, SafeAreaView} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { SkillContext } from '../../context/SkillContext'
import SkillItem from '../item/SkillItem';

const SkillList = ({ skillType, level }) => {
    const { skills } = useContext(SkillContext);
    

    const onSubmit = (skills)=> {
       Alert.alert("send request to DB")
    }

    return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.goalsList}>
                    <FlatList
                        data={skillType ? skills.filter((skill)=> skill.skillType === skillType ): skills }
                        renderItem={({ item }) =><SkillItem  skill={item} /> }
                        keyExtractor={item => item.id}
                        onPress={(id) => Alert.alert("pressed: change background color, and take the id")}

                    />
                </View>
                <Button title='שמירה' onPress={(skills) => onSubmit(skills)} color="#841584" />
            </View>
         </SafeAreaView> 
    )

}

export default SkillList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goalsList: {
        backgroundColor: 'wheat',
        paddingTop: 2,
    },
})