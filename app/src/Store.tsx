import { makeAutoObservable } from "mobx";
import {
  addShoppingItem,
  changeBoughtInShoppingList,
  changeItemDescription,
  changeItemLastBought,
  changeItemNeedToBuy,
  clearShoppingList,
  deleteItem,
} from "./api";

export const LOCAL_STORAGE_KEY = "shoppingApp";

export enum Period {
  weekly = "Once a weeek",
  biWeekly = "Once in 2 weeks",
  monthly = "Once a month",
}

export enum DBPeriod {
  weekly = 7,
  biWeekly = 14,
  monthly = 30,
}

export enum Category {
  grocery = "Grocery",
  household = "Household Essentials",
}
export interface ShoppingItem {
  id: number;
  description: string;
  period: Period;
  category: Category;
  needToBuy: boolean;
  boughtInShoppingList: boolean;
  lastBought: string | null;
}

export interface DBShoppingItem {
  id: number;
  description: string;
  period: DBPeriod;
  category: string;
  need_to_buy: boolean;
  bought_in_shopping_list: boolean;
  last_bought: string | null;
}

class Store {
  checklistId: number | undefined;
  user: string | null = null;
  checklistName: string = "";
  shoppingItems: ShoppingItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.getData();
  }

  setChecklist(id: number, name: string, items: DBShoppingItem[]) {
    this.checklistId = id;
    this.checklistName = name;
    this.shoppingItems = items.map((item) => {
      return {
        id: item.id,
        description: item.description,
        period:
          item.period === DBPeriod.weekly
            ? Period.weekly
            : item.period === DBPeriod.biWeekly
            ? Period.biWeekly
            : Period.monthly,
        category:
          item.category === Category.grocery
            ? Category.grocery
            : Category.household,
        needToBuy: item.need_to_buy,
        boughtInShoppingList: item.bought_in_shopping_list,
        lastBought: item.last_bought,
      };
    });
  }

  async setShoppingList(item: ShoppingItem) {
    if (this.checklistId) {
      await addShoppingItem(item, this.checklistId);
      this.shoppingItems.push(item);
      this.updateLocalStorage();
    }
  }

  async setDescription(index: number, newValue: string) {
    if (this.checklistId && newValue) {
      await changeItemDescription(index, newValue, this.checklistId);
      this.shoppingItems[index].description = newValue;
      this.updateLocalStorage();
    }
  }

  async setNeedToBuy(id: number, option: boolean) {
    if (this.checklistId) {
      await changeItemNeedToBuy(id, option, this.checklistId);
      this.shoppingItems = this.shoppingItems.map((list) =>
        list.id === id ? { ...list, needToBuy: option } : list
      );
      this.updateLocalStorage();
    }
  }

  async clearShoppingList() {
    if (this.checklistId) {
      await clearShoppingList(this.checklistId);
      this.shoppingItems = this.shoppingItems.map((list) => ({
        ...list,
        needToBuy: false,
        boughtInChecklist: false,
      }));
      this.updateLocalStorage();
    }
  }

  async setBoughtInCheckList(id: number, option: boolean) {
    if (this.checklistId) {
      await changeBoughtInShoppingList(id, option, this.checklistId);
      this.shoppingItems = this.shoppingItems.map((list) =>
        list.id === id ? { ...list, boughtInChecklist: option } : list
      );
      this.updateLocalStorage();
    }
  }

  async setLastBought(id: number, date: string) {
    if (this.checklistId) {
      await changeItemLastBought(id, date, this.checklistId);
      this.shoppingItems = this.shoppingItems.map((list) =>
        list.id === id ? { ...list, lastBought: date } : list
      );
      this.updateLocalStorage();
    }
  }

  async deleteItem(id: number) {
    if (this.checklistId) {
      await deleteItem(id, this.checklistId);
      this.shoppingItems = this.shoppingItems.filter((list) => list.id !== id);
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.shoppingItems));
  }

  getData() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      this.shoppingItems = JSON.parse(savedData);
    }
  }

  setUser(username: string | null) {
    this.user = username;
  }
}

const store = new Store();

export default store;
