import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Button } from '../../components/Button';
import { CalendarHeatmap } from '../../components/CalendarHeatmap';
import { COLORS, FONT_SIZE, SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { differenceInSeconds, addYears } from 'date-fns';
import * as LucideIcons from 'lucide-react-native';

export const GoalDetail = () => {
    const { goals, birthDate, lifeExpectancy } = useUser();
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { goalId } = route.params;
    const goal = goals.find((g) => g.id === goalId);
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

    if (!goal) return null;

    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Dynamically get icon component
    const IconComponent = (LucideIcons as any)[goal.icon] || LucideIcons.Circle;

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Button
                        title="<"
                        onPress={() => navigation.goBack()}
                        variant="outline"
                        style={styles.backButton}
                        textStyle={{ fontSize: 20 }}
                    />
                    <Text style={styles.headerTitle}>Goal Details: {goal.title}</Text>
                    <View style={styles.placeholder} />
                </View>

                <View style={styles.timerContainer}>
                    <Text style={styles.timerLabel}>Time Left to Live</Text>
                    <Text style={styles.timer}>{formatNumber(secondsLeft)}</Text>
                </View>

                <View style={styles.goalInfo}>
                    <View style={styles.goalHeader}>
                        <Text style={styles.goalTitle}>{goal.title}</Text>
                        <IconComponent size={24} color={goal.color} />
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { backgroundColor: goal.color, width: `${goal.progress}%` }]} />
                        <View style={[styles.progressBarBackground, { backgroundColor: goal.color, opacity: 0.2 }]} />
                    </View>

                    <View style={styles.statsRow}>
                        <View>
                            <Text style={styles.statLabel}>Progress</Text>
                            <Text style={styles.statValue}>{goal.progress} %</Text>
                        </View>
                        <View>
                            <Text style={styles.statLabel}>Time spent</Text>
                            <Text style={styles.statValue}>{goal.timeSpent}</Text>
                        </View>
                    </View>
                </View>

                <CalendarHeatmap />

                <View style={styles.actions}>
                    <Button
                        title="Edit Goal"
                        onPress={() => { }}
                        variant="outline"
                        style={styles.actionButton}
                    />
                    <Button
                        title="Mark Complete"
                        onPress={() => { }}
                        style={styles.actionButton}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingBottom: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    backButton: {
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.s,
        borderRadius: 12,
    },
    headerTitle: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.s,
    },
    placeholder: {
        width: 40,
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    timerLabel: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.m,
        marginBottom: SPACING.s,
    },
    timer: {
        color: COLORS.text,
        fontSize: 40,
        fontWeight: 'bold',
    },
    goalInfo: {
        marginBottom: SPACING.l,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    goalTitle: {
        color: COLORS.text,
        fontSize: FONT_SIZE.l,
        fontWeight: '600',
    },
    progressContainer: {
        height: 12,
        borderRadius: 6,
        position: 'relative',
        marginBottom: SPACING.m,
    },
    progressBar: {
        height: '100%',
        borderRadius: 6,
        position: 'absolute',
        zIndex: 1,
    },
    progressBarBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        position: 'absolute',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statLabel: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.s,
        marginBottom: 4,
    },
    statValue: {
        color: COLORS.text,
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.m,
        marginTop: SPACING.xl,
    },
    actionButton: {
        flex: 1,
    },
});
