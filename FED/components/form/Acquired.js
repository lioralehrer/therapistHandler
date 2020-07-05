import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Header from '../Headers/Header';
import SkillList from '../list/SkillList';
import { SkillContext } from '../../context/SkillContext'
import DropdownListBtn from '../list/DropdownListBtn';

const getSkillTypeList = () => {
    let skillTypeList = [{ title: 'שפה רצפטיבית', levels: 5 },
    { title: 'כישורים חברתיים', levels: 5 },
    { title: 'משחק', levels: 4 },
    { title: 'קוגנציה', levels: 4 },
    { title: 'קשב משותף', levels: 3 },
    { title: 'מוטוריקה עדינה', levels: 3 },
    { title: 'התנהגות', levels: 4 },
    { title: 'שפה אקספרסיבית', levels: 5 },
    { title: '' }]
    return skillTypeList
}
// const skillTypes = ['שפה אקספרסיבית', 'שפה רצפטיבית', 'כישורים חברתיים', 'התנהגות', 'מוטוריקה עדינה', 'קשב משותף', 'קוגניציה', 'משחק'];
// const getskills =()=>{
//     let skills = [{id:1, skillType:'משחק',level:'1',title:'', acuired:false},
//     {id:1, skillType:'משחק',level:'1',title:'', acuired:false},
//     {id:1, skillType:'משחק',level:'2',title:'', acuired:false},
//     {id:1, skillType:'משחק',level:'2',title:'', acuired:false}]
//     return skills
// } 
const Acquired = () => {
    // const [levels , setLsevels] = useState(['1','2','3','4','5'])
    const [levels, setLsevels] = useState([{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }, { title: '5' }])
    const [skillType, setSkillType] = useState('');
    const [level, setLevel] = useState();
    const [visible, setVisible] = useState(true);

    const handleSkillType = (type) => {
        setSkillType(type.title)
        var arr = [];
        let length = type.levels;
        while (length > 0) {
            arr.push({ title: length });
            length -= 1;
        }
        setLsevels(arr.reverse())
    }

    return (

        <View>
            {
                visible &&
                <View>
                    <Header title={'סילבוס מיומנויות  \n  סמני בצבע מיומנויות קיימות '} />
                    <View style={styles.container}>
                        <DropdownListBtn title='תחום התפתחות' icon='rowing' arrayListItems={getSkillTypeList()} onSelect={(type) => handleSkillType(type)} />
                        <DropdownListBtn title='רמה' icon='rowing' arrayListItems={levels} onSelect={(level) => setLevel(level.title)} />
                    </View>
                    <SkillList skillType={skillType} level={level} />
                </View>
            }
            <Button title={visible ? 'לבניית התוכנית' : 'חזרה לסילבוס מיומנויות נרכשות'} onPress={() => setVisible(!visible)} color="#841584" />
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