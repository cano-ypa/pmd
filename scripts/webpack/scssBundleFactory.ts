import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';
import path from 'path';

class TsBundleFactory extends BundleFactory {
  private createScssCommonConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {
    return {
      mode: 'production',

      output: { filename: '[name]', path: output },

      entry: chunks,

      module: {
        rules: [
          {
            test: /\.scss$/,
            use: ['scss-loader']
          }
        ]
      },

      resolve: { extensions: ['.scss'] },

      devtool: 'source-map'
    };
  }

  public createCombinedConfig(): webpack.Configuration {
    const output = path.resolve(__dirname, './build/Combined');
    const chunks = path.resolve(__dirname, './src/pedeal-material/index.scss');

    return this.createScssCommonConfig({ output, chunks });
  }

  public createALaCarteConfig(): webpack.Configuration {
    const output = path.resolve(__dirname, './build/ALaCarte');
    const chunks = {
      ripple: path.resolve(__dirname, './src/ripple/index.scss')
    };

    return this.createScssCommonConfig({ output, chunks });
  }
}

export default TsBundleFactory;
