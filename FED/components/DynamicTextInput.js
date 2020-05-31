import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements'
import { globalStyles } from '../styles/global'

const DynamicTextInput = ({ title, btnTitle, placeholder, submitTextInput }) => {
    const [fields, setFields] = useState(1);
    const [eventValue, setEventValue] = useState([{text:''}]);

    const handleChangeText = (e, i) => {
        const updateValue = [...eventValue];
        updateValue[i] = {text: e}
        setEventValue(updateValue);
        submitTextInput(updateValue);
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
                            defaultValue={eventValue}
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