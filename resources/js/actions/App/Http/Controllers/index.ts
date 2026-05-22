import HomeController from './HomeController'
import BrowseController from './BrowseController'
import AnimeController from './AnimeController'
import ImageProxyController from './ImageProxyController'
import AuthController from './AuthController'
import Backend from './Backend'
import UserDashboardController from './UserDashboardController'
import VoteController from './VoteController'
import WatchlistController from './WatchlistController'
import CommentController from './CommentController'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
BrowseController: Object.assign(BrowseController, BrowseController),
AnimeController: Object.assign(AnimeController, AnimeController),
ImageProxyController: Object.assign(ImageProxyController, ImageProxyController),
AuthController: Object.assign(AuthController, AuthController),
Backend: Object.assign(Backend, Backend),
UserDashboardController: Object.assign(UserDashboardController, UserDashboardController),
VoteController: Object.assign(VoteController, VoteController),
WatchlistController: Object.assign(WatchlistController, WatchlistController),
CommentController: Object.assign(CommentController, CommentController),
}

export default Controllers