import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Acquired from '../components/form/Acquired';
import { ScrollView } from 'react-native-gesture-handler';
import GoalList from '../components/list/GoalList';
import { GoalProvider } from '../context/GoalContext';
import PlanProgram from '../components/form/PlanProgram';

const SyllabusScreen = ({ route, navigation }) => {
    const [visibleList, setVisibleList] = useState(false)
    const [visiblePlan, setVisiblePlan] = useState(false)
    const { managerName } = route.params;
    console.log(managerName)
    return (
        <GoalProvider>
            <ScrollView>
                <Acquired handleVisible={(visiblePlan) => setVisiblePlan(visiblePlan)} />
                {visiblePlan && <PlanProgram />}
                <View style={{ margin: 10, padding: 15, flexDirection: 'row', alignSelf: 'center' }}>
                    <Button title={visibleList ? 'Close List ' : 'Goal List'} onPress={() => setVisibleList(!visibleList)} color='#5f9ea0' />
                    {visibleList && <GoalList />}
                </View>
            </ScrollView>
        </GoalProvider>
    )
}

export default SyllabusScreen;