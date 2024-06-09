export const StorageKey = {
  Theme: '$$theme$$',
  NoticeList: '$$notice_list$$',
  FaqList: '$$faq_list$$',
  // user
  Auth: '$$auth$$',
  Fcm: '$$fcm$$',
} as const;

export type TStorageKey = typeof StorageKey;

export type StorageKey = TStorageKey[keyof TStorageKey];
