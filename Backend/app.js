var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('./config/db');
const cors = require('cors');

const productRoutes = require('./router/productRouter');
const authRoutes = require('./router/authRouter');
const orderRoutes = require('./router/orderRouter');
const cartRouter = require('./router/cartRouter');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.static('public'));

// Kết nối cơ sở dữ liệu
app.get('/', (req, res) => {
    res.send('Server đang chạy!');
});
database.connect();

// Khai báo các route
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://172.16.51.242:${PORT}`);
});

// Xử lý lỗi 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Xử lý lỗi tổng quát
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;