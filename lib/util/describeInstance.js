// @flow

import type { Instance, TextInstance } from '../types.flow.js';
import type { ElectronApp } from 'electron';

export default (
  instance: any,
): string => {
  let msg = `${instance.tag} `;

  switch (instance.tag) {
    case 'APP_CONTAINER':
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
