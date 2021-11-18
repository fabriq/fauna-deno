import * as query from './src/types/query'

export {
  default as Client,
  ClientConfig,
  ExprArg,
  QueryOptions,
} from './src/types/Client'
export { default as Expr } from './src/types/Expr'
export { default as PageHelper } from './src/types/PageHelper'
export { default as RequestResult } from './src/types/RequestResult'

export type { LambdaType as Lambda, ExprVal } from './src/types/query'
export * from './src/types/errors'
export * from './src/types/values'

export { query }

/** @public */
export function setDeprecationHandler(fn: (msg: string) => void): void
