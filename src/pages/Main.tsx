import { View, FlatList, Image, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

// import { Container } from './styles';

interface Member {
    login: string;
    avatar_uri: string;
}

const Main: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members').then(response => {
            response.json().then(data => {
                setMembers(data);
            })
        })
    }, []);

    return (
        <FlatList
            contentContainerStyle={{ padding: 24 }}
            data={members}
            keyExtractor={member => member.login}
            renderItem={({ item: member}) => (
                <View style={styles.member}>
                    <Image style={styles.image} source={{ uri: member.avatar_uri }}/>
                    <Text>{member.login}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    member: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },

    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight:16,
    }
})

export { Main }