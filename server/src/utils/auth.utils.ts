import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

export default hashPassword;
