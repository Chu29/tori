import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import ChatsScreen from "@/screens/ChatsScreen";
import ChatDetailScreen from "@/screens/ChatDetailScreen";
import StatusScreen from "@/screens/StatusScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";
import { mockChats } from "@/data/mockData";
import { Spacing, Typography, BorderRadius } from "@/constants/theme";

export type ChatsStackParamList = {
  ChatsList: undefined;
  ChatDetail: { chatId: string };
  Status: undefined;
};

const Stack = createNativeStackNavigator<ChatsStackParamList>();

function ChatDetailHeader({ chatId }: { chatId: string }) {
  const { theme } = useTheme();
  const chat = mockChats.find((c) => c.id === chatId);

  if (!chat) return null;

  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: chat.user.avatar }} style={styles.headerAvatar} />
      <View style={styles.headerInfo}>
        <ThemedText style={styles.headerName}>{chat.user.name}</ThemedText>
        <ThemedText
          style={[
            styles.headerStatus,
            {
              color: chat.user.isOnline
                ? theme.onlineStatus
                : theme.textSecondary,
            },
          ]}
        >
          {chat.user.isOnline ? "Online" : chat.user.lastSeen}
        </ThemedText>
      </View>
    </View>
  );
}

export default function ChatsStackNavigator() {
  const screenOptions = useScreenOptions();
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ChatsList"
        component={ChatsScreen}
        options={{
          headerTitle: "Tori",
          headerLeft: () => (
            <HeaderButton onPress={() => {}}>
              <Feather name="menu" size={24} color={theme.text} />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={({ route }) => ({
          headerTitle: () => <ChatDetailHeader chatId={route.params.chatId} />,
          headerRight: () => (
            <View style={styles.headerActions}>
              <HeaderButton onPress={() => {}}>
                <Feather name="video" size={22} color={theme.text} />
              </HeaderButton>
              <HeaderButton onPress={() => {}}>
                <Feather name="phone" size={22} color={theme.text} />
              </HeaderButton>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Status"
        component={StatusScreen}
        options={{
          headerTitle: "Status",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerInfo: {
    gap: 2,
  },
  headerName: {
    ...Typography.body,
    fontWeight: "600",
  },
  headerStatus: {
    ...Typography.caption,
  },
  headerActions: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
});
