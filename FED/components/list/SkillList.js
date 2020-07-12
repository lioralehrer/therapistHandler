import React, { useContext } from 'react';
import { View, Alert, StyleSheet, Button, FlatList, SafeAreaView } from 'react-native';
import { SkillContext } from '../../context/SkillContext'
import SkillItem from '../item/SkillItem';

const SkillList = ({ skillType, level }) => {
    const { skills } = useContext(SkillContext);

    const onSubmit = (skills) => {
        Alert.alert("send request to DB");
        console.log(level + ' from Submit')
    }
    const getData = ()=>{
        if (level){
            if (skillType && level.match(/\d+/g)){
                return skills.filter(skill=> skill.level == level.replace(/-/g,'').trim() ).filter(skill => skill.skillType === skillType)
            }
        }
        if (skillType){
         return   skills.filter(skill => skill.skillType === skillType);
        }
        else {
            return skills
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.goalsList}>
                    <FlatList
                        data ={getData()}
                        renderItem={({ item }) => <SkillItem skill={item} />}
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