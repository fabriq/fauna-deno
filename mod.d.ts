/** @public */
declare function Abort(msg: ExprArg): Expr

/** @public */
declare function Abs(expr: ExprArg): Expr

/** @public */
declare function AccessProvider(name: ExprArg): Expr

/** @public */
declare function AccessProviders(scope?: ExprArg): Expr

/** @public */
declare function Acos(expr: ExprArg): Expr

/** @public */
declare function Add(...args: ExprArg[]): Expr

/** @public */
declare function All(expr: ExprArg): Expr

/** @public */
declare function And(...args: ExprArg[]): Expr

/** @public */
declare function Any(expr: ExprArg): Expr

/** @public */
declare function Append(elements: ExprArg, collection: ExprArg): Expr

/** @public */
declare function Asin(expr: ExprArg): Expr

/** @public */
declare function At(timestamp: ExprArg, expr: ExprArg): Expr

/** @public */
declare function Atan(expr: ExprArg): Expr

/** @public */
declare function BitAnd(...args: ExprArg[]): Expr

/** @public */
declare function BitNot(expr: ExprArg): Expr

/** @public */
declare function BitOr(...args: ExprArg[]): Expr

/** @public */
declare function BitXor(...args: ExprArg[]): Expr

/** @public */
declare function Bytes(bytes: ExprArg | ArrayBuffer | Uint8Array): Expr

/** @public */
declare function Call(ref: ExprArg, ...args: ExprArg[]): Expr

/** @public */
declare function Casefold(string: ExprArg, normalizer?: ExprArg): Expr

/** @public */
declare function Ceil(expr: ExprArg): Expr

/** @public */
declare function Class(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Classes(scope?: ExprArg): Expr

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
  http2SessionIdleTime?: number
  checkNewVersion?: boolean
}

