import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRoute from "./auth.route";
import ProfileRoute from "./profile.route";
import WeedProfileRouter from "./weedprofile.route";
import FavouriteRouter from "./favourite.route";
import NotificationRoute from "./notification.route";
import TransactionRouter from "./transaction.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/weedprofile",
        router: WeedProfileRouter,
    },
    {
        path: "/favourite",
        router: FavouriteRouter,
    },
    {
        path: "/notification",
        router: NotificationRoute,
    },
    {
        path: "/transaction",
        router: TransactionRouter,
    },
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
