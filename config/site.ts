/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for all business information.
 *  Edit this file to update the whole website.
 *  Everything marked  TODO  must be replaced before launch.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Muscle Fitness Studio',
  shortName: 'MU-FI',
  tagline: 'Stronger. Healthier. Happier.',
  description:
    "Saidapet's premium fitness destination. Modern equipment, certified trainers and early-morning timings that fit your life.",
  city: 'Saidapet, Chennai',
  url: 'https://musclefitnessstudio.vercel.app', // TODO: replace with your real domain once deployed

  phone: '+91 98411 17337',
  phoneRaw: '+919841117337',
  whatsapp: 'https://wa.me/919841117337',
  email: 'musclefittness@gmail.com', // TODO: confirm spelling ("fittness" vs "fitness")

  address: {
    line1: 'No.4 & 5, ICICI Bank Building',
    line2: 'Mosque St, Sarathy Nagar',
    city: 'Saidapet, Chennai',
    state: 'Tamil Nadu',
    postalCode: '600015',
    country: 'IN',
    landmark: 'Located in the ICICI Bank Building',
  },

  /* Searching by business name made Google pick a different place, so the map
     is keyed off the street address instead.
     TODO (most accurate): on your Google Business listing open
     Share -> Embed a map, copy the src="..." URL and paste it into `embed`.
     That pins your exact door rather than geocoding the street. */
  maps: {
    query: 'Muscle Fitness Studio, No 4 & 5, Mosque Street, Sarathy Nagar, Saidapet, Chennai, Tamil Nadu 600015',
    embed:
      'https://www.google.com/maps?q=Muscle+Fitness+Studio%2C+No+4+%26+5%2C+Mosque+Street%2C+Sarathy+Nagar%2C+Saidapet%2C+Chennai%2C+Tamil+Nadu+600015&output=embed',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Muscle+Fitness+Studio%2C+No+4+%26+5%2C+Mosque+Street%2C+Sarathy+Nagar%2C+Saidapet%2C+Chennai%2C+Tamil+Nadu+600015',
  },

  /* Credit line in the footer. Add a url to make it a link. */
  poweredBy: { name: 'K.K.Krishvik', url: '' },

  socials: {
    instagram: 'https://www.instagram.com/musclefitness_studio/',
    facebook: 'https://www.facebook.com/p/Muscle-fitness-centre-100090832421165/',
    youtube: '', // TODO: add if you start a channel (leave '' to keep the icon hidden)
  },
} as const;

export function waLink(message: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ── Opening hours ─────────────────────────────────────────── */
/* Times are 24h "HH:MM" in Asia/Kolkata. closed: true for a rest day. */

export type DayHours = {
  day: string;
  short: string;
  open: string;
  close: string;
  closed?: boolean;
};

/** Index 0 = Sunday … 6 = Saturday (matches JavaScript getDay()). */
export const hours: DayHours[] = [
  { day: 'Sunday', short: 'Sun', open: '06:00', close: '11:00' },
  { day: 'Monday', short: 'Mon', open: '05:00', close: '23:00' },
  { day: 'Tuesday', short: 'Tue', open: '05:00', close: '23:00' },
  { day: 'Wednesday', short: 'Wed', open: '05:00', close: '21:30' },
  { day: 'Thursday', short: 'Thu', open: '05:00', close: '23:00' },
  { day: 'Friday', short: 'Fri', open: '05:00', close: '23:00' },
  { day: 'Saturday', short: 'Sat', open: '05:00', close: '23:00' },
];

/* ── Membership plans ──────────────────────────────────────── */
/* TODO: replace every price below with your real pricing. */

export type Plan = {
  name: string;
  price: string;
  period: string;
  save?: string;
  popular?: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: 'Monthly',
    price: '₹1,500', // TODO: real price
    period: '/ month',
    features: [
      'Full gym floor access',
      'Free fitness assessment',
      'Locker & changing room',
      'Open 7 days a week',
    ],
  },
  {
    name: 'Quarterly',
    price: '₹4,000', // TODO: real price
    period: '/ 3 months',
    save: 'Save ₹500',
    features: [
      'Everything in Monthly',
      'Personalised workout plan',
      'Monthly progress tracking',
      'Guest pass (1 per month)',
    ],
  },
  {
    name: 'Half-Yearly',
    price: '₹7,000', // TODO: real price
    period: '/ 6 months',
    save: 'Save ₹2,000',
    popular: true,
    features: [
      'Everything in Quarterly',
      'Basic diet & nutrition plan',
      'Body composition check-ins',
      'Priority trainer support',
    ],
  },
  {
    name: 'Yearly',
    price: '₹12,000', // TODO: real price
    period: '/ 12 months',
    save: 'Best savings',
    features: [
      'Everything in Half-Yearly',
      '2 free personal training sessions',
      'Full diet & nutrition guidance',
      'Freeze membership up to 30 days',
    ],
  },
];

