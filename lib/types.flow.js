export type Props = Object;
export type HostContext = {||};
export type PropsDiff = Object;
export type Container = {|
  tag                   : 'CONTAINER',
  children              : Array<Instance | TextInstance>,
|};

export type Instance = {|
  tag                   : 'INSTANCE',
  type                  : string,
  props                 : Object,
  children              : Array<Instance | TextInstance>,
  rootContainerInstance : Container,
|};

export type TextInstance = {|
  tag                   : 'TEXT',
  text                  : string,
|};
