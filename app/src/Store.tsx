import { makeAutoObservable } from "mobx";
import {
  addShoppingItem,
  changeBoughtInShoppingList,
  changeItemDescription,
  changeItemNeedToBuy,
  clearShoppingList,
  deleteItem,
  getChecklists,
  getUser,
  logout,
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
  }

  async getUser() {
    const user = await getUser();
    if (user) {
      this.setUser(user);
      await this.getChecklist();
      return user;
    } else {
      return null;
    }
  }

  async logoutUser() {
    const res = await logout();
    if (res) {
      this.setUser(null);
      this.setChecklist(undefined, "", []);
    }
  }

  async getChecklist() {
    const checklist = await getChecklists();
    if (checklist) {
      this.setChecklist(checklist.id, checklist.name, checklist.shopping_items);
    }
  }

  setChecklist(id: number | undefined, name: string, items: DBShoppingItem[]) {
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
    }
  }

  async setDescription(id: number, newValue: string) {
    if (this.checklistId && newValue) {
      await changeItemDescription(id, newValue, this.checklistId);
    }
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

  async clearShoppingList() {
    if (this.checklistId) {
      await clearShoppingList(this.checklistId);
      this.shoppingItems = this.shoppingItems.map((list) => ({
        ...list,
        needToBuy: false,
        boughtInChecklist: false,
      }));
    }
  }

  async changeBoughtInCheckList(id: number, option: boolean) {
    if (this.checklistId) {
      const res = await changeBoughtInShoppingList(
        id,
        option,
        this.checklistId
      );
      const shoppingItems = this.shoppingItems.map((list) =>
        list.id === res.id
          ? {
              ...list,
              boughtInShoppingList: res.bought_in_shopping_list,
              lastBought: res.last_bought,
            }
          : list
      );
      this.setShoppingItems(shoppingItems);
    }
  }

  setShoppingItems(newShoppingItems: ShoppingItem[]) {
    this.shoppingItems = newShoppingItems;
  }

  async deleteItem(id: number) {
    if (this.checklistId) {
      await deleteItem(id, this.checklistId);
      const shoppingItems = this.shoppingItems.filter((list) => list.id !== id);
      this.setShoppingItems(shoppingItems);
    }
  }

  setUser(username: string | null) {
    this.user = username;
  }
}

const store = new Store();

export default store;
