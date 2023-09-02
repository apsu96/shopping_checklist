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
  boughtInChecklist: boolean;
  lastBought: Date | null;
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

  setNeedToBuy(id: string, option: boolean) {
    this.checkList = this.checkList.map((list) =>
      list.id === id ? { ...list, needToBuy: option } : list
    );
    this.updateLocalStorage();
  }

  clearShoppingList() {
    this.checkList = this.checkList.map((list) => ({
      ...list,
      needToBuy: false,
      boughtInChecklist: false,
    }));
    this.updateLocalStorage();
  }

  setBoughtInCheckList(id: string, option: boolean) {
    this.checkList = this.checkList.map((list) =>
      list.id === id ? { ...list, boughtInChecklist: option } : list
    );
    this.updateLocalStorage();
  }

  setLastBought(id: string, date: Date) {
    this.checkList = this.checkList.map((list) =>
      list.id === id ? { ...list, lastBought: date } : list
    );
    this.updateLocalStorage();
  }

  deleteItem(id: string) {
    this.checkList = this.checkList.filter((list) => list.id !== id);
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
