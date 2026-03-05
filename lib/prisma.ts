import { PrismaClient } from '@prisma/client';

// グローバル変数にPrismaClientを保持し、開発環境でのホットリロードによる
// 接続数オーバー（"Too many connections"）を防ぐシングルトンパターン
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'], // 必要に応じてログを出力
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
