import {
  amenities,
  dietPlans,
  hours,
  plans,
  proteinFoods,
  site,
  waLink,
} from '@/config/site';
import { formatRange, getOpenState, groupedHours } from './hours';

export type BotAction = { label: string; href: string; external?: boolean };
export type BotReply = { text: string; actions?: BotAction[] };

export type Intent = {
  id: string;
  /** Shown as a quick-reply chip when `chip` is true. */
  label: string;
  chip?: boolean;
  keywords: string[];
  reply: () => BotReply;
};

const rupees = () => plans.map((p) => `• ${p.name} — ${p.price} ${p.period}`).join('\n');

/** Answers are generated from config/site.ts, so the bot can never drift
 *  out of sync with what the rest of the page says. */
export const intents: Intent[] = [
  {
    id: 'timings',
    label: 'Timings',
    chip: true,
    keywords: ['timing', 'time', 'hour', 'open', 'close', 'closing', 'opening', 'when', 'sunday', 'saturday', 'morning', 'night', 'early'],
    reply: () => {
      const state = getOpenState();
      return {
        text: `${state.open ? 'Open now' : 'Closed now'} — ${state.message}.`,
        actions: [
          { label: 'See full timings', href: '#timings' },
          { label: 'Call us', href: `tel:${site.phoneRaw}` },
        ],
      };
    },
  },
  {
    id: 'fees',
    label: 'Membership fees',
    chip: true,
    keywords: ['fee', 'fees', 'price', 'cost', 'charge', 'rate', 'membership', 'membership plan', 'monthly', 'yearly', 'quarterly', 'half-yearly', 'admission', 'joining', 'money', 'rupee', 'amount', 'how much'],
    reply: () => ({
      text: `Plans from ${plans[0].price} ${plans[0].period}. No joining fee.`,
      actions: [
        { label: 'View plans', href: '#membership' },
        { label: 'Ask on WhatsApp', href: waLink(`Hi, please share the current membership fees at ${site.name}.`), external: true },
      ],
    }),
  },
  {
    id: 'location',
    label: 'Location',
    chip: true,
    keywords: ['where', 'location', 'address', 'place', 'direction', 'reach', 'map', 'saidapet', 'metro', 'bus', 'near', 'parking', 'landmark'],
    reply: () => ({
      text: `${site.address.line2}, ${site.address.city} — 5 min walk from Saidapet Metro.`,
      actions: [
        { label: 'Get directions', href: site.maps.directions, external: true },
        { label: 'View on map', href: '#location' },
        { label: 'Call us', href: `tel:${site.phoneRaw}` },
      ],
    }),
  },
  {
    id: 'programs',
    label: 'Programs',
    chip: true,
    keywords: ['program', 'service', 'training', 'workout', 'weight loss', 'muscle', 'cardio', 'personal', 'strength', 'functional', 'fat', 'gain', 'offer'],
    reply: () => ({
      text: `Strength, weight loss, muscle building, personal training, cardio and diet guidance.`,
      actions: [{ label: 'See programs', href: '#programs' }],
    }),
  },
  {
    id: 'trial',
    label: 'Free trial',
    chip: true,
    keywords: ['trial', 'free', 'demo', 'try', 'visit', 'tour', 'pass', 'first'],
    reply: () => ({
      text: `Your first session is free — tour the floor and train before you decide.`,
      actions: [
        { label: 'Claim free pass', href: waLink(`Hi, I'd like to claim a free trial session at ${site.name}.`), external: true },
        { label: `Call ${site.phone}`, href: `tel:${site.phoneRaw}` },
      ],
    }),
  },
  {
    id: 'contact',
    label: 'Contact',
    chip: true,
    keywords: ['contact', 'phone', 'call', 'number', 'mail', 'email', 'whatsapp', 'talk', 'speak', 'enquiry', 'enquire'],
    reply: () => ({
      text: `${site.phone} — call or WhatsApp. We usually reply the same day.`,
      actions: [
        { label: 'Call now', href: `tel:${site.phoneRaw}` },
        { label: 'WhatsApp', href: waLink(`Hi, I have a question about ${site.name}.`), external: true },
        { label: 'Enquiry form', href: '#contact' },
      ],
    }),
  },
  {
    id: 'diet',
    label: 'Diet plans',
    keywords: ['diet', 'diet plan', 'food', 'food plan', 'meal plan', 'nutrition', 'eat', 'protein', 'meal', 'calorie', 'millet', 'veg', 'non veg'],
    reply: () => ({
      text: `Plans built on normal Chennai food — idli, sambar, rice, curd, sundal.`,
      actions: [
        { label: 'See diet plans', href: '#diet' },
        { label: 'Get my plan', href: waLink(`Hi, I'd like a personalised diet plan from ${site.name}.`), external: true },
      ],
    }),
  },
  {
    id: 'ladies',
    label: 'Ladies',
    keywords: ['ladies', 'women', 'woman', 'girl', 'female', 'unisex', 'safe'],
    reply: () => ({
      text:
        `Yes — unisex gym, women train here daily, with ladies-friendly timings. You're welcome to visit first.`,
      actions: [{ label: 'Book a visit', href: waLink(`Hi, I'd like to visit ${site.name} before joining.`), external: true }],
    }),
  },
  {
    id: 'facilities',
    label: 'Facilities',
    keywords: ['facility', 'facilities', 'equipment', 'machine', 'amenity', 'locker', 'ac', 'shower', 'wifi', 'steam'],
    reply: () => ({
      text: `${amenities.slice(0, 5).join(', ')} and more.`,
      actions: [
        { label: 'All facilities', href: '#programs' },
        { label: 'See gallery', href: '#gallery' },
      ],
    }),
  },
  {
    id: 'trainers',
    label: 'Trainers',
    keywords: ['trainer', 'coach', 'staff', 'instructor', 'personal trainer'],
    reply: () => ({
      text:
        `Certified trainers who coach your form from day one. Personal training is available as an add-on.`,
      actions: [
        { label: 'Meet the team', href: '#gallery' },
        { label: 'Ask about PT', href: waLink(`Hi, please share the personal training rates at ${site.name}.`), external: true },
      ],
    }),
  },
  {
    id: 'beginner',
    label: 'Beginner',
    keywords: ['beginner', 'new', 'never', 'start', 'first time', 'shy', 'scared', 'age', 'old'],
    reply: () => ({
      text: `Most members started as complete beginners — a trainer writes your first plan.`,
      actions: [{ label: 'Start with a free session', href: waLink(`Hi, I'm a beginner and would like to start at ${site.name}.`), external: true }],
    }),
  },
];

