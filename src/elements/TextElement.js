export default class TextElement {
  constructor(
    text          : string,
    rootContainer : IonizeContainer,
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
