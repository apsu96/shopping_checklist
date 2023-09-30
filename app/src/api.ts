import axios from "axios";
import store, { DBPeriod, Period, ShoppingItem } from "./Store";

const API_URL = process.env.REACT_APP_API_URL;
const COOKIE_NAME = process.env.REACT_APP_CSRF_TOKEN_NAME;

axios.defaults.xsrfCookieName = COOKIE_NAME;
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export async function getUser() {
  try {
    const res = await axios.get(API_URL + "get_user/");
    if (res.data.username) {
      store.setUser(res.data.username);
    }
    // const cookies = document.cookie.split(";");
    // let result = "";
    // cookies.map((c) => {
    //   const cookie = c.trim();
    //   if (cookie.substring(0, COOKIE_NAME?.length) === COOKIE_NAME) {
    //     const res = cookie.substring(COOKIE_NAME.length + 1);
    //     if (res[-1] === ";") {
    //       result = decodeURIComponent(res.substring(0, res.length - 1));
    //     } else {
    //       result = decodeURIComponent(res);
    //     }
    //     return null;
    //   } else {
    //     return null;
    //   }
    // });
    // axios.defaults.headers.common["X-CSRFToken"] = result;
    // token = result;
  } catch (err) {
    console.log(err);
  }
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

export async function getChecklists() {
  try {
    const res = await axios.get(API_URL + "get_checklists/");
    if (res.data.length > 0) {
      const shoppingList = res.data[0];
      store.setChecklist(
        shoppingList.id,
        shoppingList.name,
        shoppingList.shopping_items
      );
    }
    return res.data;
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

export async function changeItemLastBought(
  itemId: number,
  lastBought: string,
  checklistId: number
) {
  try {
    await axios.patch(API_URL + "change_last_bought/", {
      shopping_item_id: itemId,
      last_bought: lastBought,
      checklist_id: checklistId,
    });
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
    await axios.patch(API_URL + "change_bought_in_shopping_list/", {
      shopping_item_id: itemId,
      bought_in_shopping_list: boughtInShoppingList,
      checklist_id: checklistId,
    });
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
