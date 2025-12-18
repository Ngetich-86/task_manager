type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const getTimestamp = () => new Date().toISOString();

const log = (level: LogLevel, message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'test') return;

    const timestamp = getTimestamp();
    const metaString = meta ? JSON.stringify(meta) : '';
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message} ${metaString}`;

    switch (level) {
        case 'error':
            console.error(formattedMessage);
            break;
        case 'warn':
            console.warn(formattedMessage);
            break;
        case 'info':
            console.log(formattedMessage);
            break;
        case 'debug':
            if (process.env.NODE_ENV !== 'production') {
                console.debug(formattedMessage);
            }
            break;
    }
};

export const logger = {
    error: (message: string, meta?: any) => log('error', message, meta),
    warn: (message: string, meta?: any) => log('warn', message, meta),
    info: (message: string, meta?: any) => log('info', message, meta),
    debug: (message: string, meta?: any) => log('debug', message, meta),
};
