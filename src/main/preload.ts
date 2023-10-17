import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { YdRes } from '../renderer/lib/param/yd/a';
import { SentenceApiParam } from '../renderer/hooks/useSubtitle';
import { Release } from './controllers/CheckUpdate';
import { ProgressParam } from './controllers/ProgressController';
import { SettingState } from '../renderer/hooks/useSetting';

export type Channels =
    | 'ipc-example'
    | 'update-progress'
    | 'trans-word'
    | 'query-progress'
    | 'batch-translate'
    | 'load-trans-cache'
    | 'update-setting'
    | 'get-setting'
    | 'setting-update'
    | 'maximize'
    | 'unmaximize'
    | 'is-maximized'
    | 'is-full-screen'
    | 'show-button'
    | 'hide-button'
    | 'maximize-setting'
    | 'unmaximize-setting'
    | 'is-maximized-setting'
    | 'close-setting'
    | 'minimize-setting'
    | 'is-windows'
    | 'minimize'
    | 'close'
    | 'open-menu'
    | 'you-dao-translate'
    | 'get-audio'
    | 'open-data-dir'
    | 'query-cache-size'
    | 'clear-cache'
    | 'open-url'
    | 'check-update'
    | 'app-version'
    | 'player-size'
    | 'home-size'
    | 'recent-play'
    | 'open-file'
    | 'fullscreen'
    | 'copy-to-clipboard';

const invoke = (channel: Channels, ...args: unknown[]) => {
    return ipcRenderer.invoke(channel, ...args);
};

const on = (channel: Channels, func: (...args: unknown[]) => void) => {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
        ipcRenderer.removeListener(channel, subscription);
    };
};
const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]) {
            ipcRenderer.send(channel, args);
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (
                _event: IpcRendererEvent,
                ...args: unknown[]
            ) => func(...args);
            ipcRenderer.on(channel, subscription);

            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        invoke(channel: Channels, ...args: unknown[]) {
            try {
                const promise = ipcRenderer.invoke(channel, ...args);
                console.log('promise', promise);
                return promise;
            } catch (error) {
                console.error(error);
            }
            return null;
        },
    },
    updateSetting: async (setting: SettingState) => {
        await invoke('update-setting', setting);
    },
    getSetting: async () => {
        return (await invoke('get-setting')) as SettingState;
    },
    transWord: async (word: string) => {
        return (await invoke('you-dao-translate', word)) as YdRes;
    },
    fetchAudio: async (url: string) => {
        const data = (await invoke('get-audio', url)) as any;
        const blob = new Blob([data], { type: 'audio/mpeg' });
        return URL.createObjectURL(blob);
    },
    maximizeSetting: async () => {
        await invoke('maximize-setting');
    },
    unMaximizeSetting: async () => {
        await invoke('unmaximize-setting');
    },
    closeSetting: async () => {
        await invoke('close-setting');
    },
    minimizeSetting: async () => {
        await invoke('minimize-setting');
    },
    queryCacheSize: async () => {
        return (await invoke('query-cache-size')) as string;
    },
    openDataFolder: async () => {
        await invoke('open-data-dir');
    },
    clearCache: async () => {
        await invoke('clear-cache');
    },
    openMenu: async () => {
        await invoke('open-menu');
    },
    isMaximized: async () => {
        return (await invoke('is-maximized')) as boolean;
    },
    unMaximize: async () => {
        await invoke('unmaximize');
    },
    maximize: async () => {
        await invoke('maximize');
    },
    minimize: async () => {
        await invoke('minimize');
    },
    playerSize: async () => {
        await invoke('player-size');
    },
    homeSize: async () => {
        await invoke('home-size');
    },
    close: async () => {
        await invoke('close');
    },
    isFullScreen: async () => {
        return (await invoke('is-full-screen')) as boolean;
    },
    fullscreen: async () => {
        await invoke('fullscreen');
    },
    showButton: async () => {
        await invoke('show-button');
    },
    hideButton: async () => {
        await invoke('hide-button');
    },
    loadTransCache: async (sentences: SentenceApiParam[]) => {
        return (await invoke(
            'load-trans-cache',
            sentences
        )) as SentenceApiParam[];
    },
    batchTranslate: async (sentences: SentenceApiParam[]) => {
        return (await invoke(
            'batch-translate',
            sentences
        )) as SentenceApiParam[];
    },
    updateProgress: async (progress: ProgressParam) => {
        await invoke('update-progress', progress);
    },
    queryProgress: async (fileName: string) => {
        return (await invoke('query-progress', fileName)) as number;
    },
    checkUpdate: async () => {
        return (await invoke('check-update')) as Release | undefined;
    },
    appVersion: async () => {
        return (await invoke('app-version')) as string;
    },
    openUrl: async (url: string) => {
        await invoke('open-url', url);
    },
    openFile: async (path: string) => {
        const data = await invoke('open-file', path);
        if (data === null) return null;
        const blob = new Blob([data]);
        return URL.createObjectURL(blob);
    },
    copyToClipboard: async (text: string) => {
        await invoke('copy-to-clipboard', text);
    },
    recentPlay: async (size: number) => {
        return (await invoke('recent-play', size)) as ProgressParam[];
    },
    isWindows: async () => {
        return (await invoke('is-windows')) as boolean;
    },
    onMaximize: (func: () => void) => {
        return on('maximize', func);
    },
    onUnMaximize: (func: () => void) => {
        return on('unmaximize', func);
    },
    onFullScreen: (func: () => void) => {
        return on('fullscreen', func);
    },
    onSettingMaximize: (func: () => void) => {
        return on('maximize-setting', func);
    },
    onSettingUnMaximize: (func: () => void) => {
        return on('unmaximize-setting', func);
    },
    onUpdateSetting: (func: (setting: SettingState) => void) => {
        console.log('onUpdateSetting');
        return on('update-setting', func as any);
    },
};
contextBridge.exposeInMainWorld('electron', electronHandler);
export type ElectronHandler = typeof electronHandler;
