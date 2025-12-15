import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Spacing, BorderRadius, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import { mockStatuses, currentUser } from '@/data/mockData';

function StatusAvatar({ 
  imageUrl, 
  name, 
  hasNewStatus, 
  isMyStatus = false 
}: { 
  imageUrl: string; 
  name: string; 
  hasNewStatus?: boolean;
  isMyStatus?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <Pressable style={({ pressed }) => [styles.statusItem, pressed && { opacity: 0.7 }]}>
      <View style={styles.statusAvatarContainer}>
        {hasNewStatus ? (
          <LinearGradient
            colors={['#8B5CF6', '#A855F7', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.statusRing}
          >
            <Image source={{ uri: imageUrl }} style={styles.statusAvatar} />
          </LinearGradient>
        ) : (
          <View style={[styles.statusRingInactive, { borderColor: theme.border }]}>
            <Image source={{ uri: imageUrl }} style={styles.statusAvatar} />
          </View>
        )}
        {isMyStatus && (
          <View style={[styles.addButton, { backgroundColor: theme.primary }]}>
            <Feather name="plus" size={12} color="#FFFFFF" />
          </View>
        )}
      </View>
      <ThemedText style={styles.statusName} numberOfLines={1}>{name}</ThemedText>
    </Pressable>
  );
}

function StatusVideoPreview({ imageUrl, username }: { imageUrl: string; username: string }) {
  const { theme } = useTheme();

  return (
    <Pressable style={({ pressed }) => [styles.videoPreview, pressed && { opacity: 0.9 }]}>
      <Image source={{ uri: imageUrl }} style={styles.videoThumbnail} />
      <View style={styles.videoOverlay}>
        <View style={styles.playIcon}>
          <Feather name="play" size={20} color="#FFFFFF" />
        </View>
        <View style={styles.videoInfo}>
          <ThemedText style={styles.videoUsername}>@{username}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

export default function StatusScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xl }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <ThemedText style={[styles.searchPlaceholder, { color: theme.textSecondary }]}>Search...</ThemedText>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusRow}
        >
          <StatusAvatar 
            imageUrl={currentUser.avatar} 
            name="My Status" 
            isMyStatus 
          />
          {mockStatuses.map((status) => (
            <StatusAvatar
              key={status.id}
              imageUrl={status.user.avatar}
              name={status.user.name.split(' ')[0]}
              hasNewStatus={status.hasNewStatus}
            />
          ))}
        </ScrollView>

        <View style={styles.videosSection}>
          <View style={styles.videosGrid}>
            <StatusVideoPreview 
              imageUrl="https://picsum.photos/200/300?random=1"
              username="AdhityaPatra"
            />
            <StatusVideoPreview 
              imageUrl="https://picsum.photos/200/300?random=2"
              username="Momon"
            />
            <StatusVideoPreview 
              imageUrl="https://picsum.photos/200/300?random=3"
              username="Fitria"
            />
            <StatusVideoPreview 
              imageUrl="https://picsum.photos/200/300?random=4"
              username="TheWhispering"
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    height: 44,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    ...Typography.body,
  },
  statusRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statusItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statusAvatarContainer: {
    position: 'relative',
  },
  statusRing: {
    width: 74,
    height: 74,
    borderRadius: 37,
    padding: 3,
  },
  statusRingInactive: {
    width: 74,
    height: 74,
    borderRadius: 37,
    padding: 3,
    borderWidth: 2,
  },
  statusAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusName: {
    ...Typography.caption,
    maxWidth: 70,
    textAlign: 'center',
  },
  videosSection: {
    paddingHorizontal: Spacing.lg,
  },
  videosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  videoPreview: {
    width: '48%',
    aspectRatio: 0.7,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    padding: Spacing.sm,
  },
  playIcon: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoUsername: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