/* ── Quick facts strip ─────────────────────────────────────── */
/* Only facts you can stand behind — no invented member counts or
   years-in-business figures. Everything here is checkable by a visitor. */

export const quickFacts = [
  { value: '5 AM', label: 'Doors Open' },
  { value: '11 PM', label: 'Last Session' },
  { value: '7 Days', label: 'Open Every Week' },
  { value: '₹0', label: 'Joining Fee' },
];

/* ── Trainers ──────────────────────────────────────────────── */
/* TODO: replace names, roles and photos with your real team.
   Drop photos in /public/images/trainers/ and update `image`. */

export const trainers = [
  {
    name: 'Trainer Name 1', // TODO
    role: 'Head Coach · Strength & Conditioning', // TODO
    bio: 'Certified strength coach helping members build a solid foundation safely.', // TODO
    image: '/images/gallery/03-training-floor.jpg', // TODO: /images/trainers/trainer-1.jpg
  },
  {
    name: 'Trainer Name 2', // TODO
    role: 'Personal Trainer · Weight Loss', // TODO
    bio: 'Specialises in sustainable fat-loss programmes and habit coaching.', // TODO
    image: '/images/gallery/04-functional-trainer.jpg', // TODO
  },
  {
    name: 'Trainer Name 3', // TODO
    role: 'Nutrition & Functional Training', // TODO
    bio: 'Builds simple, home-friendly diet plans around Chennai food habits.', // TODO
    image: '/images/gallery/02-dumbbell-rack.jpg', // TODO
  },
];

/* ── Testimonials ──────────────────────────────────────────── */
/* TODO: THESE ARE PLACEHOLDER EXAMPLES, NOT REAL REVIEWS.
   Replace them with genuine member reviews (with permission)
   before the site goes live. */

export const testimonials = [
  {
    name: 'Placeholder Member 1', // TODO
    result: 'Lost 8 kg in 4 months', // TODO
    quote:
      'Example review text. Replace this with a real member review before launch.', // TODO
  },
  {
    name: 'Placeholder Member 2', // TODO
    result: 'Gained 6 kg lean muscle', // TODO
    quote:
      'Example review text. Replace this with a real member review before launch.', // TODO
  },
  {
    name: 'Placeholder Member 3', // TODO
    result: 'Training since 2022', // TODO
    quote:
      'Example review text. Replace this with a real member review before launch.', // TODO
  },
];

/* ── Gallery ───────────────────────────────────────────────── */
/* Real Muscle Fitness Studio photos, colour-graded to the gold/charcoal palette.
   To add more: drop the photo in /public/images/gallery/ and add a line here. */

