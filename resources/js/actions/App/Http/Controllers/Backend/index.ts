import DashboardController from './DashboardController'
import ManageAnimeController from './ManageAnimeController'
import ManageUserController from './ManageUserController'
const Backend = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ManageAnimeController: Object.assign(ManageAnimeController, ManageAnimeController),
ManageUserController: Object.assign(ManageUserController, ManageUserController),
}

export default Backend