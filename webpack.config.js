const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Режим разработки
    entry: {
        index: './src/index.js', // Точка входа для основной страницы
        // Вы можете добавить другие точки входа, если у вас есть дополнительные страницы
    },
    output: {
        filename: 'bundle.js', // Имя выходного файла сборки
        path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
        clean: true, // Очистка папки dist перед сборкой
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Обработка JS файлов
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Транспиляция кода
                },
            },
            {
                test: /\.css$/, // Обработка CSS файлов
                use: ['style-loader', 'css-loader'], // Загрузчики для стилей
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон HTML для главной страницы
            inject: true,
            filename: 'index.html',
            scriptLoading: 'blocking', // Подключение скриптов в конце body
        }),
        new HtmlWebpackPlugin({
            template: './src/glav.html', // Шаблон HTML для второй страницы
            inject: true,
            filename: 'glav.html',
            scriptLoading: 'blocking', // Подключение скриптов в конце body
        }),
    ],
    devtool: 'source-map', // Генерация source maps
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Папка для статических файлов
        port: 3000, // Порт сервера
        open: true, // Автооткрытие браузера
    },
};

