import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Button } from '../../components/Button';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export const GoalInput = () => {
    const [goalText, setGoalText] = useState('');
    const { addGoal } = useUser();
    const navigation = useNavigation<any>();

    const handleContinue = () => {
        if (goalText.trim()) {
            addGoal({
                id: Date.now().toString(),
                title: goalText,
                color: COLORS.accentOrange, // Default for first goal
                icon: 'CookingPot', // Default icon
                progress: 0,
                timeSpent: '0h 0min',
            });
            navigation.navigate('Dashboard');
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Let's set{'\n'}some goals</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter goals"
                        placeholderTextColor={COLORS.textSecondary}
                        value={goalText}
                        onChangeText={setGoalText}
                        autoFocus
                    />
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
        width: '100%',
    },
    title: {
        color: COLORS.text,
        fontSize: FONT_SIZE.xl,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SPACING.xxl,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: SPACING.l,
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.textSecondary,
        borderRadius: 12,
        padding: SPACING.m,
        color: COLORS.text,
        fontSize: FONT_SIZE.m,
        width: '100%',
    },
    button: {
        marginBottom: SPACING.xl,
    },
});
