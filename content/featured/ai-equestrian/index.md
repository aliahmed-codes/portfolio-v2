---
date: '2'
title: 'AI Equestrian – AI-Powered Riding Analysis Platform'
cover: './ai-equestrian.png'
external: 'https://equineaintelligence.com/'
tech:
  - React
  - Next.js
  - Supabase
  - Python
  - YOLO
  - Gemini
  - GPT
  - ElevenLabs Auth
  - Stripe
  - Dokploy
  - Postgres
---

AI Equestrian is an advanced training platform for dressage and show-jumping riders. I built the complete system for a Spain-based client, including the full user-facing platform and a custom admin panel.

On the frontend, I developed the web app using React and connected it with Supabase for database, authentication, and user management. I integrated Stripe so riders can manage payment plans, subscriptions, and coupons. The admin dashboard allows the client to manage users, blogs, discounts, and all platform content.

I created a separate Python backend for video analysis. The system uses a YOLO model to detect rider and horse movement, then generates detailed feedback using Gemini and GPT. Reports include technique analysis, performance scoring, and improvement recommendations.

Both the web app and the AI processing service are deployed on Dokploy, with a scalable setup designed for real-time video analysis.

This platform combines a modern frontend with a powerful AI-driven backend, giving riders a complete system for performance tracking and personalized coaching.
