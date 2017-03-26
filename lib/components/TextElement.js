export default class TextElement {
  constructor(
    text          : string,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    this.text = text;
  }

  commitUpdate(
    oldText       : string,
    newText       : string,
  ) {
    this.text = newText;
  }
}
