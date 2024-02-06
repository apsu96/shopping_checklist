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
  signIn,
  signUp,
} from "../api";
import { Checklist } from "./Checklist";

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
  user: string | null = null;
  shoppingItems: ShoppingItem[] = [];
  shoppingLists = [];
  checklists = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getUser() {
    const user = await getUser();
    if (user) {
      this.setUser(user);
      // await this.getChecklist();
      return user;
    } else {
      return null;
    }
  }

  async loginUser(username: string, password: string) {
    try {
      await signIn(username, password);
      store.setUser(username);
      // await this.getChecklist();
    } catch (err) {
      throw err;
    }
  }

  async signupUser(username: string, password: string) {
    try {
      await signUp(username, password);
      store.setUser(username);
      // await this.getChecklist();
    } catch (err) {
      throw err;
    }
  }

  async logoutUser() {
    const res = await logout();
    if (res) {
      this.setUser(null);
      // this.setChecklist(undefined, "", []);
    }
  }

  async getChecklists() {
    const checklist = await getChecklists();
    if (checklist.length > 0) {
      this.checklists = checklist.map(
        (list: {
          shopping_items: any[];
          id: number | undefined;
          name: string;
        }) => {
          const items = list.shopping_items.map((item) => ({
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
          }));
          return new Checklist(list.id, list.name, items);
        }
      );
    }
  }

  async clearShoppingList() {
    // if (this.checklistId) {
    // await clearShoppingList(this.checklistId);
    // this.shoppingItems = this.shoppingItems.map((list) => ({
    //   ...list,
    //   needToBuy: false,
    //   boughtInChecklist: false,
    // }));
    // }
  }

  async changeBoughtInCheckList(id: number, option: boolean) {
    // if (this.checklistId) {
    // const res = await changeBoughtInShoppingList(id, option, this.checklistId);
    // const shoppingItems = this.shoppingItems.map((list) =>
    //   list.id === res.id
    //     ? {
    //         ...list,
    //         boughtInShoppingList: res.bought_in_shopping_list,
    //         lastBought: res.last_bought,
    //       }
    //     : list
    // );
    // this.setShoppingItems(shoppingItems);
    // }
  }

  setShoppingItems(newShoppingItems: ShoppingItem[]) {
    this.shoppingItems = newShoppingItems;
  }

  async deleteItem(id: number) {
    // if (this.checklistId) {
    // await deleteItem(id, this.checklistId);
    // const shoppingItems = this.shoppingItems.filter((list) => list.id !== id);
    // this.setShoppingItems(shoppingItems);
    // }
  }

  setUser(username: string | null) {
    this.user = username;
  }

  get groceryItems() {
    return this.shoppingItems.filter(
      (item) => item.category === Category.grocery
    );
  }

  get householdItems() {
    return this.shoppingItems.filter(
      (item) => item.category === Category.household
    );
  }
}

const store = new Store();

export default store;
