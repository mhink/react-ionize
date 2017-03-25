import BaseElement from './BaseElement';
import AppElement from './AppElement';
import WindowElement from './WindowElement';
import GenericElement from './GenericElement';

export {
  BaseElement,
  AppElement,
  WindowElement,
  GenericElement,
};

export const TYPE_TO_ELEMENT_MAP: { [string]: BaseElement }= {
  'app': AppElement,
  'window': WindowElement,
};