const GREETING = /^(hi|hello|hey|vanakkam|hai|hlo|good (morning|evening|afternoon))\b/i;
const THANKS = /\b(thanks|thank you|nandri|ok|okay|super)\b/i;

export function answer(input: string): BotReply {
  const q = input.toLowerCase().trim();

  if (!q) return { text: 'Ask me anything about the gym — timings, fees, location or programmes.' };

  if (GREETING.test(q)) {
    const state = getOpenState();
    return {
      text: `Hello! We're ${state.open ? 'open now' : 'closed right now'} — ${state.message}. What would you like to know?`,
    };
  }
  if (THANKS.test(q) && q.length < 20) {
    return { text: `Happy to help! Anything else you'd like to know?` };
  }

  // Score each intent by how many of its keywords appear in the question.
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) {
      if (!q.includes(k)) continue;
      // A multi-word phrase is a much stronger signal than a single word
      // that several intents might share, so weight it heavily.
      score += k.includes(' ') ? k.length * 3 : k.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (best) return best.reply();

  return {
    text: `Sorry, I didn't catch that — try one of the buttons, or ask our team directly.`,
    actions: [
      { label: 'Ask on WhatsApp', href: waLink(`Hi, I have a question about ${site.name}: `), external: true },
      { label: `Call ${site.phone}`, href: `tel:${site.phoneRaw}` },
    ],
  };
}
