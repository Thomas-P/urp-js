export type ALL_ACTIONS = RECORD_ACTIONS | PRESENCE_ACTIONS | RPC_ACTIONS |
  EVENT_ACTIONS | AUTH_ACTIONS | CONNECTION_ACTIONS | PARSER_ACTIONS

export enum META_KEYS {
  payloadEncoding = 'e',
  name = 'n',
  subscription = 's',
  correlationId = 'c',
  version = 'v',
  path = 'p',
  reason = 'r',
  url = 'u',
  originalAction = 'a',
}

export interface Message {
  topic: TOPIC
  action: ALL_ACTIONS
  name?: string

  isError?: boolean
  isAck?: boolean

  data?: string | Buffer
  parsedData?: any

  parseError?: false

  raw?: string | Buffer

  originalAction?: ALL_ACTIONS
  subscription?: string
  names?: Array<string>
  isWriteAck?: boolean
  correlationId?: string
  path?: string
  version?: number
  reason?: string
  url?: string
}

export interface SubscriptionMessage extends Message {
  name: string
}

export interface BulkSubscriptionMessage extends Message {
  names: Array<string>
}

export interface EventMessage extends SubscriptionMessage {
  action: EVENT_ACTIONS
}

export interface RPCMessage extends SubscriptionMessage {
  action: RPC_ACTIONS
  correlationId: string
}

export interface PresenceMessage extends Message {
  action: PRESENCE_ACTIONS
  correlationId: string
}

export interface ListenMessage extends SubscriptionMessage {
  action: RECORD_ACTIONS | EVENT_ACTIONS
  subscription: string

  raw?: string
}

// tslint:disable-next-line:no-empty-interface
export interface RecordMessage extends SubscriptionMessage {
  action: RECORD_ACTIONS
}

export interface RecordWriteMessage extends RecordMessage {
  version: number
  isWriteAck: boolean
  path?: string
}

export interface RecordAckMessage extends RecordMessage {
  path?: string
  data: any
}

export interface ParseError {
  parseError: true

  raw?: string | Buffer

  parsedMessage?: Message
  description?: string
  action: PARSER_ACTIONS
}

export type ParseResult = Message | ParseError

export enum TOPIC {
    ERROR = 0x00,
    PARSER = 0x01,
    CONNECTION = 0x02,
    AUTH = 0x03,
    EVENT = 0x04,
    RECORD = 0x05,
    RPC = 0x06,
    PRESENCE = 0x07,

    SUBSCRIPTIONS = 0x10,
    ONLINE_USERS = 0x11,

    EVENT_SUBSCRIPTIONS = 0x20,
    RECORD_SUBSCRIPTIONS = 0x21,
    RPC_SUBSCRIPTIONS = 0x22,
    PRESENCE_SUBSCRIPTIONS = 0x23,
    RECORD_LISTEN_PATTERNS = 0x24,
    EVENT_LISTEN_PATTERNS = 0x25,
    RECORD_PUBLISHED_SUBSCRIPTIONS = 0x26,
    EVENT_PUBLISHED_SUBSCRIPTIONS = 0x27,
    RECORD_LISTENING = 0x28,
    EVENT_LISTENING = 0x29,
}

export enum PARSER_ACTIONS {
    UNKNOWN_TOPIC = 0x20,
    UNKNOWN_ACTION = 0x21,
    INVALID_MESSAGE = 0x22,
    MESSAGE_PARSE_ERROR = 0x23,
    MAXIMUM_MESSAGE_SIZE_EXCEEDED = 0x24,
    ERROR = 0x25,
}

export enum CONNECTION_ACTIONS {
    ERROR = 0x00,
    PING = 0x01,
    PONG = 0x02,
    ACCEPT = 0x03,
    CHALLENGE = 0x04,
    CHALLENGE_RESPONSE = 0x05,
    REJECT = 0x06,
    REDIRECT = 0x07,
    CLOSING = 0x08,
    CLOSED = 0x09,

    AUTHENTICATION_TIMEOUT = 0x20,
}

export enum AUTH_ACTIONS {
    ERROR = 0x00,
    REQUEST = 0x01,
    AUTH_SUCCESSFUL = 0x02,
    AUTH_UNSUCCESSFUL = 0x03,

    TOO_MANY_AUTH_ATTEMPTS = 0x20,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
}

export enum EVENT_ACTIONS {
    ERROR = 0x00,
    EMIT = 0x01,
    SUBSCRIBE = 0x02,
    SUBSCRIBE_ACK = 0x82,
    UNSUBSCRIBE = 0x03,
    UNSUBSCRIBE_ACK = 0x83,
    LISTEN = 0x04,
    LISTEN_ACK = 0x84,
    UNLISTEN = 0x05,
    UNLISTEN_ACK = 0x85,
    LISTEN_ACCEPT = 0x06,
    LISTEN_REJECT = 0x07,
    SUBSCRIPTION_FOR_PATTERN_FOUND = 0x08,
    SUBSCRIPTION_FOR_PATTERN_REMOVED = 0x09,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,
}

export enum RECORD_ACTIONS {
    ERROR = 0x00,
    READ = 0x01,
    READ_RESPONSE = 0x02,
    HEAD = 0x03,
    HEAD_RESPONSE = 0x04,
    DELETE = 0x05,
    DELETE_ACK = 0x85,
    DELETED = 0x06,
    WRITE_ACKNOWLEDGEMENT = 0x07,

    CREATE = 0x10,
    CREATEANDUPDATE = 0x11,
    CREATEANDUPDATE_WITH_WRITE_ACK = 0x12,
    CREATEANDPATCH = 0x13,
    CREATEANDPATCH_WITH_WRITE_ACK = 0x14,
    UPDATE = 0x15,
    UPDATE_WITH_WRITE_ACK = 0x16,
    PATCH = 0x17,
    PATCH_WITH_WRITE_ACK = 0x18,
    ERASE = 0x19,
    ERASE_WITH_WRITE_ACK = 0x1A,

