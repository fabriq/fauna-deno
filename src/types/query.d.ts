import Expr from './Expr'

/** @public */
export type ExprVal = Expr | string | number | boolean | { [key: string]: any }
/** @public */
export type ExprArg = ExprVal | Array<ExprVal>
/** @public */
export type LambdaType = (...vars: any[]) => Expr

/** @public */
export function Ref(ref: ExprArg, id?: ExprArg): Expr
/** @public */
export function Bytes(bytes: ExprArg | ArrayBuffer | Uint8Array): Expr
/** @public */
export function Abort(msg: ExprArg): Expr
/** @public */
export function At(timestamp: ExprArg, expr: ExprArg): Expr
/** @public */
export function Let(vars: ExprArg, in_expr: ExprArg): Expr
/** @public */
export function Var(varName: ExprArg): Expr
/** @public */
export function If(
  condition: ExprArg,
  then: ExprArg | null,
  _else: ExprArg | null
): Expr
/** @public */
export function Do(...args: ExprArg[]): Expr
/** @public */
export function FaunaObject(fields: ExprArg): Expr

/** @public */
export function Lambda(f: LambdaType): Expr
/** @public */
export function Lambda(var_name: ExprArg, expr: ExprArg): Expr

/** @public */
export function Call(ref: ExprArg, ...args: ExprArg[]): Expr
/** @public */
export function Query(lambda: ExprArg | LambdaType): Expr
/** @public */
export function Map(
  collection: ExprArg,
  lambda_expr: ExprArg | LambdaType
): Expr
/** @public */
export function Merge(
  object: ExprArg,
  values: ExprArg,
  resolver?: Expr | LambdaType
): Expr
/** @public */
export function Foreach(
  collection: ExprArg,
  lambda_expr: ExprArg | LambdaType
): Expr
/** @public */
export function Filter(
  collection: ExprArg,
  lambda_expr: ExprArg | LambdaType
): Expr
/** @public */
export function Take(number: ExprArg, collection: ExprArg): Expr
/** @public */
export function Drop(number: ExprArg, collection: ExprArg): Expr
/** @public */
export function Prepend(elements: ExprArg, collection: ExprArg): Expr
/** @public */
export function Append(elements: ExprArg, collection: ExprArg): Expr
/** @public */
export function IsEmpty(collection: ExprArg): Expr
/** @public */
export function IsNonEmpty(collection: ExprArg): Expr
/** @public */
export function IsNumber(expr: ExprArg): Expr
/** @public */
export function IsDouble(expr: ExprArg): Expr
/** @public */
export function IsInteger(expr: ExprArg): Expr
/** @public */
export function IsBoolean(expr: ExprArg): Expr
/** @public */
export function IsNull(expr: ExprArg): Expr
/** @public */
export function IsBytes(expr: ExprArg): Expr
/** @public */
export function IsTimestamp(expr: ExprArg): Expr
/** @public */
export function IsDate(expr: ExprArg): Expr
/** @public */
export function IsString(expr: ExprArg): Expr
/** @public */
export function IsArray(expr: ExprArg): Expr
/** @public */
export function IsObject(expr: ExprArg): Expr
/** @public */
export function IsRef(expr: ExprArg): Expr
/** @public */
export function IsSet(expr: ExprArg): Expr
/** @public */
export function IsDoc(expr: ExprArg): Expr
/** @public */
export function IsLambda(expr: ExprArg): Expr
/** @public */
export function IsCollection(expr: ExprArg): Expr
/** @public */
export function IsDatabase(expr: ExprArg): Expr
/** @public */
export function IsIndex(expr: ExprArg): Expr
/** @public */
export function IsFunction(expr: ExprArg): Expr
/** @public */
export function IsKey(expr: ExprArg): Expr
/** @public */
export function IsToken(expr: ExprArg): Expr
/** @public */
export function IsCredentials(expr: ExprArg): Expr
/** @public */
export function IsRole(expr: ExprArg): Expr

