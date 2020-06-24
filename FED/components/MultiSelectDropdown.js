import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import MultiSelect from 'react-native-multiple-select';


export default class MultiSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            newList: []
        };
    }
     
    onSelectedItemsChange = selectedItems => {
        this.setState({
            selectedItems
            
        });
        
        this.props.handleList(selectedItems)
        // alert(this.props.list[selectedItems - 1].title)
        // Alert.alert(JSON.stringify(selectedItems))
        //Set Selected Items
    };

    render() {
        const list = this.props.list
        const { selectedItems } = this.state;
        return (
            <View style={{ flex: 1, padding: 30 }}>
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
                    displayKey="title"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#48d22b"
                    submitButtonText="Submit"
                />
            </View>

        );
    }
}