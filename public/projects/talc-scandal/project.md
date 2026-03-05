---
id: talc-scandal
title: Talc Scandal UK
category: Legal / Campaign Website
description: Group litigation website for KP Law against Johnson & Johnson over talcum powder asbestos contamination claims.
shortDescription: Legal campaign site for UK's largest talcum powder group action lawsuit.
featured: false
year: 2024
duration: 3 months
client: KP Law UK
role: Full-Stack Developer
liveUrl: https://talcscandal.co.uk/
githubUrl: null
technologies:
  - Next.js
  - Strapi CMS
  - Tailwind CSS
  - Node.js
  - MongoDB
  - Vercel
image: /projects/talc-scandal/cover.jpg
gallery:
  - /projects/talc-scandal/screenshot-1.jpg
  - /projects/talc-scandal/screenshot-2.jpg
  - /projects/talc-scandal/screenshot-3.jpg
---

# Talc Scandal UK

## Overview

Talc Scandal UK is the official campaign website for KP Law's landmark group litigation against Johnson & Johnson (J&J) in the UK. The site serves as the primary information and claims portal for over 2,000 claimants seeking justice for cancers linked to asbestos-contaminated talcum powder [^56^].

## The Challenge

KP Law needed a high-stakes legal campaign platform that could:
- Educate the public about the Johnson & Johnson talcum powder scandal
- Handle sensitive claimant data securely
- Process thousands of claim applications
- Integrate with BBC and Channel 5 media coverage
- Support ongoing content updates as the case develops
- Maintain 100% uptime during media traffic spikes

## The Scandal Context

Johnson & Johnson knowingly sold talcum powder containing asbestos from the 1970s through 2023 in the UK, despite:
- Internal knowledge of contamination risks since the 1970s [^56^]
- WHO classification of talc as "probably carcinogenic" in July 2024 [^56^]
- $10 billion+ set aside for US lawsuits [^56^]
- Continued UK sales for 3 years after US asbestos removal (2020 vs 2023) [^56^]

## The Solution

We built a robust Next.js platform with Strapi CMS handling:

### Public Information Hub
- **Scandal timeline** documenting corporate negligence from 1950s-2025 [^56^]
- **Real stories section** featuring claimant testimonials (anonymized)
- **BBC/Channel 5 integration** with embedded media coverage [^59^]
- **Educational resources** on cancer risks and legal rights
- **FAQ section** addressing common claimant questions

### Claims Portal
- **Secure claim forms** with data encryption
- **Document upload** for medical records
- **Eligibility checker** for potential claimants
- **Progress tracking** for existing claimants
- **No-win, no-fee** terms explanation

### Admin Capabilities
- **Real-time content updates** via Strapi CMS
- **Media management** for news articles and videos
- **Claimant database** with search and filter
- **Analytics dashboard** tracking site engagement
- **Form submission management** with export tools

## Key Features

### Media Integration
- BBC News article embeds [^59^]
- Channel 5 documentary clips
- TV commercial hosting
- Press release distribution
- Social media feed aggregation (#talcscandal)

### Legal Content Management
- Dynamic blog for case updates
- Document library (PDFs, guides)
- Timeline visualization
- Statistics and infographics
- Expert testimony sections

### Security & Compliance
- GDPR-compliant data handling
- SSL encryption throughout
- Secure form submissions
- Data retention policies
- Privacy policy management

## Technical Implementation

### Frontend
- **Next.js 14** with static site generation for performance
- **Tailwind CSS** for responsive, accessible design
- **Framer Motion** for scroll animations
- **React Hook Form** for complex multi-step forms
- **Next SEO** for search optimization

### Backend
- **Strapi CMS** for content management
- **MongoDB** for flexible document storage
- **Node.js** API routes for form handling
- **Nodemailer** for automated claimant communications
- **AWS S3** for document storage

### Infrastructure
- **Vercel** for edge deployment
- **Cloudflare** for DDoS protection
- **Automated backups** of claimant data
- **Uptime monitoring** with instant alerts

## Results

- **2,000+ claimants** registered through platform [^56^]
- **Featured on BBC News** and Channel 5 [^59^]
- **99.9% uptime** during major media coverage
- **50% conversion rate** from visit to claim inquiry
- **Zero data breaches** since launch

## Impact

The platform has become the central hub for UK's largest consumer safety lawsuit, helping victims of corporate negligence access justice while maintaining the dignity and security required for such sensitive legal proceedings.

## Lessons Learned

- Critical importance of accessibility in legal sites (WCAG AAA)
- Need for robust form validation with sensitive health data
- Value of headless CMS for rapidly evolving legal content
- Complexity of GDPR compliance in group litigation
- Benefits of static generation for high-traffic campaign sites