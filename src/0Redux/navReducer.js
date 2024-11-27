export const setWithRegNavAC = () => {
  return {
    type: "setWithRegNavAC",
  };
};

export const setPartnerNavAC = () => {
  return {
    type: "setPartnerNavAC",
  };
};

const initialState = {};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setWithRegNavAC":
      return {
        beforeDocumentsNavlinkData: [
          {
            linkName: "Главная",
            iconName: "mainIcon",
            link: "/",
            isLinkChangeWithFillUserForm: false,
          },
          {
            linkName: "Документы",
            iconName: "documentsIcon",
            link: "/incoming",
            isLinkChangeWithFillUserForm: false,
          },
        ],
        bottomNavlinkData: [
          {
            linkName: "Скидки, льготы",
            iconName: "discountsIcon",
            link: "/discounts",
            isLinkChangeWithFillUserForm: false,
          },
        ],
      };

    case "setPartnerNavAC":
      return {
        beforeDocumentsNavlinkData: [
          {
            linkName: "Главная",
            iconName: "mainIcon",
            link: "/",
            isLinkChangeWithFillUserForm: false,
          },
          {
            linkName: "Уведомления",
            iconName: "notificationsIcon",
            link: "/notifications",
            isLinkChangeWithFillUserForm: true,
          },
          {
            linkName: "Задачи",
            iconName: "tasksIcon",
            link: "/tasks",
            isLinkChangeWithFillUserForm: true,
          },
          {
            linkName: "Документы",
            iconName: "documentsIcon",
            link: "/incoming",
            isLinkChangeWithFillUserForm: false,
          },
        ],

        afterDocumentsNavlinkData: [
          {
            linkName: "Мои организации",
            iconName: "my_organizationsIcon",
            link: "/my_organizations",
            isLinkChangeWithFillUserForm: true,
          },
          {
            linkName: "Коллеги",
            iconName: "colleaguesIcon",
            link: "/colleagues",
            isLinkChangeWithFillUserForm: true,
          },
        ],
        bottomNavlinkData: [
          {
            linkName: "Деньги",
            iconName: "moneyIcon",
            link: "/money",
            isLinkChangeWithFillUserForm: true,
          },
          {
            linkName: "Скидки, льготы",
            iconName: "discountsIcon",
            link: "/discounts",
            isLinkChangeWithFillUserForm: false,
          },
          {
            linkName: "Магазин",
            iconName: "storeIcon",
            link: "/store",
            isLinkChangeWithFillUserForm: true,
          },
          {
            linkName: "Информация",
            iconName: "information",
            link: "/information",
            isLinkChangeWithFillUserForm: true,
          },
        ],
        linksInsideDocuments: [
          {
            linkName: "Входящие",
            link: "/incoming",
          },
          {
            linkName: "Исходящие",
            link: "/outgoing",
          },
          {
            linkName: "Черновики",
            link: "/drafts",
          },
        ],
      };

    default:
      return state;
  }
};

export default navReducer;
