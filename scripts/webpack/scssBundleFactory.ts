import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';
import pathResolver from '../util/pathResolver';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

class TsBundleFactory implements BundleFactory {
  private createConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {
    return {
      mode: 'production',

      output: {
        filename: 'none', // css の出力が js ファイルを上書きするのを防止する (css ファイルは MiniCssExtractPlugin が出力)
        path: output
      },

      entry: chunks,

      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }
        ]
      },

      plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],

      resolve: { extensions: ['.scss'] }
    };
  }

  public createCombined(): webpack.Configuration {
    const output = pathResolver.get('./build/Combined');
    const chunks = pathResolver.getFromSrc('./pedeal-material/index.scss');

    return this.createConfig({ output, chunks });
  }

  public createALaCarte(): webpack.Configuration {
    const output = pathResolver.get('./build/ALaCarte');
    const chunks = {
      ripple: pathResolver.getFromSrc('./ripple/index.scss')
    };

    return this.createConfig({ output, chunks });
  }
}

export default TsBundleFactory;
