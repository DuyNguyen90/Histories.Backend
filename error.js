const ErrorCode = {
    INTERNAL: "INTERNAL_ERROR",
    INVALID_USERNAME_PASSWORD: "INVALID_USERNAME_PASSWORD",
    USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
    INVALID_TOKEN: "INVALID_TOKEN",
    NOT_FOUND: "NOT_FOUND"
};

const ServerError = {
    [ErrorCode.INTERNAL]: {
        code: ErrorCode.INTERNAL,
        message: "Internal server error"
    },
    [ErrorCode.INVALID_USERNAME_PASSWORD]: {
        code: ErrorCode.INVALID_USERNAME_PASSWORD,
        message: "Invalid username or password"
    },
    [ErrorCode.USER_ALREADY_EXIST]: {
        code: ErrorCode.USER_ALREADY_EXIST,
        message: "User with this username is already exist"
    },
    [ErrorCode.INVALID_TOKEN]: {
        code: ErrorCode.INVALID_TOKEN,
        message: "Invalid token"
    },
    [ErrorCode.NOT_FOUND]: {
        code: ErrorCode.NOT_FOUND,
        message: "Not found"
    }
}

module.exports = { ServerError, ErrorCode };