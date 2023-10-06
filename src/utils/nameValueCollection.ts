export default class NameValueCollection<T> {
  private items: T[] = [];
  private itemIndex: { [name: string]: number } = {};

  addItem(name: string, item: T) {
    this.items.push(item);
    this.itemIndex[name] = this.items.length - 1;
  }

  getItemByName(name: string) {
    const index = this.itemIndex[name];
    return index !== undefined ? this.items[index] : undefined;
  }

  getItemByIndex(index: number) {
    return this.items[index];
  }

  removeItemByName(name: string): void {
    const index = this.itemIndex[name];
    if (index !== undefined) {
      this.items.splice(index, 1);
      delete this.itemIndex[name];
    }
  }

  clear() {
    this.itemIndex = {};
    this.items = [];
  }

  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) {
    return this.items.forEach(callbackfn, thisArg);
  }

  get length(): number {
    return this.items.length;
  }

  *[Symbol.iterator](): IterableIterator<T> {
    for (const item of this.items) {
      yield item;
    }
  }
}
