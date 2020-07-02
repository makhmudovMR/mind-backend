
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

export function LoggerMiddleware(req, res, next) {
    Logger.log(`Request...`);
    jwt.verify(req.token, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'unauthorized',
            });
        }
        res.user_info = decoded;
        next();
    });
}
