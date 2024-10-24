import { config } from '../config/index';
import { getUser } from '../model/user';

/** 获取首页数据 */
async function mockFetchUser() {
    const { delay } = require('./_utils/delay');
    await delay();
    return getUser();
}

/** 获取首页数据 */
export function fetchUser() {
    if (config.useMock) {
        return mockFetchUser();
    }
    return new Promise((resolve) => {
        resolve('real api');
    });
}
