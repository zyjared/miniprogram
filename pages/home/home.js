import { openUrl } from '../../utils/util';
import { fetchUser } from '../../services/user';

Page({
    data: {
        pageLoading: false,
        user: {
          name: '',
          avatar: '',
          description: '',
          socials: [],
        },
        userAvatarText: '',
    },

    onShow() {
    },

    onLoad() {
        this.init();
    },

    onPullDownRefresh() {
        this.init();
    },

    init() {
        this.loadUser();
    },

    onReTry() {
        this.loadUser();
    },

    loadUser() {
        fetchUser().then((user) => {
            this.setData({
                user,
                pageLoading: false,
            });
        })
    },

    bindUserAvatarError() {
        this.setData({
            userAvatarText: this.data.user.name.slice(0, 2)
        });
    },

    navigatorTo(e) {
        const { url } = e.currentTarget.dataset;
        openUrl(url);
    },
});