    SUBSCRIBEANDHEAD = 0x20,
    // SUBSCRIBEANDHEAD_RESPONSE = 0x21,
    SUBSCRIBEANDREAD = 0x22,
    // SUBSCRIBEANDREAD_RESPONSE = 0x23,
    SUBSCRIBECREATEANDREAD = 0x24,
    // SUBSCRIBECREATEANDREAD_RESPONSE = 0x25,
    SUBSCRIBECREATEANDUPDATE = 0x26,
    // SUBSCRIBECREATEANDUPDATE_RESPONSE = 0x27,
    SUBSCRIBE = 0x28,
    SUBSCRIBE_ACK = 0xA8,
    UNSUBSCRIBE = 0x29,
    UNSUBSCRIBE_ACK = 0xA9,

    LISTEN = 0x30,
    LISTEN_ACK = 0xB0,
    UNLISTEN = 0x31,
    UNLISTEN_ACK = 0xB1,
    LISTEN_ACCEPT = 0x32,
    LISTEN_REJECT = 0x33,
    SUBSCRIPTION_HAS_PROVIDER = 0x34,
    SUBSCRIPTION_HAS_NO_PROVIDER = 0x35,
    SUBSCRIPTION_FOR_PATTERN_FOUND = 0x36,
    SUBSCRIPTION_FOR_PATTERN_REMOVED = 0x37,

    CACHE_RETRIEVAL_TIMEOUT = 0x40,
    STORAGE_RETRIEVAL_TIMEOUT = 0x41,
    VERSION_EXISTS = 0x42,
    RECORD_LOAD_ERROR = 0x43,
    RECORD_CREATE_ERROR = 0x44,
    RECORD_UPDATE_ERROR = 0x45,
    RECORD_DELETE_ERROR = 0x46,
    RECORD_READ_ERROR = 0x47,
    RECORD_NOT_FOUND = 0x48,
    INVALID_VERSION = 0x49,
    INVALID_PATCH_ON_HOTPATH = 0x4A,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,

    // Deprecated
    HAS = 0x70,
    HAS_RESPONSE = 0x71,
}

export enum RPC_ACTIONS {
    ERROR = 0x00,
    REQUEST = 0x01,
    ACCEPT = 0x02,
    RESPONSE = 0x03,
    REJECT = 0x04,
    REQUEST_ERROR = 0x05,
    PROVIDE = 0x06,
    PROVIDE_ACK = 0x86,
    UNPROVIDE = 0x07,
    UNPROVIDE_ACK = 0x87,

    NO_RPC_PROVIDER = 0x20,
    ACCEPT_TIMEOUT = 0x22,
    MULTIPLE_ACCEPT = 0x23,
    INVALID_RPC_CORRELATION_ID = 0x24,
    RESPONSE_TIMEOUT = 0x25,
    MULTIPLE_RESPONSE = 0x26,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_PROVIDERS = 0x63,
    NOT_PROVIDED = 0x64,
}

export enum PRESENCE_ACTIONS {
    ERROR = 0x00,
    QUERY_ALL = 0x01,
    QUERY_ALL_RESPONSE = 0x02,
    QUERY = 0x03,
    QUERY_RESPONSE = 0x04,
    PRESENCE_JOIN = 0x05,
    PRESENCE_LEAVE = 0x06,
    SUBSCRIBE = 0x07,
    SUBSCRIBE_ACK = 0x87,
    UNSUBSCRIBE = 0x08,
    UNSUBSCRIBE_ACK = 0x88,
    SUBSCRIBE_ALL = 0x09,
    SUBSCRIBE_ALL_ACK = 0x89,
    UNSUBSCRIBE_ALL = 0x0A,
    UNSUBSCRIBE_ALL_ACK = 0x8A,

    INVALID_PRESENCE_USERS = 0x20,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,
}

export const ACTIONS = {
    [TOPIC.PARSER]: PARSER_ACTIONS,
    [TOPIC.CONNECTION]: CONNECTION_ACTIONS,
    [TOPIC.AUTH]: AUTH_ACTIONS,
    [TOPIC.EVENT]: EVENT_ACTIONS,
    [TOPIC.RECORD]: RECORD_ACTIONS,
    [TOPIC.RPC]: RPC_ACTIONS,
    [TOPIC.PRESENCE]: PRESENCE_ACTIONS
}

export enum EVENT {
    INFO = 'INFO',
    DEPRECATED = 'DEPRECATED',

    INCOMING_CONNECTION = 'INCOMING_CONNECTION',
    CLOSED_SOCKET_INTERACTION = 'CLOSED_SOCKET_INTERACTION',
    CLIENT_DISCONNECTED = 'CLIENT_DISCONNECTED',
    CONNECTION_ERROR = 'CONNECTION_ERROR',
    AUTH_ERROR = 'AUTH_ERROR',

    PLUGIN_ERROR = 'PLUGIN_ERROR',
    PLUGIN_INITIALIZATION_ERROR = 'PLUGIN_INITIALIZATION_ERROR',
    PLUGIN_INITIALIZATION_TIMEOUT = 'PLUGIN_INITIALIZATION_TIMEOUT',

    TIMEOUT = 'TIMEOUT',

    LEADING_LISTEN = 'LEADING_LISTEN',
    LOCAL_LISTEN = 'LOCAL_LISTEN',

    INVALID_CONFIG_DATA = 'INVALID_CONFIG_DATA',
    INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION'
}
