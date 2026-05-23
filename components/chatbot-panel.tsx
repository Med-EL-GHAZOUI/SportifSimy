"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

type Message = {
  id: string;
  sender: "CLIENT" | "ASSISTANT" | "COACH";
  content: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
};

export function ChatbotPanel({ conversations }: { conversations: Conversation[] }) {
  const [conversationId, setConversationId] = useState(conversations[0]?.id);
  const [messages, setMessages] = useState<Message[]>(conversations[0]?.messages ?? []);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    if (message.trim().length < 2) {
      setError("Écrivez au moins 2 caractères pour que le coach IA comprenne votre besoin.");
      return;
    }

    setError("");
    setLoading(true);
    const optimistic: Message = { id: crypto.randomUUID(), sender: "CLIENT", content: message };
    setMessages((current) => [...current, optimistic]);
    const currentMessage = message;
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage, conversationId })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message ?? "Erreur chatbot");
      setConversationId(payload.data.conversationId);
      setMessages((current) => [...current, payload.data.reply]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="ss-card p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#bdbaff]/40 text-[#4e45e4]"><Bot className="h-6 w-6" /></div>
          <div>
            <h2 className="font-black text-[#2d3337]">Historique</h2>
            <p className="text-xs text-[#596063]">Anciennes conversations</p>
          </div>
        </div>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => {
                setConversationId(conversation.id);
                setMessages(conversation.messages);
              }}
              className="w-full rounded-2xl bg-[#f1f4f6] p-3 text-left text-sm font-bold text-[#2d3337] transition hover:bg-white"
            >
              {conversation.title}
            </button>
          ))}
        </div>
      </aside>

      <section className="ss-card flex min-h-[620px] flex-col overflow-hidden">
        <header className="border-b border-[#dde3e7] p-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#91feef]/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#006259]">
            <Sparkles className="h-3 w-3" /> Coach IA
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#2d3337]">Assistant intelligent</h1>
          <p className="mt-1 text-sm text-[#596063]">Posez vos questions sur entraînement, nutrition, progression ou utilisation de l'app.</p>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f7f9fb] p-6">
          {messages.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-[#596063] shadow-[0_4px_24px_rgba(45,51,55,0.04)]">
              Exemple: “Je veux perdre du gras mais je suis fatigué, que dois-je faire cette semaine ?”
            </div>
          ) : null}
          {messages.map((item) => (
            <div key={item.id} className={`flex ${item.sender === "CLIENT" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-3xl p-4 text-sm leading-6 ${item.sender === "CLIENT" ? "bg-[#4e45e4] text-white" : "bg-white text-[#2d3337] shadow-[0_4px_24px_rgba(45,51,55,0.04)]"}`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-[#dde3e7] bg-white p-4">
          {error ? <p className="mb-3 rounded-xl bg-[#ac3149]/10 px-4 py-2 text-sm font-semibold text-[#770326]">{error}</p> : null}
          <div className="flex gap-3">
            <input
              className="min-h-12 flex-1 rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 outline-none focus:border-[#4e45e4]"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder="Décrivez votre besoin..."
            />
            <button disabled={loading} onClick={() => void sendMessage()} className="rounded-2xl bg-[#4e45e4] px-5 text-white disabled:opacity-50" type="button">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