/** @public */
export function Get(ref: ExprArg, ts?: ExprArg): Expr
/** @public */
export function KeyFromSecret(secret: ExprArg): Expr
/** @public */
export function Reduce(
  lambda: ExprArg,
  initial: ExprArg,
  collection: ExprArg
): Expr
/** @public */
export function Paginate(set: ExprArg, opts?: object): Expr
/** @public */
export function Exists(ref: ExprArg, ts?: ExprArg): Expr

/** @public */
export function Create(collection_ref: ExprArg, params?: ExprArg): Expr
/** @public */
export function Update(ref: ExprArg, params: ExprArg): Expr
/** @public */
export function Replace(ref: ExprArg, params: ExprArg): Expr
/** @public */
export function Delete(ref: ExprArg): Expr
/** @public */
export function Insert(
  ref: ExprArg,
  ts: ExprArg,
  action: ExprArg,
  params: ExprArg
): Expr
/** @public */
export function Remove(ref: ExprArg, ts: ExprArg, action: ExprArg): Expr
/** @public */
export function CreateClass(params: ExprArg): Expr
/** @public */
export function CreateCollection(params: ExprArg): Expr
/** @public */
export function CreateDatabase(params: ExprArg): Expr
/** @public */
export function CreateIndex(params: ExprArg): Expr
/** @public */
export function CreateKey(params: ExprArg): Expr
/** @public */
export function CreateFunction(params: ExprArg): Expr
/** @public */
export function CreateRole(params: ExprArg): Expr
/** @public */
export function CreateAccessProvider(params: ExprArg): Expr

/** @public */
export function Singleton(ref: ExprArg): Expr
/** @public */
export function Events(ref_set: ExprArg): Expr
/** @public */
export function Match(index: ExprArg, ...terms: ExprArg[]): Expr
/** @public */
export function Union(...sets: ExprArg[]): Expr
/** @public */
export function Intersection(...sets: ExprArg[]): Expr
/** @public */
export function Difference(...sets: ExprArg[]): Expr
/** @public */
export function Distinct(set: ExprArg): Expr
/** @public */
export function Join(source: ExprArg, target: ExprArg | LambdaType): Expr

/** @public */
export function Range(set: ExprArg, from: ExprArg, to: ExprArg): Expr
/** @public */
export function Login(ref: ExprArg, params: ExprArg): Expr
/** @public */
export function Logout(delete_tokens: ExprArg): Expr
/** @public */
export function Identify(ref: ExprArg, password: ExprArg): Expr
/** @public */
export function Identity(): Expr
/** @public */
export function CurrentIdentity(): Expr
/** @public */
export function HasIdentity(): Expr
/** @public */
export function HasCurrentIdentity(): Expr
/** @public */
export function CurrentToken(): Expr
/** @public */
export function HasCurrentToken(): Expr

