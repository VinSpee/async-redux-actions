import ca from './';

const DEFAULT_MOCK = ca()()({
  PROFILE: new Promise(res => res('profile')),
  REGISTRATION: login => new Promise(res => res('registered', login)),
  EXPLORE_STATUS: () => 'status',
  FOO: undefined,
});

test('it should return something', () => {
  const actual = DEFAULT_MOCK;
  expect(actual).toBeDefined();
});

test('it should return an object of keys which match those given', () => {
  const actual = DEFAULT_MOCK;
  const expected = ['profile', 'registration', 'exploreStatus', 'foo'];
  expect(Object.keys(actual)).toEqual(expect.arrayContaining(expected));
});

test('actions should return creators', () => {
  const actual = DEFAULT_MOCK;
  const expected = 'actionCreator';
  expect(actual.foo.name).toEqual(expected);
  expect(actual.profile.name).toEqual(expected);
  expect(actual.profile.requested.name).toEqual(expected);
  expect(actual.profile.received.name).toEqual(expected);
  expect(actual.profile.rejected.name).toEqual(expected);
  expect(actual.registration.name).toEqual(expected);
  expect(actual.registration.requested.name).toEqual(expected);
  expect(actual.registration.received.name).toEqual(expected);
  expect(actual.registration.rejected.name).toEqual(expected);
  expect(actual.exploreStatus.name).toEqual(expected);
});

test('handles app namespaces', () => {
  const actual = ca({ prefix: '💎' })()({
    TEST: undefined,
  });
  const expected = '💎/TEST';

  expect(actual.test.toString()).toBe(expected);
});

test('handles entity namespaces', () => {
  const actual = ca()({ entity: 'DOER' })({
    TEST: undefined,
  });
  const expected = 'DOER/TEST';

  expect(actual.test.toString()).toBe(expected);
});

test('handles app and entity namespaces', () => {
  const actual = ca({ prefix: '💎' })({ entity: 'DOER' })({
    TEST: undefined,
  });
  const expected = '💎/DOER/TEST';

  expect(actual.test.toString()).toBe(expected);
});
