export function CorsMiddleware(req, res, next){
    res['Access-Control-Allow-Origin'] = '*';
    res['Access-Control-Allow-Headers'] = '*';
    next();
}