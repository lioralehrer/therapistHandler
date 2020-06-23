import React , {useContext} from 'react';
import {View , Text , Alert, Button , StyleSheet, FlatList, SafeAreaView} from 'react-native';
import SessionItem from '../item/SessionItem';
import {SessionContext} from '../../context/SessionContext';

const SessionList = () => {
  const {sessions} = useContext(SessionContext);

    return(
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <View style={styles.goalsList}>
          <FlatList
          data={sessions}
          renderItem={({item}) => <View><SessionItem  session={item}/></View>}
          //  renderItem={({item}) =>console.log(item)}
          keyExtractor={item => item.id}
         />
        </View>
      </View>
      </SafeAreaView>
    )
}

export default SessionList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    goalsList: {
        backgroundColor: 'wheat',
        paddingTop: 2,
    },
})