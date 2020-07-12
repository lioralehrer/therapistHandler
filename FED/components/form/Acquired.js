import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import Header from '../Headers/Header';
import SkillList from '../list/SkillList';
import DropdownListBtn from '../list/DropdownListBtn';
import {getSkillTypeList } from '../../store/Data'


const Acquired = ({handleVisible}) => {
    const [levels, setLsevels] = useState([{ title: '- 1 -' }, { title: '- 2 -' }, { title: '- 3 -' }, { title: '- 4 -' }, { title: '- 5 -' }])
    const [skillType, setSkillType] = useState('');
    const [level, setLevel] = useState();
    const [visible, setVisible] = useState(true);
    
    const handleSkillType = (type) => {
        setSkillType(type.title);
        let arr = type.levels;
        let my_arr = [];
        arr.forEach(e =>  my_arr.push({ title : '- ' + e + ' -'}));
        my_arr.push({title: 'ALL'})
        setLsevels(my_arr);
    }
    return (

        <View>
            {
                visible &&
                <View>
                    <Header title={'סילבוס מיומנויות  \n  סמני בצבע מיומנויות קיימות '} />
                    <View style={styles.container}>
                        <DropdownListBtn title='תחום התפתחות' icon='rowing' arrayListItems={getSkillTypeList()} onSelect={(type) => handleSkillType(type)} />
                        <DropdownListBtn title='רמה' icon='rowing' arrayListItems={levels} onSelect={(level) => level !== "ALL" ? setLevel(level.title) : setLevel ('')} />
                    </View>
                    <SkillList skillType={skillType} level={level} />
                </View>
            }
            <Button title={visible ? 'לבניית התוכנית' : 'חזרה לסילבוס מיומנויות נרכשות'} onPress={() => {setVisible(!visible); handleVisible(visible)}} color="#841584" />
        </View>

    )
}

export default Acquired;

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'wheat'
    }
})