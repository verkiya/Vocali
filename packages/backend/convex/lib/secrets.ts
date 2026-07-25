"use node";
/*
// --- LEGACY AWS SECRETS MANAGER IMPLEMENTATION ---
import {
  CreateSecretCommand,
  GetSecretValueCommand,
  type GetSecretValueCommandOutput,
  PutSecretValueCommand,
  ResourceExistsException,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export function createSecretsManagerClient(): SecretsManagerClient {
  return new SecretsManagerClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
}

export async function getSecretValue(
  secretName: string
): Promise<GetSecretValueCommandOutput> {
  const client = createSecretsManagerClient();
  return await client.send(new GetSecretValueCommand({ SecretId: secretName }));
}

export async function upsertSecret(
  secretName: string,
  secretValue: Record<string, unknown>
): Promise<void> {
  const client = createSecretsManagerClient();

  try {
    await client.send(
      new CreateSecretCommand({
        Name: secretName,
        SecretString: JSON.stringify(secretValue),
      })
    );
  } catch (error) {
    if (error instanceof ResourceExistsException) {
      await client.send(
        new PutSecretValueCommand({
          SecretId: secretName,
          SecretString: JSON.stringify(secretValue),
        })
      );
    } else {
      throw error;
    }
  }
}

export function parseSecretString<T = Record<string, unknown>>(
  secret: GetSecretValueCommandOutput
): T | null {
  if (!secret.SecretString) {
    return null;
  }

  try {
    return JSON.parse(secret.SecretString) as T;
  } catch {
    return null;
  }
}
*/

// --- NEW ENCRYPTED DATABASE STORAGE IMPLEMENTATION ---
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function encrypt(text: string): string {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  const key = Buffer.from(encryptionKey, "hex");
  if (key.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be a 64-character hex string (32 bytes)");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag().toString("base64");
  
  // Format: iv:authTag:encrypted
  return `${iv.toString("base64")}:${authTag}:${encrypted}`;
}

function decrypt(encryptedData: string): string {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  const key = Buffer.from(encryptionKey, "hex");
  
  const parts = encryptedData.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted data format");
  }

  const iv = Buffer.from(parts[0] as string, "base64");
  const authTag = Buffer.from(parts[1] as string, "base64");
  const encryptedText = parts[2] as string;

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted: string = decipher.update(encryptedText as string, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function encryptSecret(secretValue: Record<string, unknown>): string {
  return encrypt(JSON.stringify(secretValue));
}

export function decryptSecret<T = Record<string, unknown>>(encryptedData: string): T | null {
  try {
    const decrypted = decrypt(encryptedData);
    return JSON.parse(decrypted) as T;
  } catch (err) {
    console.error("Failed to decrypt or parse secret", err);
    return null;
  }
}
