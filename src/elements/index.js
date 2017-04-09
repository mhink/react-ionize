import BaseElement from './BaseElement';
import AppElement from './AppElement';
import WindowElement from './WindowElement';
import GenericElement from './GenericElement';
import TextElement from './TextElement';
import MenuElement from './MenuElement';
import SubmenuElement from './SubmenuElement';
import {
  SeparatorElement,
  RoleMenuItemElement,
  CustomMenuItemElement,
  isRoleMenuItemType,
} from './MenuItemElement';

export {
  BaseElement,
  AppElement,
  WindowElement,
  GenericElement,
  TextElement,
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
    case 'menu': {
      return new MenuElement(props, container);
    }
    case 'submenu': {
      return new SubmenuElement(props, container);
    }
    case 'sep': {
      return new SeparatorElement(props, container);
    }
    case 'item': {
      return new CustomMenuItemElement(props, container);
    }
    default: {
      if (isRoleMenuItemType(type)) {
        return new RoleMenuItemElement(type, props, container);
      } else {
        return new GenericElement(type, props, container);
      }
    }
  }
};
