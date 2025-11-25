import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';

interface ScreenWrapperProps {
    children: React.ReactNode;
    style?: any;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.content}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.m,
    },
});
