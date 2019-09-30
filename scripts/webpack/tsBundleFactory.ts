import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';
import pathResolver from '../util/pathResolver';

class TsBundleFactory implements BundleFactory {
  private createTsCommonConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {
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

    return this.createTsCommonConfig({ output, chunks });
  }

  public createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/ALaCarte');
    const chunks = {
      ripple: pathResolver.getFromSrc('./ripple/index.ts')
    };

    return this.createTsCommonConfig({ output, chunks });
  }
}

export default TsBundleFactory;
