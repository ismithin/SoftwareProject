import { db } from "$lib/db";
import bcrypt from 'bcryptjs';

export const verifyHash=async (sha256Hash:string, bcryptHash:string):Promise<boolean>=>{
	if (!/^[a-fA-F0-9]{64}$/.test(sha256Hash)) {
		throw new Error("Invalid SHA-256 hash format.");
	}
	return await bcrypt.compare(sha256Hash, bcryptHash);
}

export const hashBcrypt=async (sha256Hash:string):Promise<string>=>{
	if (!/^[a-fA-F0-9]{64}$/.test(sha256Hash)) {
		throw new Error("Invalid SHA-256 hash format.");
	}
	return await bcrypt.hash(sha256Hash, 10);
}

export const hashSha256=async (plaintext:string):Promise<string>=>{
	return Array.from(
		new Uint8Array(
			await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(plaintext))
		)
	).map(
		(b) => b.toString(16).padStart(2, "0")
	).join(""); // convert bytes to hex string;
}