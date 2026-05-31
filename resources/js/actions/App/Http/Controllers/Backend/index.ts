import DashboardController from './DashboardController'
import ManageAnimeController from './ManageAnimeController'
import ManageUserController from './ManageUserController'
import ManageCommentController from './ManageCommentController'
const Backend = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ManageAnimeController: Object.assign(ManageAnimeController, ManageAnimeController),
ManageUserController: Object.assign(ManageUserController, ManageUserController),
ManageCommentController: Object.assign(ManageCommentController, ManageCommentController),
}

export default Backend