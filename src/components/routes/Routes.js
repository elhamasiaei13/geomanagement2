import React from "react";

// const Expense = React.lazy(() => import("../Expense"));
// const Expenses = React.lazy(() => import("../pages/Expenses"));
// const WrapperView = React.lazy(() => import("../WrapperView"));
const Countries = React.lazy(() => import("../pages/Countries"));
const CountriesForm = React.lazy(() => import("../pages/CountriesForm"));
const CitiesForm = React.lazy(() => import("../pages/CitiesForm"));
const Cities = React.lazy(() => import("../pages/Cities"));
const ProvinceForm = React.lazy(() => import("../pages/ProvinceForm"));
const Provinces = React.lazy(() => import("../pages/Provinces"));

const Routes = [
  {
    path: "/countries",
    exact: true,
    component: Countries
    // component: PrvnTable
  },

  {
    path: "/countries/:id/edit",
    exact: true,
    component: (props) => < CountriesForm edit={true} type={"countries"} />
  },

  {
    path: "/countries/new",
    exact: true,
    component: () => < CountriesForm type={"countries"} />
  },
  {
    path: "/provinces",
    exact: true,
    component: Provinces
  },

  {
    path: "/provinces/:id/edit",
    exact: true,
    component: (props) => < ProvinceForm edit={true} />
  },

  {
    path: "/provinces/new",
    exact: true,
    component: () => <ProvinceForm />
  },

  {
    path: "/cities",
    exact: true,
    component: () => <Cities />
  },
  {
    path: "/cities/new",
    exact: true,
    component: () => <CitiesForm />
  },

  {
    path: "/cities/:id/edit",
    exact: true,
    component: () => <CitiesForm edit={true} />
  },

  // {
  //   path: "/tolls/:id/view",
  //   exact: true,
  //   // component: (props) => <WrapperView expenseType={"tolls"} edit={true} {...props} />
  // },

  // {
  //   path: "/tolls/:id/edit",
  //   exact: true,
  //   // component: (props) => <TollEdit edit={true} {...props} />
  // },


];
export default Routes;
