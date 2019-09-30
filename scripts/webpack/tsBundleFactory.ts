import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';
import path from 'path';

class TsBundleFactory extends BundleFactory {
  private createTsCommonConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {
    return {
      mode: 'production',

      output: { filename: '[name]', path: output },

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

  public createCombinedConfig(): webpack.Configuration {
    const output = path.resolve(__dirname, './build/Combined');
    const chunks = path.resolve(__dirname, './src/pedeal-material/index.ts');

    return this.createTsCommonConfig({ output, chunks });
  }

  public createALaCarteConfig(): webpack.Configuration {
    const output = path.resolve(__dirname, './build/ALaCarte');
    const chunks = {
      ripple: path.resolve(__dirname, './src/ripple/index.ts')
    };

    return this.createTsCommonConfig({ output, chunks });
  }
}

export default TsBundleFactory;
