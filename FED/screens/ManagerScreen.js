import React from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import SessionConfig from '../components/SessionConfig';
import { SkillProvider } from '../context/SkillContext';
import { GoalProvider } from '../context/GoalContext';

const ManagerScreen = ({ route, navigation }) => {
    const { managerName } = route.params;
    const { patient } = route.params;
    return (
        <SkillProvider>
            <GoalProvider>
                <View style={styles.container}>
                    <ScrollView>
                        {/* <UpperMenu /> */}
                        {/* <TherapistHeader userName={managerName} lastPatient={patient}></TherapistHeader> */}
                        <SessionConfig
                            title="מה תרצי לעשות ?"
                            icon01="bullseye"
                            icon02="calendar-check-o"
                            btn01Title="בניית תוכנית אישית"
                            btn02Title="דוחות"
                            onPressBtn01={() => navigation.navigate("Syllabus", managerName)}
                            onPressBtn02={() => Alert.alert("דוחות")}
                        />
                        <SessionConfig
                            title="או"
                            icon01="user-circle"
                            icon02="life-buoy"
                            btn01Title="תכנון שבועי"
                            btn02Title="התחילי טיפול"
                            onPressBtn02={() => navigation.navigate('Therapist home', managerName)}
                            onPressBtn01={() => Alert.alert("תכנון שבועי")}
                        />
                    </ScrollView>
                </View>
            </GoalProvider>
        </SkillProvider>
    )
}

export default ManagerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})