import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';
import pathResolver from '../util/pathResolver';

class TsBundleFactory implements BundleFactory {
  private createScssCommonConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {
    return {
      mode: 'production',

      output: { filename: '[name].css', path: output },

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

  public createCombined(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = pathResolver.getFromSrc('./pedeal-material/index.scss');

    return this.createScssCommonConfig({ output, chunks });
  }

  public createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/ALaCarte');
    const chunks = {
      ripple: pathResolver.getFromSrc('./ripple/index.scss')
    };

    return this.createScssCommonConfig({ output, chunks });
  }
}

export default TsBundleFactory;
