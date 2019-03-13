import React from 'react';
import {Platform} from 'react-native';
import {
    Container,
    Header,
    Left,
    Right,
    Button,
    Body,
    Title,
    Icon
} from 'native-base';

const WithNavigation = WrappedComponent => props => {

    return (
        <Container>
            <Header
            androidStatusBarColor={'darkgreen'}
            iosBarStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
            >
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Timesheet</Title>
            </Body>
            <Right />
        </Header>
            <WrappedComponent  {...props} />
      </Container>
    )
}

export default WithNavigation