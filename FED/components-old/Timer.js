import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions , TouchableOpacity} from 'react-native';

//  function to calculate hours, minutes and seconds.
const formatNumber = (number) => `0${number}`.slice(-2);
const SESSION = 120 * 60;
const PATTERN = (2000, 1000, 1000);
const getRemaining = (time) => {
    const hours = Math.floor(time / (60 * 60))
    const minutes = Math.floor((time - hours * 60 * 60) / 60);
    const seconds = time - 60 * (minutes + hours * 60);
    return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
};

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.pauseBtn = "Pause";

    }
    state = {
        remaingSeconds: SESSION,
        isRunning: false,
        pause: true,
    }
    componentWillMount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    startSession = () => {
        this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1, isRunning: true }));
        this.interval = setInterval(() => this.state.remaingSeconds > 0 ? this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1 })) : this.setState(state => ({ remaingSeconds: SESSION }), clearInterval(this.interval)), 1000);

    }
    stopSession = () => {
        this.setState(() => ({ remaingSeconds: SESSION, isRunning: false }));
        clearInterval(this.interval);
    }
    pauseSession = () => {
        if (this.state.pause) {
            clearInterval(this.interval)
            this.setState(() => ({ pause: false }));
            this.pauseBtn = "Continue"
        } else {
            this.setState(() => ({ pause: true }));
            this.pauseBtn = "Pause"
            this.interval = setInterval(() => this.state.remaingSeconds > 0 ? this.setState(state => ({ remaingSeconds: state.remaingSeconds - 1 })) : this.setState(state => ({ remaingSeconds: SESSION }), clearInterval(this.interval)), 1000);
        }
    }
    render() {
        const { hours, minutes, seconds } = getRemaining(this.state.remaingSeconds);
        return (
            <View style={styles.btnContainer}> 
                {this.state.isRunning ?
                    <View>
                        <TouchableOpacity onPress={this.stopSession} style={styles.stopBtn}>
                            <Text style={styles.stopTextBtn}>Stop Session</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.pauseSession} style={styles.stopBtn}>
                            <Text style={styles.pauseButton}>{this.pauseBtn}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={this.startSession} style={styles.button}>
                        <Text style={styles.textButtton}>Start Session</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.time}> {`${hours}:${minutes}:${seconds}`}</Text>
            </View>

        )
    }
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
        padding: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#89AAFF',
        borderRadius: screen.width / 2,
        margin: 2,

    },
    stopBtn: {
        borderColor: '#FF851B',
        borderWidth: 5,
        borderRadius: screen.width / 2,
        margin: 5,
    },
    stopTextBtn: {
        color: '#FF851B',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    textButtton: {
        fontSize: 24,
        color: '#89AAFF',
        fontWeight: 'bold',
    },
    pauseButton: {
        padding: 0,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF851B',
        marginTop: 5,
        paddingLeft: 45,
    },
    paragraph: {
        margin: 20,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    time: {
        color: "#fff",
        fontSize: 50,
    }
})