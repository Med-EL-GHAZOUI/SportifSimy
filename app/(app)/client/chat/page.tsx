import { ChatbotPanel } from "@/components/chatbot-panel";
import { getCurrentUser } from "@/lib/auth";
import { getClientChatHistory } from "@/services/chat-service";

export default async function ClientChatPage() {
  const user = await getCurrentUser();
  const conversations = await getClientChatHistory(user!.id);

  return (
    <div className="ss-page">
      <div className="ss-container">
        <ChatbotPanel conversations={conversations} />
      </div>
    </div>
  );
}
