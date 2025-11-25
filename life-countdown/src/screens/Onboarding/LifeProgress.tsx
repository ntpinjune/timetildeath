import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Button } from '../../components/Button';
import { CircularProgress } from '../../components/CircularProgress';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { differenceInYears } from 'date-fns';

export const LifeProgress = () => {
    const { birthDate, lifeExpectancy } = useUser();
    const navigation = useNavigation<any>();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (birthDate) {
            const now = new Date();
            const age = differenceInYears(now, birthDate);
            const calculatedPercentage = Math.min(100, Math.max(0, (age / lifeExpectancy) * 100));
            setPercentage(Math.round(calculatedPercentage));
        }
    }, [birthDate, lifeExpectancy]);

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    You have lived{'\n'}
                    <Text style={styles.highlight}>{percentage}%</Text> of your life
                </Text>

                <View style={styles.progressContainer}>
                    <CircularProgress progress={percentage} size={250} color={COLORS.accentRed} />
                </View>
            </View>

            <Button title="Continue" onPress={() => navigation.navigate('TimeLeft')} style={styles.button} />
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
        color: COLORS.text,
        fontSize: FONT_SIZE.xl,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
        lineHeight: 32,
    },
    highlight: {
        fontWeight: 'bold',
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: SPACING.xl,
    },
});
