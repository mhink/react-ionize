import BaseElement from './BaseElement';
import AppElement from './AppElement';
import WindowElement from './WindowElement';
import GenericElement from './GenericElement';
import TextElement from './TextElement';
import MessageDialogElement from './MessageDialogElement';

export {
  BaseElement,
  AppElement,
  WindowElement,
  GenericElement,
  TextElement,
  MessageDialogElement,
};

export const TYPE_TO_ELEMENT_MAP: { [string]: BaseElement }= {
  'app': AppElement,
  'window': WindowElement,
  'dialog': MessageDialogElement,
};
