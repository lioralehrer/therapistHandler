import React from 'react';
import { View, ScrollView } from 'react-native';
import PlanSessions from '../sessions/PlanSessions';
import { globalStyles } from '../styles/global';
import { SessionProvider } from '../context/SessionContext';

const PlanSessionScreen = ({ route, navigation }) => {

    return (
        <SessionProvider>
            <View style={{ backgroundColor: '#4c2a4c'}}>
            <ScrollView>
                <View style={globalStyles.modalContainer}>
                    <PlanSessions />
                </View>
            </ScrollView>
            </View>
        </SessionProvider>
    )
}
export default PlanSessionScreen;