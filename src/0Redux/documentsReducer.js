const initialState = {
  documentsList: [
    {
      id: 1,
      organization: "Профсоюз работников парков",
      documenType: "Заявлени о вступлении",
      sendingData: "04 Сентября 2024",
      answerData: "04 Сентября 2024",
      status: "green",
    },
    {
      id: 2,
      organization: "Профсоюз работников здравоохранения",
      documenType: "Заявлени о выходе",
      sendingData: "28 Сентября 2024",
      answerData: "04 Сентября 2024",
      status: "yellow",
    },
    {
      id: 3,
      organization: "Профсоюз работников парков",
      documenType: "Заявлени о выходе",
      sendingData: "23 Сентября 2024",
      answerData: "04 Сентября 2024",
      status: "red",
    },
    {
      id: 4,
      organization: "Профсоюз работников парков",
      documenType: "Заявлени о выходе",
      sendingData: "23 Сентября 2024",
      answerData: "04 Сентября 2024",
      status: "green",
    },
    {
      id: 5,
      organization: "Профсоюз работников здравоохранения",
      documenType: "Заявлени о вступлении",
      sendingData: "29 Октября 2024",
      answerData: "04 Сентября 2024",
      status: "yellow",
    },
    {
      id: 6,
      organization: "00006",
      documenType: "Тип 2",
      sendingData: "15 Октября 2024",
      answerData: "04 Сентября 2024",
      status: "green",
    },
    {
      id: 7,
      organization: "00007",
      documenType: "Тип 2",
      sendingData: "21 Октября 2024",
      answerData: "04 Сентября 2024",
      status: "yellow",
    },
    {
      id: 8,
      organization: "00008",
      documenType: "Тип 2",
      sendingData: "30 Октября 2024",
      answerData: "04 Сентября 2024",
      status: "red",
    },
    {
      id: 9,
      organization: "00009",
      documenType: "Тип 2",
      sendingData: "09 Января 2019",
      answerData: "04 Сентября 2024",
      status: "yellow",
    },
  ],
};

const documentsReducer = (state = initialState, action) => {
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
 */

export default documentsReducer;
