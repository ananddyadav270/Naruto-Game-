import { AvatarId, ShinobiAvatar } from '../types/quiz';

export const SHINOBI_AVATARS: ShinobiAvatar[] = [
  {
    id: 'uzumaki',
    name: 'Flame Striker',
    title: 'Will of Fire Shinobi',
    imageSrc: '/src/assets/images/avatar_uzumaki_hero_1795373260680.jpg',
    accentClass: 'border-orange-500/60',
  },
  {
    id: 'uchiha',
    name: 'Crimson Eye',
    title: 'Sharingan Prodigy',
    imageSrc: '/src/assets/images/avatar_uchiha_prodigy_1795373260384.jpg',
    accentClass: 'border-red-500/60',
  },
  {
    id: 'kunoichi',
    name: 'Emerald Medic',
    title: 'Chakra Specialist',
    imageSrc: '/src/assets/images/avatar_kunoichi_medic_1795373261010.jpg',
    accentClass: 'border-emerald-500/60',
  },
  {
    id: 'sensei',
    name: 'Lightning Jonin',
    title: 'Tactical Squad Leader',
    imageSrc: '/src/assets/images/avatar_sensei_jonin_1795373260729.jpg',
    accentClass: 'border-sky-500/60',
  },
];

export function getAvatarById(id: AvatarId): ShinobiAvatar {
  return SHINOBI_AVATARS.find((a) => a.id === id) ?? SHINOBI_AVATARS[0];
}
