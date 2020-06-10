import { StyleSheet, Dimensions, Platform } from 'react-native';

export const globalStyles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  HeaderInsideText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    margin: 10,

  },
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.25,
    backgroundColor: '#89AAFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    minWidth: '100%',
    minHeight: '100%'
  },
  modal: {
    alignItems: 'center',
    marginTop: 20,
  },
  modal01: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#4c2a4c'
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: "#ddd",
    margin: 10,
    width: Dimensions.get('window').width * 0.75,
    alignSelf: 'center',
  },
  btn: {
    flex: 0.2,
    minHeight: 30,
    maxHeight: 60,
    justifyContent: 'center',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding:5,
  },
  body: {
    backgroundColor: '#6d3d6d',
    margin: 10,
    flex: 1
  }
});

