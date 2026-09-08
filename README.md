# PrimeFitness Project Setup

## 1. Git Repository

Clone the project repository:

```bash
git clone https://github.com/Harshk1050/PrimeFitness.git
```

Then navigate into the project:

```bash
cd PrimeFitness
```

## 2. Environment Variables

Create one of the following files in the project root:

```text
.env.local
```

or for production:

```text
.env.production
```

Add the required environment variables:

```env
# Resend
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=info@primefitnessplusllc.com

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=https://primefitnessplusllc.com
NEXTAUTH_SECRET=your_nextauth_secret
```

> **Important:** Do not commit `.env.local` or `.env.production` to Git. Make sure they are included in `.gitignore`.

## 3. Install Dependencies

Run:

```bash
npm install
```

## 4. Run the Project Locally

Start the development server:

```bash
npm run dev
```

The application should then be available at:

```text
http://localhost:3000
```

## 5. Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```
