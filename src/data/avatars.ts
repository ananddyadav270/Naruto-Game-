import { AvatarId, ProfileAvatarBgId, ShinobiAvatar } from '../types/quiz';

export const SHINOBI_AVATARS: ShinobiAvatar[] = [
  {
    id: 'uzumaki',
    name: 'Naruto Uzumaki',
    title: 'Hero of the Hidden Leaf',
    village: 'Konohagakure',
    quote: 'I never go back on my word. That is my nindo, my ninja way!',
    imageSrc: '/src/assets/images/avatar_uzumaki_hero_1795373260680.jpg',
    accentClass: 'border-orange-500 shadow-orange-500/40',
  },
  {
    id: 'uchiha',
    name: 'Sasuke Uchiha',
    title: 'Avenger of the Clan',
    village: 'Uchiha Clan',
    quote: 'My dream doesn’t exist in the future. It lies in the past.',
    imageSrc: '/src/assets/images/avatar_uchiha_prodigy_1795373260384.jpg',
    accentClass: 'border-red-500 shadow-red-500/40',
  },
  {
    id: 'kunoichi',
    name: 'Sakura Haruno',
    title: 'Strength of a Hundred Seals',
    village: 'Konohagakure',
    quote: 'I am not going to just watch everyone’s backs anymore!',
    imageSrc: '/src/assets/images/avatar_kunoichi_medic_1795373261010.jpg',
    accentClass: 'border-emerald-500 shadow-emerald-500/40',
  },
  {
    id: 'sensei',
    name: 'Kakashi Hatake',
    title: 'The Copy Ninja',
    village: 'Konohagakure',
    quote: 'In the ninja world, those who break the rules are scum, but those who abandon their friends are worse than scum.',
    imageSrc: '/src/assets/images/avatar_sensei_jonin_1795373260729.jpg',
    accentClass: 'border-sky-500 shadow-sky-500/40',
  },
  {
    id: 'sage',
    name: 'Jiraiya the Gallant',
    title: 'Legendary Toad Sage',
    village: 'Mount Myoboku',
    quote: 'A shinobi’s life is not measured by how they lived, but rather by what they accomplished before their death.',
    imageSrc: '/src/assets/images/avatar_uzumaki_hero_1795373260680.jpg',
    accentClass: 'border-amber-500 shadow-amber-500/40',
  },
  {
    id: 'shadow',
    name: 'Itachi Uchiha',
    title: 'Guardian in the Shadows',
    village: 'Konoha Anbu',
    quote: 'True change cannot be made if it is bound by rules and limitations.',
    imageSrc: '/src/assets/images/avatar_uchiha_prodigy_1795373260384.jpg',
    accentClass: 'border-purple-500 shadow-purple-500/40',
  },
  {
    id: 'sand',
    name: 'Gaara of the Desert',
    title: 'Fifth Kazekage',
    village: 'Sunagakure',
    quote: 'Peace under an illusion is not true peace. It’s only meaningful if the real world achieves it.',
    imageSrc: '/src/assets/images/avatar_sensei_jonin_1795373260729.jpg',
    accentClass: 'border-amber-600 shadow-amber-600/40',
  },
  {
    id: 'yellowflash',
    name: 'Minato Namikaze',
    title: 'The Yellow Flash',
    village: 'Fourth Hokage',
    quote: 'If an ally is in danger, I will appear in the blink of an eye.',
    imageSrc: '/src/assets/images/avatar_uzumaki_hero_1795373260680.jpg',
    accentClass: 'border-yellow-400 shadow-yellow-400/40',
  },
];

export interface AvatarBgOption {
  id: ProfileAvatarBgId;
  name: string;
  cssBackground: string;
  accentGlow: string;
}

export const AVATAR_BG_OPTIONS: AvatarBgOption[] = [
  {
    id: 'leaf',
    name: 'Konoha Aura',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(34,197,94,0.35) 0%, rgba(20,83,45,0.7) 60%, #052e16 100%)',
    accentGlow: '#22c55e',
  },
  {
    id: 'fire',
    name: 'Will of Fire',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(249,115,22,0.45) 0%, rgba(185,28,28,0.75) 60%, #450a0a 100%)',
    accentGlow: '#f97316',
  },
  {
    id: 'lightning',
    name: 'Chidori Spark',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(56,189,248,0.45) 0%, rgba(30,58,138,0.8) 60%, #030712 100%)',
    accentGlow: '#38bdf8',
  },
  {
    id: 'sand',
    name: 'Desert Gold',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(245,158,11,0.45) 0%, rgba(146,64,14,0.75) 60%, #291203 100%)',
    accentGlow: '#f59e0b',
  },
  {
    id: 'sage',
    name: 'Sage Mode',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(234,179,8,0.45) 0%, rgba(161,98,7,0.7) 60%, #1a1003 100%)',
    accentGlow: '#eab308',
  },
  {
    id: 'void',
    name: 'Tsukuyomi Void',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.45) 0%, rgba(88,28,135,0.8) 60%, #090314 100%)',
    accentGlow: '#a855f7',
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(244,114,182,0.45) 0%, rgba(190,24,93,0.75) 60%, #35081c 100%)',
    accentGlow: '#f472b6',
  },
  {
    id: 'sun',
    name: 'Hokage Sun',
    cssBackground: 'radial-gradient(circle at 50% 40%, rgba(254,240,138,0.55) 0%, rgba(217,119,6,0.8) 60%, #301700 100%)',
    accentGlow: '#fef08a',
  },
];

export function getAvatarById(id: AvatarId): ShinobiAvatar {
  return SHINOBI_AVATARS.find((a) => a.id === id) ?? SHINOBI_AVATARS[0];
}

export function getAvatarBgById(id?: ProfileAvatarBgId): AvatarBgOption {
  if (!id) return AVATAR_BG_OPTIONS[0];
  return AVATAR_BG_OPTIONS.find((b) => b.id === id) ?? AVATAR_BG_OPTIONS[0];
}
