import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing, BorderRadius, Typography, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { mockChats, Chat } from "@/data/mockData";
import { ChatsStackParamList } from "@/navigation/ChatsStackNavigator";

type NavigationProp = NativeStackNavigationProp<ChatsStackParamList>;

function ChatItem({ chat, onPress }: { chat: Chat; onPress: () => void }) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chatItem,
        pressed && styles.chatItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.user.avatar }} style={styles.avatar} />
        {chat.user.isOnline && (
          <View
            style={[
              styles.onlineIndicator,
              { backgroundColor: theme.onlineStatus },
            ]}
          />
        )}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <ThemedText style={styles.chatName}>{chat.user.name}</ThemedText>
          <ThemedText style={[styles.chatTime, { color: theme.textSecondary }]}>
            {chat.lastMessageTime}
          </ThemedText>
        </View>
        <View style={styles.chatPreview}>
          {chat.isTyping ? (
            <ThemedText
              style={[styles.typingText, { color: theme.typingIndicator }]}
            >
              Typing...
            </ThemedText>
          ) : (
            <ThemedText
              style={[styles.lastMessage, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {chat.lastMessage}
            </ThemedText>
          )}
          {chat.unreadCount > 0 && (
            <View
              style={[
                styles.unreadBadge,
                { backgroundColor: theme.unreadBadge },
              ]}
            >
              <ThemedText style={styles.unreadText}>
                {chat.unreadCount}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function ReminderCard() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.reminderCard,
        { backgroundColor: theme.backgroundDefault },
      ]}
    >
      <View style={styles.reminderContent}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=TM&background=fbbf24&color=fff&size=48",
          }}
          style={styles.reminderAvatar}
        />
        <View style={styles.reminderText}>
          <ThemedText style={styles.reminderTitle} numberOfLines={2}>
            Tae Min seems to be waiting for a reply to your message since 1
            month ago
          </ThemedText>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.replyButton,
          { borderColor: theme.border },
          pressed && { opacity: 0.7 },
        ]}
      >
        <ThemedText style={[styles.replyButtonText, { color: theme.text }]}>
          Reply Now
        </ThemedText>
      </Pressable>
    </View>
  );
}

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: Chat; index: number }) => {
    if (index === 0) {
      return (
        <>
          <ReminderCard />
          <ChatItem
            chat={item}
            onPress={() =>
              navigation.navigate("ChatDetail", { chatId: item.id })
            }
          />
        </>
      );
    }
    return (
      <ChatItem
        chat={item}
        onPress={() => navigation.navigate("ChatDetail", { chatId: item.id })}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchContainer, { paddingTop: Spacing.md }]}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search messages"
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.filterButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Feather name="sliders" size={20} color={theme.textSecondary} />
        </Pressable>
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBarHeight + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: theme.border }]} />
        )}
      />

      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.primary, bottom: tabBarHeight + Spacing.xl },
          pressed && { opacity: 0.8 },
        ]}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
  },
  filterButton: {
    padding: Spacing.sm,
  },
  listContent: {
    paddingTop: Spacing.md,
  },
  reminderCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  reminderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  reminderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reminderText: {
    flex: 1,
  },
  reminderTitle: {
    ...Typography.small,
  },
  replyButton: {
    alignSelf: "flex-start",
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
  },
  replyButtonText: {
    ...Typography.small,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  chatItemPressed: {
    opacity: 0.7,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  chatContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatName: {
    ...Typography.body,
    fontWeight: "600",
  },
  chatTime: {
    ...Typography.caption,
  },
  chatPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    ...Typography.small,
    flex: 1,
    marginRight: Spacing.sm,
  },
  typingText: {
    ...Typography.small,
    fontStyle: "italic",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    ...Typography.caption,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    marginLeft: 88,
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.fab,
  },
});
