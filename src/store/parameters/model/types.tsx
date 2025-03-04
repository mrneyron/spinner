export type ParametersState = {
  gifts: ListGifts;
  variant: VariantType | null;
};

export type VariantType = {
  id: number;
  name: string;
  description: string;
  pattern: string;
};

export type GiftType = {
  id: number;
  name: string;
  description: string;
  order: number;
};

export type ListGifts = GiftType[];

export type ListVariants = VariantType[];

export const variantsBase: ListVariants = [
  {
    id: 1,
    name: 'Рандом',
    description:
      'Просто рандом в любом может выпасть любое ты никак не влияешь',
    pattern: 'any',
  },
  {
    id: 2,
    name: 'Псевдо-рандом',
    description:
      'Рандом но ты ставишь приоритеты, типо вероятность выпадания в процентах напротив каждой карточки',
    pattern: 'any',
  },
  {
    id: 3,
    name: 'Настраиваемый',
    description: 'Твоя хуйня где ты знаешь чё где',
    pattern: 'any',
  },
  {
    id: 4,
    name: 'Настраиваемый+',
    description:
      'Где ты знаешь, где что лежит и можешь переставить или закинуть в выбранное число дешёвую вещь, или вообще фотку хуя',
    pattern: 'any',
  },
  {
    id: 5,
    name: 'Хуй вам, а не приз',
    description:
      'Само по себе переставляется так, чтоб нихуя никому не выпало, даже если ты 9 вещей положишь в 10 карточек - всё равно, всегда будет хуй на щеку',
    pattern: 'any',
  },
];
