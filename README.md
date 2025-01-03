# **Crop Doctor** 🌱  
AI-Based Plant Diagnosis and Management Platform  

---

## **Overview** 📝  
**Crop Doctor** is a smart platform designed to help plant growers easily identify diseases in their crops and find appropriate solutions. By uploading images of plants, users can receive AI-driven disease analysis and recommended treatments. The service also offers a community for sharing knowledge and tools for managing crop growth diaries.

---

## **Project Goal** 🌱  
To simplify disease management for plant growers by leveraging AI technology, addressing the growing need for accurate plant disease information in the face of increasing interest in personal and commercial crop cultivation.

---

## **Features** 🚀  

### **Main Features**  
1. **AI Disease Diagnosis**:  
   - Upload crop images to analyze and diagnose plant diseases using the Crop Doctor AI model.  
   - Receive detailed recommendations and solutions for treatment.  

2. **Growth Diary Management**:  
   - Create and manage crop growth logs.  
   - Track progress and maintain organized records.  

3. **Community Sharing**:  
   - Share crop-related experiences and knowledge with other users.  

### **Additional Features**  
- **Nutrient Information Management**:  
  - Admin-curated details about crop nutrients and fertilizers.  

- **User Dashboard**:  
  - View diagnosis history and manage account settings.  

- **Community Rankings**:  
  - Track most popular posts and discussions within the platform.  

---

## **Technical Details** 🛠️  

### **AI Model**  
- **Model Type**: MobileNetV2 (Transfer Learning)  
- **Purpose**: Classify diseases based on uploaded plant images and recommend solutions.  
- **Input**: Images in formats like `.jpg`, `.png` (224x224 resolution).  
- **Output**: Predicted disease classification with detailed treatment solutions.  
- **Techniques Used**:  
  - **Data Augmentation**: Rotation, cropping, horizontal flipping.  
  - **Loss Function**: Weighted Cross-Entropy (WCE).  
  - **Optimizers**: Adam.  

### **Frontend Technologies**  
- **React**: For building a dynamic user interface.  
- **Styled-Components**: For modular and reusable CSS styles in JavaScript.  
- **Figma**: For UI/UX design and prototyping.  
- **React Query & Jotai**: For state and server data management.

### **Backend Technologies**  
- **Node.js & Nest.js**: Server-side frameworks for scalable and maintainable API development.  
- **MySQL**: Relational database for storing user and plant-related data.  
- **AWS**: Cloud infrastructure for database hosting and deployment.  

### **Security**  
- **Authentication**:  
  - JSON Web Token (JWT) implementation with access and refresh tokens.  
  - Admin authorization for sensitive operations.  

---

## **How to Use** 📖  
1. Visit the [Crop Doctor website](http://kdt-ai6-team03.elicecoding.com/) (Demo login credentials: `user@test.com` / `test`).  
2. Upload a plant image to receive a disease diagnosis and recommended solution.  
3. Track your crop's growth by logging entries in the diary section.  
4. Join the community to share and discuss your experiences with other users.  

---

## **System Architecture** 📊  
- **ER Diagram**: Relationships between users, crops, diseases, and diagnoses are carefully designed for scalability and ease of use.  

- **API Documentation**: Developed and maintained using Postman, ensuring clear communication between frontend and backend components.  

---

## **Deployment** 🚀  
The project is hosted on AWS for high availability, leveraging cloud services for optimized performance and secure data handling.

---

### **Demo Video** 🎥  
[Watch the Demo](#) (Link to a video showcasing the platform functionality)

---

For further details, explore the [full documentation](#). Contributions and feedback are welcome!
