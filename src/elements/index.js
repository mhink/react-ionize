import BaseElement from './BaseElement';
import AppElement from './AppElement';
import WindowElement from './WindowElement';
import GenericElement from './GenericElement';
import TextElement from './TextElement';
import DialogElement from './DialogElement';
import MenuElement from './MenuElement';
import SubmenuElement from './SubmenuElement';

export {
  BaseElement,
  AppElement,
  WindowElement,
  GenericElement,
  TextElement,
  DialogElement,
  MenuElement,
  SubmenuElement,
};

export function createElectronInstance(
  type      : string,
  props     : Object,
  container : IonizeContainer,
  context   : HostContext,
): BaseElement {
  switch (type) {
    case 'app': {
      return new AppElement(props, container);
    }
    case 'window': {
      return new WindowElement(props, container);
    }
    case 'dialog': {
      return new DialogElement(props, container);
    }
    case 'menu': {
      if (!context.isMenu) {
        return new MenuElement(props, container);
      } else {
        return new SubmenuElement(props, container);
      }
    }
    default: {
      return new GenericElement(type, props, container);
    }
  }
};
