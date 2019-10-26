import BundleFactory from './bundleFactory';
import pathResolver from '../util/pathResolver';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { ConfigOpt } from './type';

class ScssBundleFactory implements BundleFactory {
  private createConfig({ output, chunks }: ConfigOpt): webpack.Configuration {
    return {
      mode: 'production',

      output: {
        filename: 'cssavoid/[name].js', // css の出力が js ファイルを上書きするのを防止する (css ファイルは MiniCssExtractPlugin が出力)
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
      ripple: pathResolver.getFromSrc('./ripple/index.scss'),
      button: pathResolver.getFromSrc('./button/index.scss'),
      card: pathResolver.getFromSrc('./card/index.scss'),
      'type-system': pathResolver.getFromSrc('./type-system/index.scss')
    };

    return this.createConfig({ output, chunks });
  }
}

export default ScssBundleFactory;
