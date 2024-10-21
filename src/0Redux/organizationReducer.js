import { fetch, setToken } from "4API/AxiosApi";

const DocumentsAC = 0;
const DocumentsTC = 0;

/* export const userIsLoggedUserAC = () => {
  return {
    type: "userIsLogged",
  };
};
 */

const initialState = {
  organizationBlock: [
    {
      id: 1,
      organization: "Организация 1",
      chairman: "Иванов Иван Васильевич",
      viceChairman: "Васильев Потап Васильевич",
      soviet: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      KRK: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      iconType: "TriangleOrgIcon",
      UnicalId: "0330384838",
      INN: "989888383",
      KPP: "989801001 ",
      OGRN: "898090993",
      adress: "Москва, Литейный проспект, д. 6",
      bank: "ПАО Сбербанк",
      BIK: "898090993",
      rs: "40800002300001201",
      manager: [
        {
          id: 1,
          name: "Иванов Иван Васильевич",
          post: "Председатель",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
        },
        {
          id: 2,
          name: "Васильев Потап Васильевич",
          post: "Зам.Председателя",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
        },
        {
          id: 3,
          name: "Иванов Иван Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
        },
        {
          id: 4,
          name: "Иванов Сергей Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
        },
        {
          id: 5,
          name: "Иванов Степан Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
        },
        {
          id: 6,
          name: "Иванов Семен Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Сентября 2024",
          basedDocument: "Приказ № 1",
          status: "red",
        },
      ],
    },
    {
      id: 2,
      organization: "Вышестоящая организация",
      chairman: "Иванов Иван Васильевич",
      viceChairman: "Васильев Потап Васильевич",
      soviet: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      KRK: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      iconType: "CircleOrgIcon",
    },
    {
      id: 3,
      organization: "Организация 2",
      chairman: "Иванов Иван Васильевич",
      viceChairman: "Васильев Потап Васильевич",
      soviet: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      KRK: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      iconType: "StarOrgIcon",
    },
    {
      id: 4,
      organization: "Вышестоящая организация 2",
      chairman: "Иванов Иван Васильевич",
      viceChairman: "Васильев Потап Васильевич",
      soviet: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      KRK: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      iconType: "TargetOrgIcon",
    },
  ],
};

const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    /*     case "userIsLogged":
      return {
        ...state,
        isUserLogged: true,
      }; */

    default:
      return state;
  }
};

/* export const setProfileUserTC = () => {
  return async (dispatch) => {
    let response = await (
      await fetch()
    )({
      url: "/api/profile",
      method: "POST",
    });
    if (response.status == 200) {
      // успешный запрос
      dispatch(setUserDataUserAC(response.data.username, response.data.email));
    }
  };
};

export const authThunkUserTC = (email, password) => {
  return async (dispatch) => {
    let response = await (
      await fetch()
    )({
      url: "/api/login_check",
      method: "POST",
      data: { email: email, password: password },
    });
    if (response.status == 200) {
      // успешный запрос
      setToken(response.data.token);
      dispatch(userIsLoggedUserAC());
      dispatch(setProfileUserTC());
    }
  };
};
 */

export default organizationReducer;
