import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements'
import { globalStyles } from '../styles/global'

const DynamicTextInput = ({ title, btnTitle, placeholder, submitTextInput }) => {
    const [fields, setFields] = useState(1);
    const [eventValue, setEventValue] = useState();
    const textInputFields = () => (
        < TextInput
            style={globalStyles.input}
            placeholder={placeholder}
            onChangeText={e => handleChangeText(e)}
            defaultValue={eventValue}
        />
    )
    const handleChangeText = (e) => {
        setEventValue(e);
        submitTextInput(eventValue);
    }

    return (
        <View>
            <Card
                title={title}
            >
                {/* {textInputFields} */}
                <TextInput
                    style={globalStyles.input}
                    placeholder={placeholder}
                    onChangeText={e => handleChangeText(e)}
                    defaultValue={eventValue}
                />
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