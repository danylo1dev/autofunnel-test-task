import { ChatCompletionMessage } from 'openai/resources';

export namespace TextGenerator {
  export type Response = ChatCompletionMessage;
  export type Body = { promt: string };
}
