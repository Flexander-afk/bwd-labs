const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импортируем плагин

module.exports = {
  entry: './src/index.js', // Укажите ваш основной файл
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'dist'), // Укажите папку для сборки
    clean: true, // Очищает папку dist перед каждой сборкой
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Указывает на файлы с расширением .css
        use: ['style-loader', 'css-loader'], // Используем style-loader и css-loader
      },
      {
        test: /\.js$/, // Обработка JavaScript-файлов
        exclude: /node_modules/, // Исключаем папку node_modules
        use: {
          loader: 'babel-loader', // Используем babel-loader для транспиляции
          options: {
            presets: ['@babel/preset-env'], // Используем пресет для ES6
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Укажите путь к вашему шаблону HTML
      filename: 'index.html', // Имя выходного файла
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Укажите папку для сервера
    compress: true, // Включаем сжатие
    port: 9000, // Порт для dev-сервера
  },
  mode: 'development', // Укажите режим разработки
};

