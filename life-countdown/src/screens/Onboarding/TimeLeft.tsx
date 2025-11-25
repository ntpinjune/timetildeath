import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Button } from '../../components/Button';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { addYears, differenceInSeconds } from 'date-fns';

export const TimeLeft = () => {
    const { birthDate, lifeExpectancy } = useUser();
    const navigation = useNavigation<any>();
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (birthDate) {
            const deathDate = addYears(birthDate, lifeExpectancy);

            const updateTimer = () => {
                const now = new Date();
                const diff = differenceInSeconds(deathDate, now);
                setSecondsLeft(Math.max(0, diff));
            };

            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [birthDate, lifeExpectancy]);

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>You have</Text>

                <View style={styles.timerContainer}>
                    <Text style={styles.timer}>{formatNumber(secondsLeft)}</Text>
                    <Text style={styles.subtitle}>seconds left to live...</Text>
                </View>
            </View>

            <Button title="Continue" onPress={() => navigation.navigate('GoalInput')} style={styles.button} />
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
    title: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.l,
        marginBottom: SPACING.m,
    },
    timerContainer: {
        alignItems: 'center',
    },
    timer: {
        color: COLORS.text,
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: SPACING.s,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.m,
    },
    button: {
        marginBottom: SPACING.xl,
    },
});
