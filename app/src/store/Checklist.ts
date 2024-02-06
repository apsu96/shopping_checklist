import { makeAutoObservable } from "mobx";
import { DBShoppingItem, ShoppingItem } from "./Store";
import {
  addShoppingItem,
  changeItemDescription,
  changeItemNeedToBuy,
} from "../api";

export class Checklist {
  checklistId: number | undefined;
  checklistName: string = "";
  shoppingItems: ShoppingItem[] = [];

  constructor(id: number | undefined, name: string, items: ShoppingItem[]) {
    this.checklistId = id;
    this.checklistName = name;
    this.shoppingItems = items;
    makeAutoObservable(this);
  }

  async addItem(item: ShoppingItem) {
    if (this.checklistId) {
      await addShoppingItem(item, this.checklistId);
      this.shoppingItems.push(item);
    }
  }

  async setDescription(id: number, newValue: string) {
    if (this.checklistId && newValue) {
      await changeItemDescription(id, newValue, this.checklistId);
    }
  }

  setShoppingItems(shoppingItems: ShoppingItem[]) {
    this.shoppingItems = shoppingItems;
  }

  async setNeedToBuy(id: number, option: boolean) {
    if (this.checklistId) {
      await changeItemNeedToBuy(id, option, this.checklistId);
      const shoppingItems = this.shoppingItems.map((list) =>
        list.id === id ? { ...list, needToBuy: option } : list
      );
      this.setShoppingItems(shoppingItems);
    }
  }
}
