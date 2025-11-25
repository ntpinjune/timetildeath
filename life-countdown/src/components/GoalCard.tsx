import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { Goal } from '../context/UserContext';
import * as LucideIcons from 'lucide-react-native';
import { Check } from 'lucide-react-native';

interface GoalCardProps {
    goal: Goal;
    onPress: () => void;
    onCheck?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress, onCheck }) => {
    // Dynamically get icon component
    const IconComponent = (LucideIcons as any)[goal.icon] || LucideIcons.Circle;

    // Mock heatmap data if not present
    const history = goal.history || Array(105).fill(false).map(() => Math.random() > 0.5);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <IconComponent size={24} color={COLORS.textSecondary} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{goal.title}</Text>
                    <Text style={styles.description} numberOfLines={1}>
                        {goal.description || 'Go for a short walk to clear the mind'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.checkButton} onPress={onCheck}>
                    <Check size={20} color={COLORS.background} strokeWidth={3} />
                </TouchableOpacity>
            </View>

            <View style={styles.heatmapContainer}>
                {history.map((active, index) => (
                    <View
                        key={index}
                        style={[
                            styles.heatmapCell,
                            { backgroundColor: active ? '#4ADE80' : '#2A2A2A' } // Green or Dark Gray
                        ]}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111', // Darker background for card
        borderRadius: 16,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: '#222',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    textContainer: {
        flex: 1,
        marginRight: SPACING.m,
    },
    title: {
        color: COLORS.text,
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
        marginBottom: 2,
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZE.xs,
    },
    checkButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#4ADE80', // Green
        justifyContent: 'center',
        alignItems: 'center',
    },
    heatmapContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    heatmapCell: {
        width: 10,
        height: 10,
        borderRadius: 2,
    },
});
