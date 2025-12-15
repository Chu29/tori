import React from 'react';
import { View, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Spacing, BorderRadius, Typography, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import { mockUsers } from '@/data/mockData';

interface CallLog {
  id: string;
  user: typeof mockUsers[0];
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  time: string;
  duration?: string;
}

const mockCallLogs: CallLog[] = [
  { id: '1', user: mockUsers[0], type: 'outgoing', callType: 'video', time: 'Today, 2:30 PM', duration: '15:23' },
  { id: '2', user: mockUsers[1], type: 'missed', callType: 'voice', time: 'Today, 11:45 AM' },
  { id: '3', user: mockUsers[2], type: 'incoming', callType: 'voice', time: 'Yesterday, 8:00 PM', duration: '5:42' },
  { id: '4', user: mockUsers[3], type: 'outgoing', callType: 'voice', time: 'Yesterday, 3:15 PM', duration: '2:10' },
  { id: '5', user: mockUsers[4], type: 'missed', callType: 'video', time: 'Dec 9, 6:30 PM' },
  { id: '6', user: mockUsers[5], type: 'incoming', callType: 'video', time: 'Dec 8, 10:00 AM', duration: '32:15' },
];

function CallItem({ call }: { call: CallLog }) {
  const { theme } = useTheme();

  const getCallIcon = () => {
    if (call.type === 'missed') return 'phone-missed';
    if (call.type === 'incoming') return 'phone-incoming';
    return 'phone-outgoing';
  };

  const getCallColor = () => {
    if (call.type === 'missed') return '#EF4444';
    return theme.onlineStatus;
  };

  return (
    <Pressable style={({ pressed }) => [styles.callItem, pressed && { opacity: 0.7 }]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: call.user.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.callContent}>
        <ThemedText style={styles.callName}>{call.user.name}</ThemedText>
        <View style={styles.callInfo}>
          <Feather name={getCallIcon()} size={14} color={getCallColor()} />
          <ThemedText style={[styles.callTime, { color: theme.textSecondary }]}>
            {call.time}
            {call.duration && ` (${call.duration})`}
          </ThemedText>
        </View>
      </View>
      <Pressable style={({ pressed }) => [styles.callButton, pressed && { opacity: 0.7 }]}>
        <Feather name={call.callType === 'video' ? 'video' : 'phone'} size={20} color={theme.primary} />
      </Pressable>
    </Pressable>
  );
}

export default function CallsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={mockCallLogs}
        renderItem={({ item }) => <CallItem call={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBarHeight + Spacing.xl }
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
      />

      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.primary, bottom: tabBarHeight + Spacing.xl },
          pressed && { opacity: 0.8 }
        ]}
      >
        <Feather name="phone" size={24} color="#FFFFFF" />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: Spacing.md,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  callContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  callName: {
    ...Typography.body,
    fontWeight: '600',
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  callTime: {
    ...Typography.small,
  },
  callButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginLeft: 82,
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.fab,
  },
});
