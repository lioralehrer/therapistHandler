import React, { Component } from 'react';
import { Header } from 'react-native-elements';

export default class MyHeader extends Component {
    render() {
        return (

            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />


        )
    }
}
