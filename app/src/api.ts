import axios from "axios";
import { DBPeriod, Period, ShoppingItem } from "./Store";

const API_URL = process.env.REACT_APP_API_URL;
const COOKIE_NAME = process.env.REACT_APP_CSRF_TOKEN_NAME;

axios.defaults.xsrfCookieName = COOKIE_NAME;
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export async function getUser() {
  try {
    const res = await axios.get(API_URL + "get_user/");
    return res?.data?.username;
  } catch (err) {
    console.log(err);
  }
}

export function signUp(username: string, password: string) {
  return axios
    .post(API_URL + "signup/", {
      username: username,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export function signIn(username: string, password: string) {
  return axios
    .post(API_URL + "signin/", {
      username: username,
      password: password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export async function logout() {
  try {
    const res = await axios.post(API_URL + "logout_user/");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getChecklists() {
  try {
    const res = await axios.get(API_URL + "get_checklists/");
    if (res.data.length > 0) {
      const shoppingList = res.data[0];
      return shoppingList;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function addShoppingItem(item: ShoppingItem, checklistId: number) {
  try {
    const res = await axios.post(API_URL + "add_shopping_item/", {
      description: item.description,
      period:
        item.period === Period.weekly
          ? DBPeriod.weekly
          : item.period === Period.biWeekly
          ? DBPeriod.biWeekly
          : DBPeriod.monthly,
      category: item.category,
      need_to_buy: item.needToBuy,
      bought_in_shopping_list: item.boughtInShoppingList,
      last_bought: item.lastBought,
      checklist: checklistId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function changeItemNeedToBuy(
  itemId: number,
  needToBuy: boolean,
  checklistId: number
) {
  try {
    await axios.patch(API_URL + "change_need_to_buy/", {
      shopping_item_id: itemId,
      need_to_buy: needToBuy,
      checklist_id: checklistId,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function changeItemDescription(
  itemId: number,
  description: string,
  checklistId: number
) {
  try {
    await axios.patch(API_URL + "change_item_description/", {
      shopping_item_id: itemId,
      description: description,
      checklist_id: checklistId,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteItem(itemId: number, checklistId: number) {
  try {
    const res = await axios.patch(API_URL + "delete_item/", {
      shopping_item_id: itemId,
      checklist_id: checklistId,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

export async function changeBoughtInShoppingList(
  itemId: number,
  boughtInShoppingList: boolean,
  checklistId: number
) {
  try {
    const res = await axios.patch(API_URL + "change_bought_in_shopping_list/", {
      shopping_item_id: itemId,
      bought_in_shopping_list: boughtInShoppingList,
      checklist_id: checklistId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function clearShoppingList(checklistId: number) {
  try {
    await axios.patch(API_URL + "clear_shopping_list/", {
      checklist_id: checklistId,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function generateShareLink(checklistId: number) {
  try {
    const res = await axios.post(API_URL + "generate_checklist_access/", {
      checklist_id: checklistId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSharedChecklist(checklistToken: string) {
  try {
    const res = await axios.post(API_URL + "get_shared_checklist/", {
      checklist_token: checklistToken,
    });
    return res.data?.checklist;
  } catch (err) {
    console.log(err);
  }
}
