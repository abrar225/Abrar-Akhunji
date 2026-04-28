// Firebase Security Rules for FixO Builder
// Deploy these rules in Firebase Console > Firestore > Rules
//
// These rules ensure:
// 1. Only authenticated users can read/write their own data
// 2. Chat data is scoped to the owning user
// 3. No unauthorized access to any collection

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - only the authenticated user can access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Validate data structure
      allow create: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.data.keys().hasAll(['trialCount'])
        && request.resource.data.keys().hasOnly(['trialCount', 'lastResetDate', 'preferences', 'memory', 'lastActiveAt']);
      
      allow update: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    // Chats collection - only the owning user can access their chats
    match /chats/{chatId} {
      allow read: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
      
      allow update: if request.auth != null 
        && resource.data.userId == request.auth.uid;
      
      allow delete: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
*/

export const FIREBASE_RULES_INFO = `
Firebase Security Rules are configured to:
- Only authenticated users can read/write their own data
- Chat data is scoped to the owning user (userId field must match auth.uid)
- No unauthorized access to any collection
- Default deny for all unmatched paths

Deploy these rules in:
Firebase Console > Firestore Database > Rules
`;
