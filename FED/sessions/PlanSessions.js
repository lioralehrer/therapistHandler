import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Headers/Header';
import { AddSession } from './AddSession';
import { SessionProvider } from '../context/SessionContext';
import SessionList from '../components/list/SessionList';
import { GoalProvider } from '../context/GoalContext';


const PlanSessions = () => {
    return (
        <SessionProvider>
            <GoalProvider>
                <View styl={styles.container}>
                    <Header title=" תכנון שבועי עבור ירדן" />
                    <AddSession />
                    <SessionList />
                </View>
            </GoalProvider>
        </SessionProvider>
    );
}
export default PlanSessions;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#F5FCFF',
        // flex:1
    }
})