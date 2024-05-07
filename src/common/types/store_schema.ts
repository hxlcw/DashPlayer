export const SettingKeyObj = {
    'shortcut.previousSentence': 'left,a',
    'shortcut.nextSentence': 'right,d',
    'shortcut.repeatSentence': 'down,s',
    'shortcut.playPause': 'space,up,w',
    'shortcut.repeatSingleSentence': 'r',
    'shortcut.toggleEnglishDisplay': 'e',
    'shortcut.toggleChineseDisplay': 'c',
    'shortcut.toggleWordLevelDisplay': 'l',
    'shortcut.toggleBilingualDisplay': 'b',
    'shortcut.nextTheme': 't',
    'shortcut.adjustBeginMinus': 'z',
    'shortcut.adjustBeginPlus': 'x',
    'shortcut.adjustEndMinus': 'n',
    'shortcut.adjustEndPlus': 'm',
    'shortcut.clearAdjust': 'v',
    'shortcut.nextPlaybackRate': 'p',
    'shortcut.aiChat': 'slash',
    'userSelect.playbackRateStack':'',
    'apiKeys.youdao.secretId': '',
    'apiKeys.youdao.secretKey': '',
    'apiKeys.tencent.secretId': '',
    'apiKeys.tencent.secretKey': '',
    'apiKeys.openAi.key': '',
    'apiKeys.openAi.endpoint': '',
    'appearance.theme': 'light',
    'appearance.fontSize': 'fontSizeLarge',
}
export type SettingKey = keyof typeof SettingKeyObj;
