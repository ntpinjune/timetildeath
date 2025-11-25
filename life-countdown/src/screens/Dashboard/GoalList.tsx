import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { GoalCard } from '../../components/GoalCard';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';
import { differenceInSeconds, addYears } from 'date-fns';

export const GoalList = () => {
    const { goals, birthDate, lifeExpectancy } = useUser();
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
            <View style={styles.header}>
                <Text style={styles.title}>My Goals</Text>
                <TouchableOpacity style={styles.profileIcon}>
                    <View style={styles.avatar} />
                </TouchableOpacity>
            </View>

            <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Time Left to Live</Text>
                <Text style={styles.timer}>{formatNumber(secondsLeft)}</Text>
            </View>

            <FlatList
                data={goals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <GoalCard
                        goal={item}
                        onPress={() => navigation.navigate('GoalDetail', { goalId: item.id })}
                        onCheck={() => { /* Handle check logic */ }}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No goals yet. Add one!</Text>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('GoalInput')}
            >
                <Plus color={COLORS.text} size={32} />
            </TouchableOpacity>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#000', // Pitch black background as per design
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
        marginTop: SPACING.m,
    },
    title: {
        color: COLORS.text,
        fontSize: FONT_SIZE.xl,
        fontWeight: 'bold',
    },
    profileIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#666',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
        marginTop: SPACING.l,
    },
    timerLabel: {
        color: '#888',
        fontSize: FONT_SIZE.m,
        marginBottom: SPACING.s,
    },
    timer: {
        color: COLORS.text,
        fontSize: 42,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    list: {
        paddingBottom: 100,
    },
    emptyText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
    fab: {
        position: 'absolute',
        bottom: SPACING.xl,
        right: SPACING.m,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF', // White FAB
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
