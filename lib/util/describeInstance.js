import type { Container, Instance, TextInstance } from './IonizeFiber';

export default (
  instance: (Container | Instance | TextInstance)
): string => {
  let msg = `${instance.tag} `;

  switch (instance.tag) {
    case 'CONTAINER':
      msg += '(C) '
      break;
    case 'INSTANCE':
      msg += `(${instance.type}) `;
      break;
    case 'TEXT':
      msg += `("${instance.text}") `;
      break;
  }
  return msg;
};
