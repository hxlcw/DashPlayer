import CustomMessage, {MsgType} from "@/common/types/msg/interfaces/CustomMessage";
import {MsgT} from "@/common/types/msg/interfaces/MsgT";
import AiSynonymousSentenceResp from "@/common/types/aiRes/AiSynonymousSentenceResp";
import {Topic} from "@/fronted/hooks/useChatPanel";
import AiPunctuationResp from "@/common/types/aiRes/AiPunctuationResp";
import { AiFuncPolishPrompt, AiFuncPolishRes } from '@/common/types/aiRes/AiFuncPolish';
import {
    AiFuncTranslateWithContextPrompt,
    AiFuncTranslateWithContextRes
} from '@/common/types/aiRes/AiFuncTranslateWithContextRes';


export interface WelcomeMessageProps {
    originalTopic: string;
    synonymousSentenceTask: number;
    punctuationTask: number | null;
    translateTask: number;
    topic: Topic;
}

const MSG = `
好的, 我会为您分析这个句子: {originalTopic}

翻译: {translate}
`

class AiWelcomeMessage implements CustomMessage<AiWelcomeMessage> {
    public originalTopic: string;
    public polishTask: number;
    public punctuationTask: number | null = null;
    public translateTask: number;
    public topic: Topic;
    public aiFuncPolishTaskRes: AiFuncPolishRes | null = null;
    public punctuationTaskResp: AiPunctuationResp | null = null;
    public translateTaskResp: AiFuncTranslateWithContextRes | null = null;

    constructor(props: WelcomeMessageProps) {
        this.originalTopic = props.originalTopic;
        this.polishTask = props.synonymousSentenceTask;
        this.punctuationTask = props.punctuationTask;
        this.translateTask = props.translateTask;
        this.topic = props.topic;
    }

    public toMsg(): MsgT[] {
        return [];
    }


    public copy(): AiWelcomeMessage {
        const c = new AiWelcomeMessage({
            originalTopic: this.originalTopic,
            synonymousSentenceTask: this.polishTask,
            punctuationTask: this.punctuationTask,
            topic: this.topic,
            translateTask: this.translateTask,
        });
        c.aiFuncPolishTaskRes = this.aiFuncPolishTaskRes;
        c.punctuationTaskResp = this.punctuationTaskResp;
        c.translateTaskResp = this.translateTaskResp;
        return c;
    }

    msgType: MsgType = "ai-welcome";

    getTopic(): Topic {
        return this.topic;
    }
}

export default AiWelcomeMessage;
