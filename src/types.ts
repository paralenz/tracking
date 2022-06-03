export type User = JsonMap & {
  firstName?: string | null
  lastName?: string | null
  email?: string | null
}

export type JsonValue = boolean | number | string | null | JsonList | JsonMap;

export type JsonMap = {
    [key: string]: JsonValue;
    [index: number]: JsonValue;
}
export type JsonList = Array<JsonValue>

export type UserProperties = {
  $set?: JsonMap
  // eslint-disable-next-line @typescript-eslint/naming-convention
  $set_once?: JsonMap
}

export type CaptureProperties<TEvents> = TEvents[keyof TEvents] & JsonMap

export type Logger = {
  log: (...params: any[]) => void
}

export interface ITracking<TEvents> {
  identify(
    userId: string,
    properties?: User
  ): this

  capture<T extends keyof TEvents>(
    event: T,
    properties?: CaptureProperties<TEvents>,
    userProperties?: UserProperties
  ): this

  screen(
    screenName: string,
    properties?: JsonMap
  ): this
}
