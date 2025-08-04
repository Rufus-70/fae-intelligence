# Code Attributions and Citations

## Firebase Integration Implementation
**Date**: 2025-08-03  
**Purpose**: Visual Editor → Firebase → Website integration

### Firebase Storage Functions
**Source**: https://github.com/incubation-center/B8-FullStack--Website--Group7/blob/8accdeaab5de3b44542f4926f43af55c78ce6fd0/service/firebase.ts  
**License**: Unknown  
**Used for**: Image upload functionality in visual editor

```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};