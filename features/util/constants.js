import {Constants} from 'expo';
import {StyleSheet} from 'react-native';

const ENV = {
  development: {
    baseUrl: '',
    segmentIosKey: 'WZoERMhnFpmagbzf533b9dZi5riZzlPu',
    segmentAndroidKey: 'r2WYwBHkLg6Nba61X1K7g0ckjBvg4T3Q',
  },
  default: {
    baseUrl: '',
    segmentIosKey: 'WZoERMhnFpmagbzf533b9dZi5riZzlPu',
    segmentAndroidKey: 'r2WYwBHkLg6Nba61X1K7g0ckjBvg4T3Q',
  },
};

const key = Constants.manifest.releaseChannel || 'development';

export const BASE_URL = ENV[key].baseUrl;
export const SEGMENT_IOS_KEY = ENV[key].segmentIosKey;
export const SEGMENT_ANDROID_KEY = ENV[key].segmentAndroidKey;

export const FB_APP_ID = '112777899150447';
export const FB_PERMISSIONS = ['public_profile', 'user_friends', 'email'];
export const STYLES = StyleSheet.create({
  textMuted: {
    color: '#8F8E94',
  },
  textColorGreen: {
    color: '#5B961B',
  },
  textColorBlue: {
    color: '#007AFF',
  },
  flexAlignMiddle: {
    alignItems: 'center',
  }
});
export const COLORS = {
  'grey': '#bfbfbf',
  'green': '#556535',
}
export const ASSETS = {
  'baseball': require('../../assets/icon/baseball.png'),
  'basketball': require('../../assets/icon/basketball.png'),
  'pennant': require('../../assets/icon/pennant.png'),
};
export function getIcon(key) {
  return ASSETS[key] || ASSETS['pennant'];
};
