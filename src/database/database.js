"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mariadb_1 = __importDefault(require("mariadb"));
const schema_1 = require("./schema");
class Database {
    // Constructor
    constructor() {
        // Methods
        this.initializeDBSchema = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Initializing DB schema...");
            yield this.executeSQL(schema_1.BANK_ACCOUNT_TABLE);
        });
        this.beginTransaction = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield this._pool.getConnection();
                yield conn.beginTransaction();
                return conn;
            }
            catch (err) {
                console.log(err);
            }
        });
        this.commitTransaction = (conn) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield conn.commit();
                conn.end();
            }
            catch (err) {
                console.log(err);
            }
        });
        this.rollbackTransaction = (conn) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield conn.rollback();
                conn.end();
            }
            catch (err) {
                console.log(err);
            }
        });
        this.executeSQL = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield this._pool.getConnection();
                const res = yield conn.query(query);
                conn.end();
                return res;
            }
            catch (err) {
                console.log(err);
            }
        });
        this._pool = mariadb_1.default.createPool({
            database: process.env.DB_NAME || "transactions",
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT) || 3307,
            user: process.env.DB_USER || "transactions",
            password: process.env.DB_PASSWORD || "supersecret123",
            connectionLimit: 5,
        });
        this.initializeDBSchema();
    }
}
exports.Database = Database;
