import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Spacing, BorderRadius, Typography, Shadows } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { mockChats, Message, attachmentOptions } from "@/data/mockData";
import { ChatsStackParamList } from "@/navigation/ChatsStackNavigator";

type ChatDetailRouteProp = RouteProp<ChatsStackParamList, "ChatDetail">;

function MessageBubble({
  message,
  isCurrentUser,
}: {
  message: Message;
  isCurrentUser: boolean;
}) {
  const { theme } = useTheme();

  if (message.type === "voice") {
    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser
            ? [styles.sentBubble, { backgroundColor: theme.messageSent }]
            : [
                styles.receivedBubble,
                {
                  backgroundColor: theme.messageReceived,
                  borderWidth: 1,
                  borderColor: theme.border,
                },
              ],
        ]}
      >
        <View style={styles.voiceMessage}>
          <Pressable
            style={({ pressed }) => [
              styles.playButton,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Feather
              name="play"
              size={16}
              color={isCurrentUser ? "#FFFFFF" : theme.text}
            />
          </Pressable>
          <View style={styles.waveformContainer}>
            {[...Array(20)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  {
                    height: Math.random() * 16 + 4,
                    backgroundColor: isCurrentUser
                      ? "rgba(255,255,255,0.6)"
                      : theme.textSecondary,
                  },
                ]}
              />
            ))}
          </View>
          <ThemedText
            style={[
              styles.voiceDuration,
              {
                color: isCurrentUser
                  ? "rgba(255,255,255,0.8)"
                  : theme.textSecondary,
              },
            ]}
          >
            0:{message.voiceDuration?.toString().padStart(2, "0")}
          </ThemedText>
        </View>
        <View style={styles.messageFooter}>
          <ThemedText
            style={[
              styles.timestamp,
              {
                color: isCurrentUser
                  ? "rgba(255,255,255,0.7)"
                  : theme.textSecondary,
              },
            ]}
          >
            {message.timestamp}
          </ThemedText>
          {isCurrentUser && (
            <Feather
              name="check-check"
              size={14}
              color={message.isRead ? "#60A5FA" : "rgba(255,255,255,0.5)"}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.messageBubble,
        isCurrentUser
          ? [styles.sentBubble, { backgroundColor: theme.messageSent }]
          : [
              styles.receivedBubble,
              {
                backgroundColor: theme.messageReceived,
                borderWidth: 1,
                borderColor: theme.border,
              },
            ],
      ]}
    >
      <ThemedText
        style={[
          styles.messageText,
          { color: isCurrentUser ? "#FFFFFF" : theme.text },
        ]}
      >
        {message.text}
      </ThemedText>
      <View style={styles.messageFooter}>
        <ThemedText
          style={[
            styles.timestamp,
            {
              color: isCurrentUser
                ? "rgba(255,255,255,0.7)"
                : theme.textSecondary,
            },
          ]}
        >
          {message.timestamp}
        </ThemedText>
        {isCurrentUser && (
          <Feather
            name="check-check"
            size={14}
            color={message.isRead ? "#60A5FA" : "rgba(255,255,255,0.5)"}
          />
        )}
      </View>
    </View>
  );
}

function AttachmentModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[
            styles.attachmentSheet,
            {
              backgroundColor: theme.backgroundRoot,
              paddingBottom: insets.bottom + Spacing.lg,
            },
          ]}
        >
          <View style={styles.attachmentGrid}>
            {attachmentOptions.map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) => [
                  styles.attachmentItem,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={onClose}
              >
                <View
                  style={[
                    styles.attachmentIcon,
                    { backgroundColor: theme.backgroundDefault },
                  ]}
                >
                  <Feather
                    name={option.icon as any}
                    size={24}
                    color={theme.primary}
                  />
                </View>
                <ThemedText style={styles.attachmentLabel}>
                  {option.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

export default function ChatDetailScreen() {
  const insets = useSafeAreaInsets();
  const route = useRoute<ChatDetailRouteProp>();
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const chat = mockChats.find((c) => c.id === route.params.chatId);

  if (!chat) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Chat not found</ThemedText>
      </ThemedView>
    );
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} isCurrentUser={item.senderId === "current"} />
  );

  return (
    <ThemedView style={styles.container}>
      {chat.user.isOnline || chat.isTyping ? (
        <View style={styles.statusBar}>
          {chat.isTyping ? (
            <ThemedText
              style={[styles.statusText, { color: theme.typingIndicator }]}
            >
              {chat.user.name} is typing...
            </ThemedText>
          ) : (
            <View style={styles.onlineStatus}>
              <View
                style={[
                  styles.onlineDot,
                  { backgroundColor: theme.onlineStatus },
                ]}
              />
              <ThemedText
                style={[styles.statusText, { color: theme.onlineStatus }]}
              >
                Online
              </ThemedText>
            </View>
          )}
        </View>
      ) : null}

      <FlatList
        ref={flatListRef}
        data={chat.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.inputContainer,
          {
            paddingBottom: insets.bottom + Spacing.sm,
            backgroundColor: theme.backgroundRoot,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.attachButton,
            { backgroundColor: theme.primary },
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => setShowAttachments(true)}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </Pressable>
        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          <TextInput
            style={[styles.textInput, { color: theme.text }]}
            placeholder="Type here"
            placeholderTextColor={theme.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Feather
            name={message.trim() ? "send" : "mic"}
            size={20}
            color={theme.primary}
          />
        </Pressable>
      </View>

      <AttachmentModal
        visible={showAttachments}
        onClose={() => setShowAttachments(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    alignItems: "center",
  },
  onlineStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    ...Typography.caption,
  },
  messagesList: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  sentBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: BorderRadius.xs,
  },
  receivedBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: BorderRadius.xs,
  },
  messageText: {
    ...Typography.body,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.xs,
  },
  timestamp: {
    ...Typography.caption,
  },
  voiceMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    minWidth: 160,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  waveformContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
  },
  voiceDuration: {
    ...Typography.caption,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 40,
    maxHeight: 120,
    justifyContent: "center",
  },
  textInput: {
    ...Typography.body,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  attachmentSheet: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  attachmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  attachmentItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  attachmentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  attachmentLabel: {
    ...Typography.small,
  },
});
