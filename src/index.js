import { createActions as act } from 'redux-actions';

const STATES = ['REQUESTED', 'RECEIVED', 'REJECTED'];
const isPromise = value => {
  let test = value;
  if (typeof value === 'function') {
    test = value();
  }
  return Promise.resolve(test) === test;
};

const createActions = (
  { states = STATES, prefix = '' } = {
    states: STATES,
    prefix: '',
  },
) => ({ entity = '' } = { entity: '' }) => actions =>
  act(
    Object.entries(actions).reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: isPromise(v) ? () => v : v,
        ...(v &&
          isPromise(v) &&
          states.reduce(
            (acc, curr) => ({
              ...acc,
              [`${k}/${curr}`]: undefined,
            }),
            {},
          )),
      }),
      {},
    ),
    { prefix: `${prefix}${entity !== '' ? `${prefix && '/'}${entity}` : ''}` },
  );

export default createActions;
