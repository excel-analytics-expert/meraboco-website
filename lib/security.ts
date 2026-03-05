import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

/**
 * Security Utility for Meraboco Platform
 * * 役割:
 * 1. ユーザー入力の無害化 (Sanitization)
 * 2. 内部エラーの隠蔽 (Error Masking)
 */

// ---------------------------------------------------------
// 1. Input Sanitization (入力値の洗浄)
// ---------------------------------------------------------

/**
 * HTML文字列から危険なタグを除去する
 * @param content ユーザーが入力したHTML/テキスト
 * @returns 無害化された文字列
 */
export function sanitizeInput(content: string): string {
    if (!content) return '';

    return DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'], // 許可するタグを厳選
        ALLOWED_ATTR: ['href', 'target'], // 許可する属性
    });
}

/**
 * オブジェクト内の全文字列プロパティを再帰的にサニタイズする
 * @param data フォームデータ等のオブジェクト
 */
export function sanitizeObject<T>(data: T): T {
    if (typeof data === 'string') {
        return sanitizeInput(data) as unknown as T;
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeObject(item)) as unknown as T;
    }

    if (typeof data === 'object' && data !== null) {
        const result: any = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = sanitizeObject((data as any)[key]);
            }
        }
        return result as T;
    }

    return data;
}

// ---------------------------------------------------------
// 2. Error Masking (内部エラーの隠蔽)
// ---------------------------------------------------------

/**
 * 安全なAPIレスポンスを生成するためのエラーハンドラ
 * 内部エラー(DB接続情報など)を隠蔽し、一般的なメッセージのみを返す
 */
export function handleApiError(error: unknown) {
    // 開発環境のログには詳細を出力 (監督確認用)
    console.error('[INTERNAL ERROR LOG]:', error);

    // クライアント(攻撃者含む)には一律でこのメッセージを返す
    return {
        error: 'Request failed.',
        code: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString()
    };
}

// ---------------------------------------------------------
// 3. Validation Schemas (バリデーション定義)
// ---------------------------------------------------------

// 共通の入力制限ルール
export const commonSchemas = {
    // ID: 英数字とハイフンのみ許可 (SQLインジェクション対策の基礎)
    safeId: z.string().regex(/^[a-zA-Z0-9_-]+$/),

    // URL: http/httpsのみ許可 (javascript:スキーム等を排除)
    safeUrl: z.string().url().startsWith('http'),
};
