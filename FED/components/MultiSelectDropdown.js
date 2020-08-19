import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import MultiSelect from 'react-native-multiple-select';


export default class MultiSelectDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItems: this.props.entity,
            clearText: this.props.clear,
        };
       
    }
    onSelectedItemsChange = selectedItems => {
        this.setState({
            selectedItems
        });
        this.props.handleList(selectedItems);
        console.log("Selected Items in MultiSelectDropdown: ")
        console.log(selectedItems)
    };

    render() {
        if (this.state.clearText !== this.props.clear) {
            this.setState({
                selectedItems: '',
                clearText: this.props.clear,
            })
        }
        const list = this.props.list
        const { selectedItems } = this.state;
        return (
            <View style={{padding: 30}}>
                <MultiSelect
                    hideTags
                    items={list}
                    uniqueKey="id"
                    ref={component => {
                        this.multiSelect = component;
                    }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText={this.props.title}
                    searchInputPlaceholderText="חיפוש..."
                    onChangeInput={text => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="description"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#48d22b"
                    submitButtonText="Submit"
                />
            </View>

        );
    }
}