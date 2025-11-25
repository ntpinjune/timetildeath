import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

export const CalendarHeatmap = () => {
    // Mock data for the calendar
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const weeks = 5; // Show 5 weeks

    const renderGrid = () => {
        const grid = [];
        for (let i = 0; i < weeks; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                // Randomly assign status for demo purposes
                const status = Math.random();
                let color = COLORS.surface;
                if (status > 0.7) color = COLORS.accentGreen;
                else if (status > 0.4) color = COLORS.accentPurple;
                else if (status > 0.2) color = COLORS.accentOrange;

                week.push(
                    <View key={`${i}-${j}`} style={[styles.dayCell, { backgroundColor: color }]} />
                );
            }
            grid.push(<View key={i} style={styles.weekRow}>{week}</View>);
        }
        return grid;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.month}>December 2025</Text>
                <View style={styles.controls}>
                    <Text style={styles.control}>{'<'}</Text>
                    <Text style={styles.control}>{'>'}</Text>
                </View>
            </View>

            <View style={styles.daysHeader}>
                {days.map(day => (
                    <Text key={day} style={styles.dayLabel}>{day}</Text>
                ))}
            </View>

            <View style={styles.grid}>
                {renderGrid()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: SPACING.m,
        marginTop: SPACING.m,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    month: {
        color: COLORS.text,
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
    },
    controls: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    control: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.m,
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.s,
    },
    dayLabel: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.xs,
        width: 30,
        textAlign: 'center',
    },
    grid: {
        gap: SPACING.s,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayCell: {
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: '#333',
    },
});
