import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Goal {
    id: string;
    title: string;
    color: string;
    icon: string; // Lucide icon name
    progress: number; // 0 to 100
    timeSpent: string;
    deadline?: Date;
    description?: string;
    history?: boolean[]; // Array representing daily completion status for heatmap
}

interface UserContextType {
    birthDate: Date | null;
    setBirthDate: (date: Date) => void;
    lifeExpectancy: number;
    setLifeExpectancy: (years: number) => void;
    goals: Goal[];
    addGoal: (goal: Goal) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
    const [goals, setGoals] = useState<Goal[]>([]);

    const addGoal = (goal: Goal) => {
        setGoals((prev) => [...prev, goal]);
    };

    const updateGoal = (id: string, updates: Partial<Goal>) => {
        setGoals((prev) =>
            prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal))
        );
    };

    const deleteGoal = (id: string) => {
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
    };

    return (
        <UserContext.Provider
            value={{
                birthDate,
                setBirthDate,
                lifeExpectancy,
                setLifeExpectancy,
                goals,
                addGoal,
                updateGoal,
                deleteGoal,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
