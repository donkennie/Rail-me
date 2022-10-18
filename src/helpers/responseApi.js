exports.success = (message, data) => {
    return {
        message,
        isSuccessful: true,
        data
    };
};


exports.failure = (message, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    const findCode = codes.find((code) => code === statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        isSuccessful: false
    };
};


exports.validate = (errors) => {
    return{
        message: "Validation failed",
        isSuccessful: false,
        errors
    }
}