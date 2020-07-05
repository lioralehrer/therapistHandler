import React, { useContext } from 'react';
import { View,  Alert, StyleSheet, Button, FlatList, SafeAreaView } from 'react-native';
import { SkillContext } from '../../context/SkillContext'
import SkillItem from '../item/SkillItem';

const SkillList = ({ skillType, level }) => {
    const { skills } = useContext(SkillContext);


    const onSubmit = (skills) => {
        Alert.alert("send request to DB");
        // Alert.alert(toString(level))
        console.log(level + ' from Submit')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.goalsList}>
                    <FlatList
                         data =  {skillType ? skills.filter((skill)=> skill.skillType === skillType ): skills}
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