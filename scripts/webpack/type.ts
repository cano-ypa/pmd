import * as webpack from 'webpack';

type WebpackChunks = string | string[] | webpack.Entry | webpack.EntryFunc;

type WebpackRules = webpack.RuleSetRule[];

type ConfigOpt = { output: string; chunks: WebpackChunks };

export { WebpackChunks, WebpackRules, ConfigOpt };
