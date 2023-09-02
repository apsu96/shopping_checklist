import { makeAutoObservable } from "mobx";

export const LOCAL_STORAGE_KEY = "shoppingApp";

export enum Period {
  weekly = "Once a weeek",
  biWeekly = "Once in 2 weeks",
  monthly = "Once a year",
}

export enum Category {
  grocery = "Grocery",
  household = "Household Essentials",
}
export interface ShoppingItem {
  id: string;
  description: string;
  period: Period;
  category: Category;
  needToBuy: boolean;
}

class Store {
  checkList: ShoppingItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.getData();
  }

  setShoppingList(item: ShoppingItem) {
    this.checkList.push(item);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.checkList));
  }

  getData() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      this.checkList = JSON.parse(savedData);
    }
  }
}

const store = new Store();

export default store;