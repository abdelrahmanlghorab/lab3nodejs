export const error = (err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        status: 'error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
