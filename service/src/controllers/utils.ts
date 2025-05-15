
export const returnJson(payload: any, response: Response) {
    try {
        response.json(products);
    } catch (error) {
        next(error);
    }
}