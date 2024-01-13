// @ts-nocheck
import admin from 'firebase-admin'

type FirebaseAdminAppParams = {
    projectId: string;
    clientEmail: string;
    storateBucket: string;
    privateKey: string;
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, '\n')
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatPrivateKey(params.privateKey)

    if (admin.apps.length > 0) {
        return admin.app()
    }
    const cert = admin.credentials.cert({
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey: privateKey
    })

    return admin.initializeApp({
        credential: admin.credential.cert(cert),
        storageBucket: params.storateBucket
    })
}

export async function initAdmin() {
    const params = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        storateBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
    }
}

