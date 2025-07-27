# FAE Intelligence - Authentication & Password Reference

## 🔐 **Authentication Summary**

### **Firebase Project Information:**
- **Project ID**: `faes-web`
- **Auth Domain**: `faes-web.firebaseapp.com`
- **Console URL**: https://console.firebase.google.com/project/faes-web

### **Application Access:**
- **Local Development**: `http://localhost:3003`
- **Dashboard Login**: `http://localhost:3003/login`
- **Admin Dashboard**: `http://localhost:3003/dashboard`

---

## 📱 **Firebase Configuration**

### **Public API Keys (Safe for Client-Side):**
```
API Key: AIzaSyDUIVyQam00tPEH0AcLFlaDcT9XSoxr-h0
Project ID: faes-web
Auth Domain: faes-web.firebaseapp.com
Storage Bucket: faes-web.firebasestorage.app
Messaging Sender ID: 837345805064
App ID: 1:837345805064:web:0e4a42b4ada04d72dee2bd
Measurement ID: G-R4LHD76YKL
```

### **Admin Service Account:**
- **File**: `faes-web-firebase-adminsdk-fbsvc-ac7f230796.json`
- **Email**: `firebase-adminsdk-fbsvc@faes-web.iam.gserviceaccount.com`
- **Client ID**: `114212329823649424929`

---

## 👤 **User Authentication**

### **Login Process:**
1. Navigate to `/login` page
2. Enter email and password
3. Firebase handles authentication
4. Redirects to dashboard on success

### **User Management:**
- Authentication is handled by Firebase Auth
- User accounts need to be created in Firebase Console
- Dashboard access requires authenticated user

---

## 🔧 **Development Setup**

### **Environment Variables (.env.local):**
```bash
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_ENABLE_FAES_WEB_INTEGRATION=true
GOOGLE_APPLICATION_CREDENTIALS=./faes-web-firebase-adminsdk-fbsvc-ac7f230796.json
```

### **Current Server:**
- **Port**: 3003 (auto-selected, 3000 was in use)
- **Status**: Running via `npx next dev`

---

## 📋 **Access Checklist**

### **To Access Dashboard:**
1. ✅ Server running on port 3003
2. ✅ Firebase configuration loaded
3. ✅ Authentication components ready
4. ❓ User account created in Firebase Console
5. ❓ Login credentials known

### **Next Steps if Login Issues:**
1. **Check Firebase Console**: https://console.firebase.google.com/project/faes-web/authentication/users
2. **Create Test User**: Add user via Firebase Console Authentication tab
3. **Test Login**: Use created credentials at `/login`
4. **Access Dashboard**: Should redirect to `/dashboard` after login

---

## 🚨 **Security Notes**

- **Private Key**: Stored in `faes-web-firebase-adminsdk-fbsvc-ac7f230796.json` - Keep secure!
- **API Keys**: Public keys in config are safe for client-side use
- **Environment**: Currently set to development mode
- **Credentials**: Admin SDK credentials are for server-side operations only

---

## 🔗 **Quick Links**

- **Firebase Console**: https://console.firebase.google.com/project/faes-web
- **Local Dashboard**: http://localhost:3003/dashboard
- **Local Login**: http://localhost:3003/login
- **Blog Management**: http://localhost:3003/dashboard/blog

---

*Generated: July 26, 2025*
*Project: fae-intelligence*
*Environment: Development*