export const gallery = [
  { src: '/images/gallery/01-cardio-studio.jpg', alt: 'Cardio studio with treadmills and bikes by the window at Muscle Fitness Studio, Saidapet' },
  { src: '/images/gallery/02-dumbbell-rack.jpg', alt: 'Full dumbbell rack from 2.5 kg upwards' },
  { src: '/images/gallery/03-training-floor.jpg', alt: 'Main training floor with functional trainer and leg press' },
  { src: '/images/gallery/04-functional-trainer.jpg', alt: 'Smith machine and cable functional trainer' },
  { src: '/images/gallery/05-leg-press.jpg', alt: 'Plate-loaded leg press and hack squat machine' },
  { src: '/images/gallery/06-cardio-turf.jpg', alt: 'Cardio zone with turf running strip' },
  { src: '/images/gallery/07-lat-pulldown.jpg', alt: 'Lat pulldown and seated row station with flat bench' },
  { src: '/images/gallery/08-pec-fly.jpg', alt: 'Pec fly and rear delt machine' },
  { src: '/images/gallery/09-assisted-chin.jpg', alt: 'Assisted chin and dip machine' },
  { src: '/images/gallery/10-leg-curl.jpg', alt: 'Prone leg curl and leg extension machine' },
  { src: '/images/gallery/11-preacher-curl.jpg', alt: 'Preacher curl bench with EZ bar' },
  { src: '/images/gallery/12-bench-area.jpg', alt: 'Adjustable benches and incline bench area' },
  { src: '/images/gallery/13-studio.jpg', alt: 'Training studio with mats and stability balls' },
  { src: '/images/gallery/14-belt-squat.jpg', alt: 'Plate-loaded belt squat and hip thrust station' },
  { src: '/images/gallery/15-lat-pulldown-bench.jpg', alt: 'Lat pulldown and low row station with bench' },
];

/* ── Amenities / facilities ────────────────────────────────── */
/* TODO: remove anything you don't actually offer, and add what you do. */

export const amenities = [
  'Strength Training',
  'Free Weights',
  'Cardio Zone',
  'Functional Training',
  'Personal Training',
  'Group Classes',
  'Core Training',
  'Weight Loss Programs',
  'Weight Gain Programs',
  'Diet Consultation',
  'Certified Trainers',
  'Body Composition Check',
  'Lockers & Changing Room',
  'Drinking Water',
  'Air Conditioned Floor',
  'Sanitised Equipment',
  'Student Offers',
  'Corporate Plans',
  'Senior Citizen Friendly',
  'Ladies Friendly Timings',
];

/* ── Google rating ─────────────────────────────────────────── */
/* TODO: replace with your real Google Business rating and review count,
   and paste your "write a review" link. Leave url as '' to hide the button. */

export const googleReview = {
  rating: '4.8',
  count: '120+',
  url: '', // e.g. https://g.page/r/xxxxxxxx/review
};

/* ── Branch locator ────────────────────────────────────────── */
/* One branch today. To add another, copy the block and fill it in —
   the locator, map and nav all pick it up automatically. */

export type Branch = {
  id: string;
  name: string;
  area: string;
  address: string[];
  landmark: string;
  phone: string;
  phoneRaw: string;
  hoursSummary: string;
  mapQuery: string;
  mapEmbed: string;
  directions: string;
  /* TODO: verify these travel times against Google Maps for your exact door. */
  nearby: { place: string; time: string; mode: 'walk' | 'drive' }[];
};

