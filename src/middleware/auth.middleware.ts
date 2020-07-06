
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

function getPath(originalUrl: string) {
    if (originalUrl.includes('?')) {
        const path = originalUrl.split('?')[0];
        return path;
    }
    return originalUrl;
}

export function LoggerMiddleware(req, res, next) {
    Logger.log(`Request...`);
    Logger.log(getPath(req.originalUrl));
    if (getPath(req.originalUrl) !== '/auth/login' && getPath(req.originalUrl) !== '/auth/alltokens') {
        jwt.verify(req.headers.token, 'mind', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    title: 'unauthorized',
                });
            }
            res.user_info = decoded;
            next();
        });
    } else {
        next();
    }
}
