import { ChatSender, NotificationType, RecommendationType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function detectIntent(message: string) {
  const text = message.toLowerCase();
  if (text.includes("nutrition") || text.includes("calorie") || text.includes("repas")) return "nutrition";
  if (text.includes("programme") || text.includes("entrain") || text.includes("séance") || text.includes("seance")) return "training";
  if (text.includes("poids") || text.includes("progress") || text.includes("photo")) return "progress";
  if (text.includes("fatigue") || text.includes("sommeil") || text.includes("stress")) return "recovery";
  if (text.includes("comment") || text.includes("aide") || text.includes("utiliser")) return "guidance";
  return "general";
}

async function buildClientContext(clientId: string) {
  const [client, checkIns, program, nutrition] = await Promise.all([
    prisma.user.findUnique({ where: { id: clientId } }),
    prisma.checkIn.findMany({ where: { clientId }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.program.findFirst({ where: { clientId, status: "ACTIVE" }, include: { sessions: true } }),
    prisma.nutritionPlan.findFirst({ where: { clientId, status: "ACTIVE" }, include: { meals: true } })
  ]);

  return { client, checkIns, program, nutrition };
}

function buildReply(intent: string, context: Awaited<ReturnType<typeof buildClientContext>>, message: string) {
  const goal = context.client?.goal ?? "votre objectif principal";
  const lastWeight = context.checkIns[0] ? `${Number(context.checkIns[0].weightKg)} kg` : "pas encore renseigné";

  if (intent === "nutrition") {
    return `D'après votre objectif (${goal}) et votre dernier poids (${lastWeight}), gardez vos repas simples et réguliers. Priorité: protéines à chaque repas, légumes, hydratation, et respect du plan ${context.nutrition?.title ?? "actif"}. Si vous avez faim, ajoutez d'abord des légumes ou ajustez avec votre coach.`;
  }

  if (intent === "training") {
    return `Votre programme ${context.program?.title ?? "actif"} doit rester progressif. Commencez par terminer les séances prévues, notez votre effort RPE, puis augmentez légèrement les charges seulement si la technique reste propre.`;
  }

  if (intent === "progress") {
    return `Pour suivre votre progression, comparez surtout les tendances: poids moyen, photos, énergie et adhérence. Un seul check-in ne suffit pas; envoyez vos données chaque semaine pour obtenir une recommandation plus précise.`;
  }

  if (intent === "recovery") {
    return `Si fatigue, sommeil bas ou stress élevé apparaissent, réduisez l'intensité avant de réduire la régularité. Objectif: 7-9h de sommeil, marche légère, hydratation, et signalez-le à votre coach au prochain check-in.`;
  }

  if (intent === "guidance") {
    return `Je peux vous guider étape par étape: 1. consultez Training pour les séances, 2. Nutrition pour les repas, 3. Check-ins pour envoyer poids/photo/feedback, 4. Progress pour voir l'évolution. Dites-moi ce que vous voulez faire maintenant.`;
  }

  return `J'ai compris: "${message}". Pour vous aider précisément, dites-moi votre priorité actuelle: entraînement, nutrition, progression, fatigue ou utilisation de l'application.`;
}

function recommendationForIntent(intent: string, context: Awaited<ReturnType<typeof buildClientContext>>) {
  if (intent === "nutrition") {
    return {
      type: RecommendationType.NUTRITION,
      title: "Stabiliser l'apport nutritionnel",
      body: `Suivez le plan ${context.nutrition?.title ?? "actif"} pendant 7 jours sans changement majeur avant d'évaluer les résultats.`,
      confidence: 82
    };
  }

  if (intent === "training") {
    return {
      type: RecommendationType.TRAINING,
      title: "Progression contrôlée",
      body: "Terminez toutes les séances prévues cette semaine et notez l'effort ressenti après chaque séance.",
      confidence: 78
    };
  }

  if (intent === "recovery") {
    return {
      type: RecommendationType.RECOVERY,
      title: "Priorité récupération",
      body: "Si la fatigue persiste, privilégiez une séance plus légère et améliorez sommeil/hydratation pendant 48h.",
      confidence: 74
    };
  }

  return {
    type: RecommendationType.HABIT,
    title: "Check-in régulier",
    body: "Envoyez un check-in hebdomadaire avec poids, photo et feedback pour améliorer les recommandations.",
    confidence: 70
  };
}

export async function createChatTurn(clientId: string, message: string, conversationId?: string) {
  const context = await buildClientContext(clientId);
  const intent = detectIntent(message);

  const conversation = conversationId
    ? await prisma.chatConversation.findFirst({ where: { id: conversationId, clientId } })
    : null;

  const activeConversation =
    conversation ??
    (await prisma.chatConversation.create({
      data: { clientId, title: message.slice(0, 48) || "Conversation fitness" }
    }));

  const reply = buildReply(intent, context, message);
  const recommendation = recommendationForIntent(intent, context);

  const [, assistantMessage, savedRecommendation] = await prisma.$transaction([
    prisma.chatMessage.create({
      data: {
        conversationId: activeConversation.id,
        userId: clientId,
        sender: ChatSender.CLIENT,
        intent,
        content: message
      }
    }),
    prisma.chatMessage.create({
      data: {
        conversationId: activeConversation.id,
        sender: ChatSender.ASSISTANT,
        intent,
        content: reply
      }
    }),
    prisma.recommendation.create({
      data: { ...recommendation, clientId }
    }),
    prisma.notification.create({
      data: {
        clientId,
        type: NotificationType.SYSTEM,
        title: "Nouvelle recommandation",
        body: recommendation.title
      }
    })
  ]);

  return { conversationId: activeConversation.id, reply: assistantMessage, recommendation: savedRecommendation };
}

export function getClientChatHistory(clientId: string) {
  return prisma.chatConversation.findMany({
    where: { clientId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { updatedAt: "desc" },
    take: 10
  });
}
