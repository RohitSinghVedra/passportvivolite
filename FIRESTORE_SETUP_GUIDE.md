# Firestore Setup Guide - Fix Database Issues

## 🔧 **CRITICAL: Follow these steps to fix the database errors**

### **Step 1: Access Firebase Console**
1. Go to: https://console.firebase.google.com
2. Sign in with your Google account
3. Select your project: `passportvivolite`

### **Step 2: Navigate to Firestore Database**
1. In the left sidebar, click **"Firestore Database"**
2. Click on the **"Rules"** tab at the top

### **Step 3: Replace the Rules**
1. **Delete all existing rules** in the editor
2. **Copy and paste** the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own user data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow users to read and write their own survey sessions
    match /surveySessions/{sessionId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == request.resource.data.userId);
    }
    
    // Allow users to read and write their own survey results
    match /surveyResults/{resultId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == request.resource.data.userId);
    }
    
    // Allow users to read and write their own certificates
    match /certificates/{certificateId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == request.resource.data.userId);
    }
    
    // Allow public read access to certificates for verification
    match /certificates/{certificateId} {
      allow read: if true; // Public read for certificate verification
    }
    
    // Allow users to read survey questions (public data)
    match /surveyQuestions/{questionId} {
      allow read: if true;
      allow write: if request.auth != null; // Allow authenticated users to write questions
    }
    
    // Allow admins to read all data
    match /{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Allow authenticated users to create documents in any collection
    // This is needed for initial database setup
    match /{document=**} {
      allow create: if request.auth != null;
    }
  }
}
```

### **Step 4: Publish the Rules**
1. Click the **"Publish"** button
2. Wait for the confirmation message: "Rules published successfully"

### **Step 5: Test the Fix**
1. Refresh your app
2. Complete a survey
3. Check the console - no more "Missing or insufficient permissions" errors
4. Verify that survey results are saved to database
5. Test certificate sharing - links should work without 404 errors

## 🚨 **What These Rules Do:**

### **✅ User Data Access:**
- Users can read/write their own profile data
- Users can read/write their own survey sessions
- Users can read/write their own survey results
- Users can read/write their own certificates

### **✅ Public Access:**
- Anyone can read certificates (for verification)
- Anyone can read survey questions (public data)

### **✅ Admin Access:**
- Admins can access all data (when admin token is set)

### **✅ Database Setup:**
- Authenticated users can create documents (needed for initial setup)

## 🔍 **After Publishing Rules:**

### **Expected Results:**
- ✅ No more "Missing or insufficient permissions" errors
- ✅ Survey results save to database successfully
- ✅ Certificate sharing links work without 404 errors
- ✅ QR codes link to working verification pages
- ✅ History page shows completed surveys
- ✅ Database collections are created automatically

### **If Issues Persist:**
1. **Wait 1-2 minutes** for rules to propagate
2. **Clear browser cache** and refresh
3. **Check Firebase Console** for any error messages
4. **Verify project ID** matches your Firebase project

## 📞 **Need Help?**
If you still see errors after following these steps:
1. Check the Firebase Console for any error messages
2. Verify your project ID is correct
3. Make sure you're signed in with the correct Google account
4. Try accessing the app in an incognito/private browser window
