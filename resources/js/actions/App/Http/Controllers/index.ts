import HomeController from './HomeController'
import BrowseController from './BrowseController'
import AnimeController from './AnimeController'
import ImageProxyController from './ImageProxyController'
import CommentController from './CommentController'
import TriggerCommentController from './TriggerCommentController'
import CommunityController from './CommunityController'
import LegalController from './LegalController'
import AuthController from './AuthController'
import Backend from './Backend'
import UserDashboardController from './UserDashboardController'
import VoteController from './VoteController'
import WatchlistController from './WatchlistController'
import UserProfileController from './UserProfileController'
import CommentHistoryController from './CommentHistoryController'
import WatchlistImportController from './WatchlistImportController'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
BrowseController: Object.assign(BrowseController, BrowseController),
AnimeController: Object.assign(AnimeController, AnimeController),
ImageProxyController: Object.assign(ImageProxyController, ImageProxyController),
CommentController: Object.assign(CommentController, CommentController),
TriggerCommentController: Object.assign(TriggerCommentController, TriggerCommentController),
CommunityController: Object.assign(CommunityController, CommunityController),
LegalController: Object.assign(LegalController, LegalController),
AuthController: Object.assign(AuthController, AuthController),
Backend: Object.assign(Backend, Backend),
UserDashboardController: Object.assign(UserDashboardController, UserDashboardController),
VoteController: Object.assign(VoteController, VoteController),
WatchlistController: Object.assign(WatchlistController, WatchlistController),
UserProfileController: Object.assign(UserProfileController, UserProfileController),
CommentHistoryController: Object.assign(CommentHistoryController, CommentHistoryController),
WatchlistImportController: Object.assign(WatchlistImportController, WatchlistImportController),
}

export default Controllers