import DashboardController from './DashboardController'
import ManageAnimeController from './ManageAnimeController'
const Backend = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ManageAnimeController: Object.assign(ManageAnimeController, ManageAnimeController),
}

export default Backend