import {WatchProject, WatchProjectType} from "@/backend/db/tables/watchProjects";
import {BrowserItemVariant, CtxMenu} from "@/fronted/components/fileBowser/VideoItem2";
import useSWR from "swr";
import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/fronted/components/ui/context-menu";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/fronted/components/ui/tooltip";
import {cn} from "@/fronted/lib/utils";
import {strBlank} from "@/common/utils/Util";
import {FileAudio2, FileVideo2, Folder, X} from "lucide-react";
import Style from "@/fronted/styles/style";
import MediaUtil from "@/common/utils/MediaUtil";
import {Button} from "@/fronted/components/ui/button";
import {SWR_KEY, swrMutate} from "@/fronted/lib/swr-util";
import {WatchProjectVideo} from "@/backend/db/tables/watchProjectVideos";
const api = window.electron;
const ProjItem2 = ({p,v, onClick, ctxMenus, variant = 'normal'}: {
    p: WatchProject;
    v: WatchProjectVideo;
    variant?: BrowserItemVariant;
    onClick?: () => void,
    ctxMenus: CtxMenu[]
}) => {
    const [contextMenu, setContextMenu] = React.useState(false);
    return (
        <ContextMenu
            onOpenChange={(open) => {
                setContextMenu(open);
            }}
        >
            <ContextMenuTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    'w-full flex-shrink-0 flex justify-start items-center hover:bg-black/5 dark:hover:bg-white/5 rounded-lg gap-3 px-3 lg:px-6 py-2 group/item',
                                    variant === 'highlight' && 'bg-primary hover:bg-primary/90 dark:hover:bg-primary/90 text-primary-foreground',
                                    variant === 'lowlight' && 'text-muted-foreground',
                                    contextMenu && variant !== 'highlight' && 'bg-black/5 dark:bg-white/5'
                                )}
                                onClick={async () => {
                                    onClick?.();
                                }}
                            >
                                <>
                                    {(strBlank(v?.video_path) || p.project_type === WatchProjectType.DIRECTORY) &&
                                        <Folder className={cn(Style.file_browser_icon)}/>}
                                    {p.project_type === WatchProjectType.FILE && MediaUtil.isAudio(v?.video_path) &&
                                        <FileAudio2 className={cn(Style.file_browser_icon)}/>}
                                    {p.project_type === WatchProjectType.FILE && MediaUtil.isVideo(v?.video_path) &&
                                        <FileVideo2 className={cn(Style.file_browser_icon)}/>}
                                    <div className="truncate w-0 flex-1">{p.project_name}</div>
                                    <Button size={'icon'} variant={'ghost'}
                                            className={'w-6 h-6'}
                                            disabled={variant === 'highlight'}
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                await api.call('watch-project/delete', p.id);
                                                await swrMutate(SWR_KEY.WATCH_PROJECT_LIST);
                                            }}
                                    >
                                        <X className={'w-4 h-4 scale-0 group-hover/item:scale-100'}/>
                                    </Button>
                                </>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent
                            side={'bottom'}
                            align={'start'}
                        >
                            {p.project_name}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </ContextMenuTrigger>
            <ContextMenuContent>
                {ctxMenus.map((item, idx) => (
                    <ContextMenuItem
                        disabled={item.disabled ?? false}
                        key={idx}
                        onClick={item.onClick}
                    >{item.text}</ContextMenuItem>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default ProjItem2;
