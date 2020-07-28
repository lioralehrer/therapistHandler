import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements'
import { globalStyles } from '../../styles/global'

const DynamicFormInput = ({ clear, title, btnTitle, placeholder01, placeholder02, entity, submitTextInput }) => {
    const [fields, setFields] = useState(entity ? entity.length : 1);
    const [eventValue, setEventValue] = useState(entity ? entity : [{ title: '', description: '' }]);
    const [clearText, setClearText] = useState(clear)
    if (clear !== clearText) {
        setEventValue('');
        setFields(1);
        setClearText(!clearText);
    }
  
    const handleChangeTitle = (e, i) => {
        const updateValue = [...eventValue];
        updateValue[i] = { ...updateValue[i], title: e } ;
        setEventValue(updateValue);
        submitTextInput(eventValue);
    }
    const handleChangeDescription = (e, i) => {
        const updateValue = [...eventValue];
        updateValue[i] = { ...updateValue[i], description: e } ;
        setEventValue(updateValue);
        submitTextInput(eventValue);
    }

    const flds = () => {
        let arr = []
        for (let i = 0; i < fields; i++) {
            arr.push(
                <ListItem
                    key={i}
                    title={
                        <View style={styles.unit}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder={placeholder01}
                                onChangeText={e => handleChangeTitle(e, i)}
                                defaultValue={eventValue[i] ? eventValue[i].title : ''}

                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder={placeholder02}
                                onChangeText={e => handleChangeDescription(e, i)}
                                defaultValue={eventValue[i] ? eventValue[i].description : ''}
                                multiline={true}
                            />
                        </View>
                    }
                    bottomDivider
                    chevron
                />
            )

        }
        return arr
    }

    return (
        <View>
            <Card
                title={title}
            >
                {flds()}
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{ borderRadius: 5, marginLeft: 10, marginRight: 10, marginBottom: 0, backgroundColor: "#841584" }}
                    title={btnTitle}
                    onPress={() =>setFields(fields + 1)}
                />
            </Card>

        </View>
    )}


export default DynamicFormInput;

const styles = StyleSheet.create({
    unit: {
        backgroundColor: 'lavenderblush',
    }
})