import { errors } from './errors'
import Expr from './Expr'
import PageHelper from './PageHelper'
import { ExprArg } from './query'
import RequestResult from './RequestResult'

type StreamEventFields = 'action' | 'document' | 'diff' | 'prev' | 'index'

/** @public */
export interface ClientConfig {
  secret: string
  endpoint?: string
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
  metrics?: boolean
}

/** @public */
export interface QueryOptions
  extends Partial<
    Pick<
      ClientConfig,
      'secret' | 'queryTimeout' | 'observer'
    >
  > {
  signal?: AbortSignal
  traceparent?: string
  tags?: { [key: string]: string }
}

export type { ExprArg }


export interface MetricsResponse<T = object> {
  value: T
  metrics: {
    'x-compute-ops': number
    'x-byte-read-ops': number
    'x-byte-write-ops': number
    'x-query-time': number
    'x-txn-retries': number
  }
}

/** @public */
export default class Client {
  constructor(opts?: ClientConfig)
  query<T = object>(expr: ExprArg, options?: QueryOptions): Promise<T>
  queryWithMetrics<T = object>(
    expr: ExprArg,
    options?: QueryOptions
  ): Promise<MetricsResponse<T>>
  paginate(expr: Expr, params?: object, options?: QueryOptions): PageHelper
  ping(scope?: string, timeout?: number): Promise<string>
  close(opts?: { force?: boolean }): Promise<void>
}
