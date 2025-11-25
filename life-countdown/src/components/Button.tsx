import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle
}) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return COLORS.primary;
            case 'secondary': return COLORS.surface;
            case 'outline': return 'transparent';
            default: return COLORS.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary': return COLORS.background;
            case 'secondary': return COLORS.text;
            case 'outline': return COLORS.text;
            default: return COLORS.background;
        }
    };

    const getBorderWidth = () => {
        return variant === 'outline' ? 1 : 0;
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    borderWidth: getBorderWidth(),
                    borderColor: COLORS.text
                },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.xl,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        fontSize: FONT_SIZE.m,
        fontWeight: 'bold',
    },
});
