// バリデーター
interface ValidationResult {
    isValid: boolean;
    message: string;
}

export class Validator {
    public static validateEmail(value: string): ValidationResult {
        if (value == '') {
            console.log('メールアドレスが入力されていません');
            return { isValid: false, message: 'メールアドレスが入力されていません' };
        } else if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            console.log('メールアドレスの形式が正しくありません');
            return { isValid: false, message: 'メールアドレスの形式が正しくありません' };
        } else {
            return { isValid: true, message: '' }; // メールアドレスが正しい場合
        }
    }
}