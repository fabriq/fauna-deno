import { fetch as fetch_2 } from 'cross-fetch';

/** @public */
export declare class Client {
    constructor(opts?: ClientConfig)
    query<T = object>(expr: ExprArg, options?: QueryOptions): Promise<T>
    paginate(expr: Expr, params?: object, options?: QueryOptions): PageHelper
    ping(scope?: string, timeout?: number): Promise<string>
    close(opts?: { force?: boolean }): Promise<void>
}

/** @public */
export declare interface ClientConfig {
    secret: string
    domain?: string
    scheme?: 'http' | 'https'
    port?: number
    queryTimeout?: number
    observer?: <T extends object = object>(
    res: RequestResult<T | errors.FaunaHTTPError>,
    client: Client
    ) => void
    keepAlive?: boolean
    headers?: { [key: string]: string | number }
    fetch?: typeof fetch_2
    http2SessionIdleTime?: number
    checkNewVersion?: boolean
}

/** @public */
export declare module errors {
    export class FaunaError extends Error {
        constructor(message: string)

        name: string
        message: string
        description: string
    }

    export class InvalidValue extends FaunaError {}
    export class ClientClosed extends FaunaError {}
    export class FaunaHTTPError extends FaunaError {
        static raiseForStatusCode(
        requestResult: RequestResult<FaunaHttpErrorResponseContent>
        ): void

        constructor(
        name: string,
        requestResult: RequestResult<FaunaHttpErrorResponseContent>
        )

        requestResult: RequestResult<FaunaHttpErrorResponseContent>
        code: string
        position: string[]
        httpStatusCode: number
        errors(): object
    }

    export class BadRequest extends FaunaHTTPError {}
    export class FunctionCallError extends FaunaHTTPError {}
    export class Unauthorized extends FaunaHTTPError {}
    export class PermissionDenied extends FaunaHTTPError {}
    export class NotFound extends FaunaHTTPError {}
    export class MethodNotAllowed extends FaunaHTTPError {}
    export class InternalError extends FaunaHTTPError {}
    export class UnavailableError extends FaunaHTTPError {}
    export class InvalidArity extends FaunaHTTPError {}
    export class PayloadTooLarge extends FaunaHTTPError {}
    export class ValidationError extends FaunaHTTPError {}
    export class StreamError extends FaunaHTTPError {}
    export class StreamsNotSupported extends FaunaHTTPError {}
    export class StreamErrorEvent extends FaunaHTTPError {}
    export class InvalidArgumentError extends FaunaHTTPError {}
    export class InvalidExpressionError extends FaunaHTTPError {}
    export class InvalidUrlParameterError extends FaunaHTTPError {}
    export class SchemaNotFoundError extends FaunaHTTPError {}
    export class TransactionAbortedError extends FaunaHTTPError {}
    export class InvalidWriteTimeError extends FaunaHTTPError {}
    export class InvalidReferenceError extends FaunaHTTPError {}
    export class MissingIdentityError extends FaunaHTTPError {}
    export class InvalidScopeError extends FaunaHTTPError {}
    export class InvalidTokenError extends FaunaHTTPError {}
    export class StackOverflowError extends FaunaHTTPError {}
    export class ValueNotFoundError extends FaunaHTTPError {}
    export class InstanceNotFound extends FaunaHTTPError {}
    export class InstanceAlreadyExistsError extends FaunaHTTPError {}
    export class InstanceNotUniqueError extends FaunaHTTPError {}
    export class InvalidObjectInContainerError extends FaunaHTTPError {}
    export class MoveDatabaseError extends FaunaHTTPError {}
    export class RecoveryFailedError extends FaunaHTTPError {}
    export class FeatureNotAvailableError extends FaunaHTTPError {}
    export class TooManyRequests extends FaunaHTTPError {}
}

/** @public */
export declare class Expr {
    constructor(obj: object)

    readonly _isFaunaExpr?: boolean
    toFQL(): string
    static toString(expr: Expr): string
}

/** @public */
export declare type ExprArg = ExprVal | Array<ExprVal>

/** @public */
export declare type ExprVal = Expr | string | number | boolean | { [key: string]: any }

/** @public */
export declare type FaunaHttpErrorResponseContent = {
    errors: {
        code: string
        description: string
    }[]
}

/** @public */
export declare type Lambda = (...vars: any[]) => Expr

/** @public */
export declare class PageHelper {
    constructor(
    client: Client,
    set: Expr,
    params?: object,
    options?: QueryOptions
    )

    map(lambda: Lambda): PageHelper
    filter(lambda: Lambda): PageHelper

    each(lambda: (page: object) => void): Promise<void>
    eachReverse(lambda: (page: object) => void): Promise<void>

    previousPage(): Promise<object>
    nextPage(): Promise<object>
}

/** @public */
export declare interface QueryOptions
extends Partial<
Pick<ClientConfig, 'secret' | 'queryTimeout' | 'fetch' | 'observer'>
> {
    signal?: AbortSignal
}

/** @public */
export declare class RequestResult<T extends object = object> {
    constructor(
    method: string,
    path: string,
    query: object,
    requestRaw: string,
    requestContent: object,
    responseRaw: string,
    responseContent: T,
    statusCode: number,
    responseHeaders: object,
    startTime: Date,
    endTime: Date
    )

    readonly method: string
    readonly path: string
    readonly query: object
    readonly requestRaw: string
    readonly requestContent: object
    readonly responseRaw: string
    readonly responseContent: T
    readonly statusCode: number
    readonly responseHeaders: object
    readonly startTime: Date
    readonly endTime: Date
    readonly timeTaken: number
}

/** @public */
export declare module values {
    export class Value extends Expr {
        toJSON(): object
        inspect(): string

        readonly _isFaunaValue?: boolean
    }

    export class Ref extends Value {
        constructor(id: string, col?: Ref, db?: Ref)

        id: string
        collection?: Ref
        class?: Ref
        database?: Ref

        readonly _isFaunaRef?: boolean
    }

    export class Native {
        static readonly COLLECTIONS: Ref
        static readonly INDEXES: Ref
        static readonly DATABASES: Ref
        static readonly KEYS: Ref
        static readonly FUNCTIONS: Ref
        static readonly ACCESS_PROVIDERS: Ref
    }

    export class SetRef extends Value {
        constructor(value: string)
    }

    export class FaunaTime extends Value {
        constructor(value: string)
        constructor(value: Date)

        date: Date
    }

    export class FaunaDate extends Value {
        constructor(value: string)
        constructor(value: Date)

        date: Date
    }

    export class Bytes extends Value {
        constructor(value: string)
        constructor(value: ArrayBuffer)
        constructor(value: Uint8Array)
    }

    export class Query extends Value {
        constructor(value: object)
    }

    export type Document<T = object> = {
        ref: Ref
        ts: number
        data: T
    }

    export type Page<T> = {
        data: T[]
        after?: Expr
        before?: Expr
    }
}

export { }
