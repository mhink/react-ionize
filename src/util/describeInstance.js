import type { Container, Instance, TextInstance } from '../types.flow.js';

export default (
  instance: Container | Instance | TextInstance,
): string => {
  if (instance.constructor && instance.constructor.name === 'App') {
    return 'APP';
  }

  if (instance.tag && instance.tag === 'INSTANCE') {
    return `INSTANCE (${instance.type}) `;
  }

  if (instance.tag && instance.tag === 'TEXT') {
    return `TEXT ("${instance.text}")`;
  }

  return '';
};
