import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Header from '../Headers/Header';
import { GoalContext } from '../../context/GoalContext';
import GoalItem from '../item/GoalItem';

const GoalList = () => {
    const { goals } = useContext(GoalContext);
    return (
        <View >
            <Header title='מטרות' />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.goalsList}>
                        <FlatList
                            data={goals}
                            renderItem={({item}) => <View><GoalItem  goal={item}/></View>}
                            // renderItem={({ item }) => console.log(item)}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default GoalList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goalsList: {
        backgroundColor: 'wheat',
        paddingTop: 2,
    },
})