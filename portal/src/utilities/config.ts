export class Config {
    private static readonly API_URL = 'http://localhost:3000/api';
    private static readonly DB_URL = 'http://127.0.0.1:8090';

    public static getApiUrl(): string {
        return this.API_URL;
    }

    public static getDbUrl(): string {
        return this.DB_URL;
    }
}
