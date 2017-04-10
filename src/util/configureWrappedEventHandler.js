import EventEmitter from 'events';
import BaseElement from '../elements/BaseElement';

export default function configureWrappedEventHandler(
  emitter: EventEmitter,
  attachedHandlers: { [string]: Function },
  propKey: string,
  eventKey: string,
  rawHandler: Function,
  wrapper: Function
) {
  const rawEventKey = `${eventKey}_raw`
  const removingHandler = (
   rawHandler === undefined &&
   attachedHandlers[rawEventKey] !== undefined
  );

  const changingHandler = (
    rawHandler !== undefined &&
    attachedHandlers[rawEventKey] !== undefined && 
    rawHandler !== attachedHandlers[rawEventKey]
  );

  const newHandler = (
    rawHandler !== undefined &&
    attachedHandlers[rawEventKey] === undefined
  );

  if (removingHandler || changingHandler) {
    const existingHandler = attachedHandlers[eventKey];
    emitter.removeListener(eventKey, existingHandler);
    delete attachedHandlers[eventKey];
    delete attachedHandlers[rawEventKey];
  }

  if (changingHandler || newHandler) {
    const handler = () => wrapper(rawHandler);
    attachedHandlers[eventKey] = handler;
    attachedHandlers[rawEventKey] = rawHandler;
    emitter.on(eventKey, handler);
  }
}
