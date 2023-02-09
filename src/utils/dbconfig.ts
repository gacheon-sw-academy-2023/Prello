export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'password', keypath: 'password', options: { unique: false } },
        { name: 'nickname', keypath: 'nickname', options: { unique: true } },
      ],
    },
    {
      store: 'workspace',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'owner', keypath: 'owner', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'summary', keypath: 'summary', options: { unique: false } },
        {
          name: 'memberInfo',
          keypath: 'memberInfo',
          options: { unique: false },
        },
      ],
    },
    {
      store: 'card',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title' },
        { name: 'order', keypath: 'order' },
      ],
    },
    {
      store: 'item',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title' },
        { name: 'order', keypath: 'order' },
        { name: 'cardId', keypath: 'cardId' },
        { name: 'description', keypath: 'description' },
        { name: 'date', keypath: 'date' },
        { name: 'members', keypath: 'members' },
      ],
    },
  ],
};
