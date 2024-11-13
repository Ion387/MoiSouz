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
          contacts: "+7 818 88 18 28, email@mail.ru",
          photo:
            "https://dreamrider.ru/wp-content/uploads/2023/01/8v1z7d_t20_yx6vkm-scaled.jpg",
        },
        {
          id: 2,
          name: "Васильев Потап Васильевич",
          post: "Зам.Председателя",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "email@mail.ru, +7 818 88 18 28 ",
          photo:
            "https://www.crownnglory.co.uk/wp-content/uploads/2014/10/image-4.jpg",
        },
        {
          id: 3,
          name: "Смеянов Иван Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "email@mail.ru",
          photo:
            "https://i.pinimg.com/originals/84/0f/60/840f60a75d26e21c4888ebce536c1180.jpg",
        },
        {
          id: 4,
          name: "Дэдр Сергей Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "email@mail.ru",
          photo: "https://cdn1.flamp.ru/df271521a12773528a59498632d7ba6a.jpg",
        },
        {
          id: 5,
          name: "Соколов Степан Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "+7 818 88 18 28 ",
          photo:
            "https://i.pinimg.com/736x/eb/e0/a3/ebe0a3ac4867ff94a6abcf2da9f3062c.jpg",
        },
        {
          id: 6,
          name: "Тережин Семен Васильевич",
          post: "Профком",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Сентября 2024",
          basedDocument: "Приказ № 1",
          status: "red",
          contacts: "+7 818 88 18 28 ",
          photo:
            "https://samara-history.ru/800/600/https/medwestsnab.com.ua/wp-content/uploads/2020/05/21979365_lel.jpg",
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
      manager: [
        {
          id: 1,
          name: "Иванов Иван Васильевич",
          post: "Председатель",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "+7 818 88 18 28, email@mail.ru",
        },
        {
          id: 2,
          name: "Васильев Потап Васильевич",
          post: "Зам.Председателя",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "email@mail.ru, +7 818 88 18 28 ",
        },
      ],
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
      dispatch(setDataUserAC(response.data.username, response.data.email));
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
