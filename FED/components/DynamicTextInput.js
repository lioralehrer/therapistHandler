import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements'
import { globalStyles } from '../styles/global'

const DynamicTextInput = ({clear, title, btnTitle, placeholder, entity, submitTextInput }) => {
    const [fields, setFields] = useState(entity ? entity.length : 1);
    const [eventValue, setEventValue] = useState( entity? entity : [{title:''}]);
    const [clearText, setClearText] = useState(clear)
    if (clear !== clearText) {
        setEventValue('');
        setFields(1);
        setClearText(!clearText);
    }

    const handleChangeText = (e, i) => {
        const updateValue = [...eventValue];
        updateValue[i] = {title: e}
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
                        <TextInput
                            style={globalStyles.input}
                            placeholder={placeholder}
                            onChangeText={e => handleChangeText(e, i)}
                            defaultValue={eventValue[i]? eventValue[i].title: ''}
                            
                        />
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
                        onPress={() => setFields(fields + 1)}
                    />
            </Card>

        </View>
    )
}

export default DynamicTextInput;