/** @public */
export function Concat(strings: ExprArg, separator?: ExprArg): Expr
/** @public */
export function Casefold(string: ExprArg, normalizer?: ExprArg): Expr
/** @public */
export function ContainsStr(value: ExprArg, search: ExprArg): Expr
/** @public */
export function ContainsStrRegex(value: ExprArg, pattern: ExprArg): Expr
/** @public */
export function StartsWith(value: ExprArg, search: ExprArg): Expr
/** @public */
export function EndsWith(value: ExprArg, search: ExprArg): Expr
/** @public */
export function RegexEscape(value: ExprArg): Expr
/** @public */
export function FindStr(value: ExprArg, find: ExprArg, start?: ExprArg): Expr
/** @public */
export function FindStrRegex(
  value: ExprArg,
  find: ExprArg,
  start?: ExprArg,
  numResults?: ExprArg
): Expr
/** @public */
export function Length(expr: ExprArg): Expr
/** @public */
export function LowerCase(expr: ExprArg): Expr
/** @public */
export function LTrim(expr: ExprArg): Expr
/** @public */
export function NGram(terms: ExprArg, min?: ExprArg, max?: ExprArg): Expr
/** @public */
export function Repeat(expr: ExprArg, number?: ExprArg): Expr
/** @public */
export function ReplaceStr(expr: ExprArg, find: ExprArg, replace: ExprArg): Expr
/** @public */
export function ReplaceStrRegex(
  expr: ExprArg,
  find: ExprArg,
  replace: ExprArg,
  first?: ExprArg
): Expr
/** @public */
export function RTrim(expr: ExprArg): Expr
/** @public */
export function Space(expr: ExprArg): Expr
/** @public */
export function SubString(
  expr: ExprArg,
  start?: ExprArg,
  length?: ExprArg
): Expr
/** @public */
export function TitleCase(value: ExprArg): Expr
/** @public */
export function Trim(expr: ExprArg): Expr
/** @public */
export function UpperCase(expr: ExprArg): Expr
/** @public */
export function Format(string: ExprArg, values: ExprArg): Expr

/** @public */
export function Time(string: ExprArg): Expr
/** @public */
export function Epoch(number: ExprArg, unit: ExprArg): Expr
/** @public */
export function TimeAdd(base: ExprArg, offset: ExprArg, unit: ExprArg): Expr
/** @public */
export function TimeSubtract(
  base: ExprArg,
  offset: ExprArg,
  unit: ExprArg
): Expr
/** @public */
export function TimeDiff(start: ExprArg, finish: ExprArg, unit: ExprArg): Expr
/** @public */
export function Date(string: ExprArg): Expr
/** @public */
export function Now(): Expr
/** @public */
export function DayOfWeek(expr: ExprArg): Expr
/** @public */
export function DayOfYear(expr: ExprArg): Expr
/** @public */
export function DayOfMonth(expr: ExprArg): Expr
/** @public */
export function Hour(expr: ExprArg): Expr
/** @public */
export function Minute(expr: ExprArg): Expr
/** @public */
export function Second(expr: ExprArg): Expr
/** @public */
export function Year(expr: ExprArg): Expr
/** @public */
export function Month(expr: ExprArg): Expr

