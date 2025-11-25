import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS, FONT_SIZE } from '../constants/theme';

interface CircularProgressProps {
    size?: number;
    strokeWidth?: number;
    progress: number; // 0 to 100
    color?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    size = 200,
    strokeWidth = 20,
    progress,
    color = COLORS.accentRed,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    stroke={COLORS.surface}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <Circle
                    stroke={color}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