export const branches: Branch[] = [
  {
    id: 'saidapet',
    name: 'Muscle Fitness Studio — Saidapet',
    area: 'Saidapet',
    address: [
      'No.4 & 5, ICICI Bank Building',
      'Mosque St, Sarathy Nagar',
      'Saidapet, Chennai, Tamil Nadu 600015',
    ],
    landmark: 'Above / beside the ICICI Bank — look for the yellow MU-FI board',
    phone: '+91 98411 17337',
    phoneRaw: '+919841117337',
    hoursSummary: 'Mon – Sat 5 AM – 11 PM · Sun 6 – 11 AM',
    mapQuery: 'Muscle Fitness Studio, No 4 & 5, Mosque Street, Sarathy Nagar, Saidapet, Chennai, Tamil Nadu 600015',
    mapEmbed: 'https://www.google.com/maps?q=Muscle+Fitness+Studio%2C+No+4+%26+5%2C+Mosque+Street%2C+Sarathy+Nagar%2C+Saidapet%2C+Chennai%2C+Tamil+Nadu+600015&output=embed',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Muscle+Fitness+Studio%2C+No+4+%26+5%2C+Mosque+Street%2C+Sarathy+Nagar%2C+Saidapet%2C+Chennai%2C+Tamil+Nadu+600015',
    nearby: [
      { place: 'Saidapet Metro Station', time: '5 min', mode: 'walk' },
      { place: 'Saidapet Bus Terminus', time: '6 min', mode: 'walk' },
      { place: 'Saidapet Railway Station', time: '8 min', mode: 'walk' },
      { place: 'Little Mount Metro', time: '7 min', mode: 'drive' },
      { place: 'Guindy', time: '10 min', mode: 'drive' },
      { place: 'T. Nagar', time: '12 min', mode: 'drive' },
    ],
  },
];

/* ── Diet & nutrition ──────────────────────────────────────── */
/* Written for Chennai / Tamil food habits. General guidance only —
   trainers personalise it after a body composition check.
   TODO: have your trainer or dietitian review these before launch. */

export type Meal = { time: string; name: string; items: string };

export type DietPlan = {
  id: string;
  goal: string;
  blurb: string;
  calories: string;
  protein: string;
  meals: Meal[];
};

export const dietPlans: DietPlan[] = [
  {
    id: 'weight-loss',
    goal: 'Weight Loss',
    blurb: 'A calorie deficit that still keeps you full — built around normal home food, not boiled chicken and misery.',
    calories: '~1,500 – 1,700 kcal',
    protein: '90 – 110 g protein',
    meals: [
      { time: '5:30 AM', name: 'Pre-workout', items: 'Half a banana + black coffee or plain water' },
      { time: '8:00 AM', name: 'Breakfast', items: '3 idli + sambar + 2 boiled eggs (or 100 g paneer)' },
      { time: '11:00 AM', name: 'Mid-morning', items: 'Buttermilk + a small handful of peanuts' },
      { time: '1:30 PM', name: 'Lunch', items: '1 cup rice or 2 ragi dosa, dal, poriyal, fish or chicken curry, curd' },
      { time: '5:00 PM', name: 'Evening', items: 'Sundal (chana) or sprouts + tea without sugar' },
      { time: '8:00 PM', name: 'Dinner', items: '2 chapati + vegetable kurma, or grilled chicken with salad' },
    ],
  },
  {
    id: 'muscle-gain',
    goal: 'Muscle Gain',
    blurb: 'A steady surplus with protein at every meal, so the weight you add is muscle and not just the scale moving.',
    calories: '~2,600 – 3,000 kcal',
    protein: '130 – 160 g protein',
    meals: [
      { time: '5:30 AM', name: 'Pre-workout', items: 'Banana + 2 spoons peanut butter, or soaked oats' },
      { time: '8:00 AM', name: 'Breakfast', items: '4 idli + sambar + 3 eggs + a glass of milk' },
      { time: '11:00 AM', name: 'Mid-morning', items: 'Sprouts + mixed nuts + milk or curd' },
      { time: '1:30 PM', name: 'Lunch', items: '1.5 cups rice, dal, poriyal, 150 g chicken or fish, curd' },
      { time: '5:00 PM', name: 'Post-workout', items: 'Milk + banana, or whey if you use it, plus sundal' },
      { time: '8:30 PM', name: 'Dinner', items: '3 chapati + paneer or chicken gravy + vegetables' },
    ],
  },
  {
    id: 'maintenance',
    goal: 'Stay Fit',
    blurb: 'For when you are happy with your weight and want to hold it while staying strong and energetic.',
    calories: '~2,000 – 2,300 kcal',
    protein: '100 – 120 g protein',
    meals: [
      { time: '6:00 AM', name: 'Pre-workout', items: 'Banana or a few soaked almonds' },
      { time: '8:30 AM', name: 'Breakfast', items: '2 dosa + chutney + 2 eggs, or pongal with sambar' },
      { time: '11:30 AM', name: 'Mid-morning', items: 'Seasonal fruit + buttermilk' },
      { time: '1:30 PM', name: 'Lunch', items: '1 cup rice, dal, two vegetables, fish or egg, curd' },
      { time: '5:00 PM', name: 'Evening', items: 'Tea + sundal, steamed corn or a boiled egg' },
      { time: '8:00 PM', name: 'Dinner', items: '2 chapati or millet rice + gravy + salad' },
    ],
  },
];

