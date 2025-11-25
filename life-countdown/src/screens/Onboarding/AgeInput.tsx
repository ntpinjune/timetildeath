import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Button } from '../../components/Button';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export const AgeInput = () => {
    const [age, setAge] = useState('25');
    const { setBirthDate } = useUser();
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        const ageNum = parseInt(age, 10);
        if (!isNaN(ageNum)) {
            const now = new Date();
            const birthYear = now.getFullYear() - ageNum;
            const birthDate = new Date(birthYear, now.getMonth(), now.getDate());
            setBirthDate(birthDate);
            navigation.navigate('LifeProgress');
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.question}>How old are you?</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        keyboardType="number-pad"
                        maxLength={3}
                        selectionColor={COLORS.primary}
                    />
                </View>

                <View style={styles.controls}>
                    {/* Placeholder for up/down controls if needed, but simple input is fine for now */}
                </View>
            </View>

            <Button title="Continue" onPress={handleContinue} style={styles.button} />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        color: COLORS.text,
        fontSize: FONT_SIZE.xl,
        fontWeight: '600',
        marginBottom: SPACING.xl,
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
    },
    input: {
        color: COLORS.text,
        fontSize: 96, // Huge font size like in the design
        fontWeight: 'bold',
        textAlign: 'center',
        width: 200,
    },
    controls: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    button: {
        marginBottom: SPACING.xl,
    },
});