/** @public */
export function NextId(): Expr
/** @public */
export function NewId(): Expr
/** @public */
export function Database(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function FaunaIndex(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function Class(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function Collection(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function FaunaFunction(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function Role(name: ExprArg, scope?: ExprArg): Expr
/** @public */
export function AccessProviders(scope?: ExprArg): Expr
/** @public */
export function Databases(scope?: ExprArg): Expr
/** @public */
export function Classes(scope?: ExprArg): Expr
/** @public */
export function Collections(scope?: ExprArg): Expr
/** @public */
export function Indexes(scope?: ExprArg): Expr
/** @public */
export function Functions(scope?: ExprArg): Expr
/** @public */
export function Roles(scope?: ExprArg): Expr
/** @public */
export function Keys(scope?: ExprArg): Expr
/** @public */
export function Tokens(scope?: ExprArg): Expr
/** @public */
export function Credentials(scope?: ExprArg): Expr
/** @public */
export function Equals(...args: ExprArg[]): Expr
/** @public */
export function Contains(path: ExprArg, _in: ExprArg): Expr
/** @public */
export function Select(path: ExprArg, from: ExprArg, _default?: ExprArg): Expr
/** @public */
export function SelectAll(path: ExprArg, from: ExprArg): Expr
/** @public */
export function Abs(expr: ExprArg): Expr
/** @public */
export function Add(...args: ExprArg[]): Expr
/** @public */
export function BitAnd(...args: ExprArg[]): Expr
/** @public */
export function BitNot(expr: ExprArg): Expr
/** @public */
export function BitOr(...args: ExprArg[]): Expr
/** @public */
export function BitXor(...args: ExprArg[]): Expr
/** @public */
export function Ceil(expr: ExprArg): Expr
/** @public */
export function Divide(...args: ExprArg[]): Expr
/** @public */
export function Floor(expr: ExprArg): Expr
/** @public */
export function Max(...args: ExprArg[]): Expr
/** @public */
export function Min(...args: ExprArg[]): Expr
/** @public */
export function Modulo(...args: ExprArg[]): Expr
/** @public */
export function Multiply(...args: ExprArg[]): Expr
/** @public */
export function Round(value: ExprArg, precision?: ExprArg): Expr
/** @public */
export function Subtract(...args: ExprArg[]): Expr
/** @public */
export function Sign(expr: ExprArg): Expr
/** @public */
export function Sqrt(expr: ExprArg): Expr
/** @public */
export function Trunc(value: ExprArg, precision?: ExprArg): Expr
/** @public */
export function Count(expr: ExprArg): Expr
/** @public */
export function Sum(expr: ExprArg): Expr
/** @public */
export function Mean(expr: ExprArg): Expr
/** @public */
export function Any(expr: ExprArg): Expr
/** @public */
export function All(expr: ExprArg): Expr
/** @public */
export function Acos(expr: ExprArg): Expr
/** @public */
export function Asin(expr: ExprArg): Expr
/** @public */
export function Atan(expr: ExprArg): Expr
/** @public */
export function Cos(expr: ExprArg): Expr
/** @public */
export function Cosh(expr: ExprArg): Expr
/** @public */
export function Degrees(expr: ExprArg): Expr
/** @public */
export function Exp(expr: ExprArg): Expr
/** @public */
export function Hypot(value: ExprArg, exp?: ExprArg): Expr
/** @public */
export function Ln(expr: ExprArg): Expr
/** @public */
export function Log(expr: ExprArg): Expr
/** @public */
export function Pow(value: ExprArg, exp?: ExprArg): Expr
/** @public */
export function Radians(expr: ExprArg): Expr
/** @public */
export function Sin(expr: ExprArg): Expr
/** @public */
export function Sinh(expr: ExprArg): Expr
/** @public */
export function Tan(expr: ExprArg): Expr
/** @public */
export function Tanh(expr: ExprArg): Expr
/** @public */
export function LT(...args: ExprArg[]): Expr
/** @public */
export function LTE(...args: ExprArg[]): Expr
/** @public */
export function GT(...args: ExprArg[]): Expr
/** @public */
export function GTE(...args: ExprArg[]): Expr
/** @public */
export function And(...args: ExprArg[]): Expr
/** @public */
export function Or(...args: ExprArg[]): Expr
/** @public */
export function Not(bool: ExprArg): Expr

/** @public */
export function ToString(expr: ExprArg): Expr
/** @public */
export function ToNumber(expr: ExprArg): Expr
/** @public */
export function ToObject(expr: ExprArg): Expr
/** @public */
export function ToArray(expr: ExprArg): Expr
/** @public */
export function ToDouble(expr: ExprArg): Expr
/** @public */
export function ToInteger(expr: ExprArg): Expr
/** @public */
export function ToTime(expr: ExprArg): Expr
/** @public */
export function ToDate(expr: ExprArg): Expr
/** @public */
export function ToSeconds(expr: ExprArg): Expr
/** @public */
export function ToMillis(expr: ExprArg): Expr
/** @public */
export function ToMicros(expr: ExprArg): Expr

/** @public */
export function MoveDatabase(from: ExprArg, to: ExprArg): Expr
/** @public */
export function Documents(collection: ExprArg): Expr
/** @public */
export function ContainsPath(path: ExprArg, _in: ExprArg): Expr
/** @public */
export function ContainsField(field: string, _in: ExprArg): Expr
/** @public */
export function ContainsValue(value: ExprArg, _in: ExprArg): Expr
/** @public */
export function Reverse(expr: ExprArg): Expr

/** @public */
export function AccessProvider(name: ExprArg): Expr
