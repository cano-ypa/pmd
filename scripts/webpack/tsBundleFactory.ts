import BundleFactory from './bundleFactory';
import pathResolver from '../util/pathResolver';
import * as webpack from 'webpack';

import { ConfigOpt } from './type';

class TsBundleFactory implements BundleFactory {
  private createConfig({ output, chunks }: ConfigOpt): webpack.Configuration {
    return {
      mode: 'production',

      output: { filename: '[name].js', path: output, library: 'pmd', libraryTarget: 'umd' },

      entry: chunks,

      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: ['ts-loader']
          }
        ]
      },

      resolve: { extensions: ['.ts'] },

      devtool: 'source-map'
    };
  }

  public createCombined(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = pathResolver.getFromSrc('./pedeal-material/index.ts');

    return this.createConfig({ output, chunks });
  }

  public createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/ALaCarte');
    const chunks = {
      ripple: pathResolver.getFromSrc('./ripple/index.ts')
    };

    return this.createConfig({ output, chunks });
  }
}

export default TsBundleFactory;