/* Protein per typical serving. Values are approximate — they vary by cut,
   brand and how it is cooked. */
export const proteinFoods = [
  { food: 'Chicken breast', serving: '100 g cooked', protein: '31 g' },
  { food: 'Soya chunks', serving: '50 g dry', protein: '26 g' },
  { food: 'Fish (vanjaram / seer)', serving: '100 g', protein: '22 g' },
  { food: 'Paneer', serving: '100 g', protein: '18 g' },
  { food: 'Chana / kondakadalai', serving: '1 cup cooked', protein: '15 g' },
  { food: 'Moong dal', serving: '1 cup cooked', protein: '14 g' },
  { food: 'Peanuts', serving: '50 g', protein: '13 g' },
  { food: 'Eggs', serving: '2 whole', protein: '12 g' },
  { food: 'Milk', serving: '250 ml', protein: '8 g' },
  { food: 'Curd', serving: '1 cup', protein: '7 g' },
  { food: 'Sprouts', serving: '1 cup', protein: '7 g' },
  { food: 'Ragi flour', serving: '100 g', protein: '7 g' },
];

export const nutritionTips = [
  {
    title: 'Drink For Chennai Weather',
    text: 'Aim for 3 – 4 litres a day, and more in summer. After an early-morning session add a pinch of salt and lemon to water, or have tender coconut water — you lose a lot of salt sweating here.',
  },
  {
    title: 'Use Millets, Not Just Rice',
    text: 'Swap rice for ragi, kambu or thinai three or four times a week. More fibre, slower release of energy, and you stay full longer — without giving up food you actually like.',
  },
  {
    title: 'Protein At Every Meal',
    text: 'Most people here eat plenty of carbs and almost no protein. Add eggs, curd, dal, sundal, fish or paneer to every single meal and half the problem is solved.',
  },
  {
    title: 'Eat Before You Train',
    text: 'Training at 5 AM on an empty stomach kills your strength. Even half a banana fifteen minutes before makes a noticeable difference to the session.',
  },
];

/* ── Athletes / motivation strip ───────────────────────────── */
/* These are free-licence photos from Pexels (free for commercial use, no
   attribution required) used as motivational imagery — they are NOT pictures
   of MU-FI members, and the copy never claims they are.
   TODO: replace with photos of your own members and trainers (with their
   written permission) as soon as you have them. Real local faces convert far
   better than stock and help your Google ranking. */

export const athletes = [
  { src: '/images/athletes/01-deadlift.jpg', title: 'Lift Heavy', note: 'Barbell strength work, coached from day one' },
  { src: '/images/athletes/02-women.jpg', title: 'Women Lift Here', note: 'Unisex floor with ladies-friendly timings' },
  { src: '/images/athletes/03-definition.jpg', title: 'Build Definition', note: 'Muscle building and conditioning' },
  { src: '/images/athletes/04-power.jpg', title: 'Get Stronger', note: 'Progress at your own pace, every level welcome' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Membership', href: '#membership' },
  { label: 'Diet', href: '#diet' },
  { label: 'Timings', href: '#timings' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];