/** @public */
declare function Collection(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Collections(scope?: ExprArg): Expr

/** @public */
declare function Concat(strings: ExprArg, separator?: ExprArg): Expr

/** @public */
declare function Contains(path: ExprArg, _in: ExprArg): Expr

/** @public */
declare function ContainsField(field: string, _in: ExprArg): Expr

/** @public */
declare function ContainsPath(path: ExprArg, _in: ExprArg): Expr

/** @public */
declare function ContainsStr(value: ExprArg, search: ExprArg): Expr

/** @public */
declare function ContainsStrRegex(value: ExprArg, pattern: ExprArg): Expr

/** @public */
declare function ContainsValue(value: ExprArg, _in: ExprArg): Expr

/** @public */
declare function Cos(expr: ExprArg): Expr

/** @public */
declare function Cosh(expr: ExprArg): Expr

/** @public */
declare function Count(expr: ExprArg): Expr

/** @public */
declare function Create(collection_ref: ExprArg, params?: ExprArg): Expr

/** @public */
declare function CreateAccessProvider(params: ExprArg): Expr

/** @public */
declare function CreateClass(params: ExprArg): Expr

/** @public */
declare function CreateCollection(params: ExprArg): Expr

/** @public */
declare function CreateDatabase(params: ExprArg): Expr

/** @public */
declare function CreateFunction(params: ExprArg): Expr

/** @public */
declare function CreateIndex(params: ExprArg): Expr

/** @public */
declare function CreateKey(params: ExprArg): Expr

/** @public */
declare function CreateRole(params: ExprArg): Expr

/** @public */
declare function Credentials(scope?: ExprArg): Expr

/** @public */
declare function CurrentIdentity(): Expr

/** @public */
declare function CurrentToken(): Expr

/** @public */
declare function Database(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Databases(scope?: ExprArg): Expr

/** @public */
declare function Date_2(string: ExprArg): Expr

/** @public */
declare function DayOfMonth(expr: ExprArg): Expr

/** @public */
declare function DayOfWeek(expr: ExprArg): Expr

/** @public */
declare function DayOfYear(expr: ExprArg): Expr

/** @public */
declare function Degrees(expr: ExprArg): Expr

/** @public */
declare function Delete(ref: ExprArg): Expr

/** @public */
declare function Difference(...sets: ExprArg[]): Expr

/** @public */
declare function Distinct(set: ExprArg): Expr

/** @public */
declare function Divide(...args: ExprArg[]): Expr

/** @public */
declare function Do(...args: ExprArg[]): Expr

/** @public */
declare function Documents(collection: ExprArg): Expr

/** @public */
declare function Drop(number: ExprArg, collection: ExprArg): Expr

/** @public */
declare function EndsWith(value: ExprArg, search: ExprArg): Expr

/** @public */
declare function Epoch(number: ExprArg, unit: ExprArg): Expr

/** @public */
declare function Equals(...args: ExprArg[]): Expr

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
declare function Events(ref_set: ExprArg): Expr

/** @public */
declare function Exists(ref: ExprArg, ts?: ExprArg): Expr

/** @public */
declare function Exp(expr: ExprArg): Expr

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
export declare type ExprVal =
  | Expr
  | string
  | number
  | boolean
  | { [key: string]: any }

/** @public */
export declare type FaunaHttpErrorResponseContent = {
  errors: {
    code: string
    description: string
  }[]
}

/** @public */
declare function Filter(
  collection: ExprArg,
  lambda_expr: ExprArg | Lambda
): Expr

/** @public */
declare function FindStr(value: ExprArg, find: ExprArg, start?: ExprArg): Expr

/** @public */
declare function FindStrRegex(
  value: ExprArg,
  find: ExprArg,
  start?: ExprArg,
  numResults?: ExprArg
): Expr

/** @public */
declare function Floor(expr: ExprArg): Expr

/** @public */
declare function Foreach(
  collection: ExprArg,
  lambda_expr: ExprArg | Lambda
): Expr

/** @public */
declare function Format(string: ExprArg, values: ExprArg): Expr

/** @public */
declare function Function_2(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Functions(scope?: ExprArg): Expr

/** @public */
declare function Get(ref: ExprArg, ts?: ExprArg): Expr

/** @public */
declare function GT(...args: ExprArg[]): Expr

/** @public */
declare function GTE(...args: ExprArg[]): Expr

/** @public */
declare function HasCurrentIdentity(): Expr

/** @public */
declare function HasCurrentToken(): Expr

/** @public */
declare function HasIdentity(): Expr

/** @public */
declare function Hour(expr: ExprArg): Expr

/** @public */
declare function Hypot(value: ExprArg, exp?: ExprArg): Expr

/** @public */
declare function Identify(ref: ExprArg, password: ExprArg): Expr

/** @public */
declare function Identity(): Expr

/** @public */
declare function If(
  condition: ExprArg,
  then: ExprArg | null,
  _else: ExprArg | null
): Expr

/** @public */
declare function Index(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Indexes(scope?: ExprArg): Expr

/** @public */
declare function Insert(
  ref: ExprArg,
  ts: ExprArg,
  action: ExprArg,
  params: ExprArg
): Expr

/** @public */
declare function Intersection(...sets: ExprArg[]): Expr

/** @public */
declare function IsArray(expr: ExprArg): Expr

/** @public */
declare function IsBoolean(expr: ExprArg): Expr

/** @public */
declare function IsBytes(expr: ExprArg): Expr

/** @public */
declare function IsCollection(expr: ExprArg): Expr

/** @public */
declare function IsCredentials(expr: ExprArg): Expr

/** @public */
declare function IsDatabase(expr: ExprArg): Expr

/** @public */
declare function IsDate(expr: ExprArg): Expr

/** @public */
declare function IsDoc(expr: ExprArg): Expr

/** @public */
declare function IsDouble(expr: ExprArg): Expr

/** @public */
declare function IsEmpty(collection: ExprArg): Expr

/** @public */
declare function IsFunction(expr: ExprArg): Expr

/** @public */
declare function IsIndex(expr: ExprArg): Expr

/** @public */
declare function IsInteger(expr: ExprArg): Expr

/** @public */
declare function IsKey(expr: ExprArg): Expr

/** @public */
declare function IsLambda(expr: ExprArg): Expr

/** @public */
declare function IsNonEmpty(collection: ExprArg): Expr

/** @public */
declare function IsNull(expr: ExprArg): Expr

/** @public */
declare function IsNumber(expr: ExprArg): Expr

/** @public */
declare function IsObject(expr: ExprArg): Expr

/** @public */
declare function IsRef(expr: ExprArg): Expr

/** @public */
declare function IsRole(expr: ExprArg): Expr

/** @public */
declare function IsSet(expr: ExprArg): Expr

/** @public */
declare function IsString(expr: ExprArg): Expr

/** @public */
declare function IsTimestamp(expr: ExprArg): Expr

/** @public */
declare function IsToken(expr: ExprArg): Expr

/** @public */
declare function Join(source: ExprArg, target: ExprArg | Lambda): Expr

/** @public */
declare function KeyFromSecret(secret: ExprArg): Expr

/** @public */
declare function Keys(scope?: ExprArg): Expr

/** @public */
export declare type Lambda = (...vars: any[]) => Expr

/** @public */
declare function Lambda_2(f: Lambda): Expr

/** @public */
declare function Lambda_2(var_name: ExprArg, expr: ExprArg): Expr

/** @public */
declare function Length(expr: ExprArg): Expr

/** @public */
declare function Let(vars: ExprArg, in_expr: ExprArg): Expr

/** @public */
declare function Ln(expr: ExprArg): Expr

/** @public */
declare function Log(expr: ExprArg): Expr

/** @public */
declare function Login(ref: ExprArg, params: ExprArg): Expr

/** @public */
declare function Logout(delete_tokens: ExprArg): Expr

/** @public */
declare function LowerCase(expr: ExprArg): Expr

/** @public */
declare function LT(...args: ExprArg[]): Expr

/** @public */
declare function LTE(...args: ExprArg[]): Expr

/** @public */
declare function LTrim(expr: ExprArg): Expr

/** @public */
declare function Map_2(collection: ExprArg, lambda_expr: ExprArg | Lambda): Expr

/** @public */
declare function Match(index: ExprArg, ...terms: ExprArg[]): Expr

/** @public */
declare function Max(...args: ExprArg[]): Expr

/** @public */
declare function Mean(expr: ExprArg): Expr

/** @public */
declare function Merge(
  object: ExprArg,
  values: ExprArg,
  resolver?: Expr | Lambda
): Expr

/** @public */
declare function Min(...args: ExprArg[]): Expr

/** @public */
declare function Minute(expr: ExprArg): Expr

/** @public */
declare function Modulo(...args: ExprArg[]): Expr

/** @public */
declare function Month(expr: ExprArg): Expr

/** @public */
declare function MoveDatabase(from: ExprArg, to: ExprArg): Expr

/** @public */
declare function Multiply(...args: ExprArg[]): Expr

/** @public */
declare function NewId(): Expr

/** @public */
declare function NextId(): Expr

/** @public */
declare function NGram(terms: ExprArg, min?: ExprArg, max?: ExprArg): Expr

/** @public */
declare function Not(bool: ExprArg): Expr

/** @public */
declare function Now(): Expr

/** @public */
declare function Object_2(fields: ExprArg): Expr

/** @public */
declare function Or(...args: ExprArg[]): Expr

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
declare function Paginate(set: ExprArg, opts?: object): Expr

/** @public */
declare function Pow(value: ExprArg, exp?: ExprArg): Expr

/** @public */
declare function Prepend_2(elements: ExprArg, collection: ExprArg): Expr

/** @public */
declare function Query(lambda: ExprArg | Lambda): Expr

declare namespace query {
  export {
    Ref,
    Bytes,
    Abort,
    At,
    Let,
    Var,
    If,
    Do,
    Object_2 as Object,
    Lambda_2 as Lambda,
    Call,
    Query,
    Map_2 as Map,
    Merge,
    Foreach,
    Filter,
    Take,
    Drop,
    Prepend_2 as Prepend,
    Append,
    IsEmpty,
    IsNonEmpty,
    IsNumber,
    IsDouble,
    IsInteger,
    IsBoolean,
    IsNull,
    IsBytes,
    IsTimestamp,
    IsDate,
    IsString,
    IsArray,
    IsObject,
    IsRef,
    IsSet,
    IsDoc,
    IsLambda,
    IsCollection,
    IsDatabase,
    IsIndex,
    IsFunction,
    IsKey,
    IsToken,
    IsCredentials,
    IsRole,
    Get,
    KeyFromSecret,
    Reduce,
    Paginate,
    Exists,
    Create,
    Update,
    Replace,
    Delete,
    Insert,
    Remove,
    CreateClass,
    CreateCollection,
    CreateDatabase,
    CreateIndex,
    CreateKey,
    CreateFunction,
    CreateRole,
    CreateAccessProvider,
    Singleton,
    Events,
    Match,
    Union,
    Intersection,
    Difference,
    Distinct,
    Join,
    Range_2 as Range,
    Login,
    Logout,
    Identify,
    Identity,
    CurrentIdentity,
    HasIdentity,
    HasCurrentIdentity,
    CurrentToken,
    HasCurrentToken,
    Concat,
    Casefold,
    ContainsStr,
    ContainsStrRegex,
    StartsWith,
    EndsWith,
    RegexEscape,
    FindStr,
    FindStrRegex,
    Length,
    LowerCase,
    LTrim,
    NGram,
    Repeat,
    ReplaceStr,
    ReplaceStrRegex,
    RTrim,
    Space,
    SubString,
    TitleCase,
    Trim,
    UpperCase,
    Format,
    Time,
    Epoch,
    TimeAdd,
    TimeSubtract,
    TimeDiff,
    Date_2 as Date,
    Now,
    DayOfWeek,
    DayOfYear,
    DayOfMonth,
    Hour,
    Minute,
    Second,
    Year,
    Month,
    NextId,
    NewId,
    Database,
    Index,
    Class,
    Collection,
    Function_2 as Function,
    Role,
    AccessProviders,
    Databases,
    Classes,
    Collections,
    Indexes,
    Functions,
    Roles,
    Keys,
    Tokens,
    Credentials,
    Equals,
    Contains,
    Select,
    SelectAll,
    Abs,
    Add,
    BitAnd,
    BitNot,
    BitOr,
    BitXor,
    Ceil,
    Divide,
    Floor,
    Max,
    Min,
    Modulo,
    Multiply,
    Round,
    Subtract,
    Sign,
    Sqrt,
    Trunc,
    Count,
    Sum,
    Mean,
    Any,
    All,
    Acos,
    Asin,
    Atan,
    Cos,
    Cosh,
    Degrees,
    Exp,
    Hypot,
    Ln,
    Log,
    Pow,
    Radians,
    Sin,
    Sinh,
    Tan,
    Tanh,
    LT,
    LTE,
    GT,
    GTE,
    And,
    Or,
    Not,
    ToString,
    ToNumber,
    ToObject,
    ToArray,
    ToDouble,
    ToInteger,
    ToTime,
    ToDate,
    ToSeconds,
    ToMillis,
    ToMicros,
    MoveDatabase,
    Documents,
    ContainsPath,
    ContainsField,
    ContainsValue,
    Reverse,
    AccessProvider,
    ExprVal,
    ExprArg,
    Lambda as LambdaType,
  }
}
export { query }

/** @public */
export declare interface QueryOptions
  extends Partial<Pick<ClientConfig, 'secret' | 'queryTimeout' | 'observer'>> {
  signal?: AbortSignal
}

/** @public */
declare function Radians(expr: ExprArg): Expr

/** @public */
declare function Range_2(set: ExprArg, from: ExprArg, to: ExprArg): Expr

/** @public */
declare function Reduce(
  lambda: ExprArg,
  initial: ExprArg,
  collection: ExprArg
): Expr

/** @public */
declare function Ref(ref: ExprArg, id?: ExprArg): Expr

/** @public */
declare function RegexEscape(value: ExprArg): Expr

/** @public */
declare function Remove(ref: ExprArg, ts: ExprArg, action: ExprArg): Expr

/** @public */
declare function Repeat(expr: ExprArg, number?: ExprArg): Expr

/** @public */
declare function Replace(ref: ExprArg, params: ExprArg): Expr

/** @public */
declare function ReplaceStr(
  expr: ExprArg,
  find: ExprArg,
  replace: ExprArg
): Expr

/** @public */
declare function ReplaceStrRegex(
  expr: ExprArg,
  find: ExprArg,
  replace: ExprArg,
  first?: ExprArg
): Expr

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
declare function Reverse(expr: ExprArg): Expr

/** @public */
declare function Role(name: ExprArg, scope?: ExprArg): Expr

/** @public */
declare function Roles(scope?: ExprArg): Expr

/** @public */
declare function Round(value: ExprArg, precision?: ExprArg): Expr

/** @public */
declare function RTrim(expr: ExprArg): Expr

/** @public */
declare function Second(expr: ExprArg): Expr

/** @public */
declare function Select(path: ExprArg, from: ExprArg, _default?: ExprArg): Expr

/** @public */
declare function SelectAll(path: ExprArg, from: ExprArg): Expr

/** @public */
declare function Sign(expr: ExprArg): Expr

/** @public */
declare function Sin(expr: ExprArg): Expr

/** @public */
declare function Singleton(ref: ExprArg): Expr

/** @public */
declare function Sinh(expr: ExprArg): Expr

/** @public */
declare function Space(expr: ExprArg): Expr

/** @public */
declare function Sqrt(expr: ExprArg): Expr

/** @public */
declare function StartsWith(value: ExprArg, search: ExprArg): Expr

/** @public */
declare function SubString(
  expr: ExprArg,
  start?: ExprArg,
  length?: ExprArg
): Expr

/** @public */
declare function Subtract(...args: ExprArg[]): Expr

/** @public */
declare function Sum(expr: ExprArg): Expr

/** @public */
declare function Take(number: ExprArg, collection: ExprArg): Expr

/** @public */
declare function Tan(expr: ExprArg): Expr

/** @public */
declare function Tanh(expr: ExprArg): Expr

/** @public */
declare function Time(string: ExprArg): Expr

/** @public */
declare function TimeAdd(base: ExprArg, offset: ExprArg, unit: ExprArg): Expr

/** @public */
declare function TimeDiff(start: ExprArg, finish: ExprArg, unit: ExprArg): Expr

/** @public */
declare function TimeSubtract(
  base: ExprArg,
  offset: ExprArg,
  unit: ExprArg
): Expr

/** @public */
declare function TitleCase(value: ExprArg): Expr

/** @public */
declare function ToArray(expr: ExprArg): Expr

/** @public */
declare function ToDate(expr: ExprArg): Expr

/** @public */
declare function ToDouble(expr: ExprArg): Expr

/** @public */
declare function ToInteger(expr: ExprArg): Expr

/** @public */
declare function Tokens(scope?: ExprArg): Expr

/** @public */
declare function ToMicros(expr: ExprArg): Expr

/** @public */
declare function ToMillis(expr: ExprArg): Expr

/** @public */
declare function ToNumber(expr: ExprArg): Expr

/** @public */
declare function ToObject(expr: ExprArg): Expr

/** @public */
declare function ToSeconds(expr: ExprArg): Expr

/** @public */
declare function ToString(expr: ExprArg): Expr

/** @public */
declare function ToTime(expr: ExprArg): Expr

/** @public */
declare function Trim(expr: ExprArg): Expr

/** @public */
declare function Trunc(value: ExprArg, precision?: ExprArg): Expr

/** @public */
declare function Union(...sets: ExprArg[]): Expr

/** @public */
declare function Update(ref: ExprArg, params: ExprArg): Expr

/** @public */
declare function UpperCase(expr: ExprArg): Expr

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

/** @public */
declare function Var(varName: ExprArg): Expr

/** @public */
declare function Year(expr: ExprArg): Expr

export {}
