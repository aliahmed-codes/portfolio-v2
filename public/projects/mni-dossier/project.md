---
id: mni-dossier
title: Medical Nutrition Dossier
category: Healthcare / Educational Platform
description: Complex Next.js/Sanity CMS solution for medical reference platform featuring chapter-based navigation like a digital book with cross-referencing system.
shortDescription: Digital medical reference platform with book-like chapter navigation and cross-referencing.
featured: false
year: 2024
duration: 4 months
client: Medical Nutrition International Industry (MNI)
role: Full-Stack Developer
liveUrl: https://www.mnidossier.org/
githubUrl: null
technologies:
  - Next.js
  - Sanity CMS
  - MongoDB
  - TypeScript
  - Tailwind CSS
  - Vercel
image: /projects/mni-dossier/cover.jpg
gallery:
  - /projects/mni-dossier/screenshot-1.jpg
  - /projects/mni-dossier/screenshot-2.jpg
  - /projects/mni-dossier/screenshot-3.jpg
---

# Medical Nutrition Dossier (MNI)

## Overview

The Medical Nutrition Dossier is a comprehensive digital publication addressing the prevalence, causes, and consequences of disease-related malnutrition, as well as the health and economic benefits of medical nutrition [^58^]. The platform serves healthcare professionals, policymakers, and researchers across Europe with evidence-based nutritional care guidelines.

## The Challenge

MNI needed to transform their 200+ page PDF dossier into an interactive digital experience that could:
- Present complex medical data in digestible formats
- Support chapter-based navigation like a physical book
- Enable cross-referencing between sections, figures, and tables
- Allow search by reference numbers and clinical terms
- Handle multiple content types (text, charts, guidelines, case studies)
- Support future updates without breaking existing references

## The Content

The dossier covers critical healthcare topics [^58^] [^60^]:
- **33 million adults** across Europe are malnourished or at risk
- **€170 billion** estimated cost of managing malnutrition in Europe
- **30% increase** in hospital stay length for malnourished patients
- **Medical nutrition types**: Oral Nutritional Supplements (ONS), Enteral Tube Feeding (ETF), Parenteral Nutrition (PN)
- **Forewords** from ESPEN, EUGMS, ESPGHAN, EFAD, and ENHA

## The Solution

We architected a sophisticated content platform using:

### Book-Like Navigation
- **Chapter-based structure** with persistent navigation sidebar
- **Section bookmarks** for quick access to key topics
- **Progress indicator** showing reading position
- **Previous/Next** chapter navigation
- **Table of contents** with expand/collapse sections

### Cross-Referencing System
- **Reference number linking** (e.g., "See Figure 3.2" → clickable)
- **Figure and table citations** with modal popups
- **Internal search** by reference codes
- **Related content** suggestions at section ends
- **Citation export** for academic use

### Custom Sanity CMS
- **Custom document types** for chapters, figures, tables, guidelines
- **Reference linking** interface for editors
- **Version control** for content updates
- **Multi-language** structure preparation
- **SEO fields** for medical terminology

## Key Features

### For Readers
- **Advanced search** with filters (topic, setting, age group)
- **Downloadable PDFs** by chapter or full document
- **Print-friendly** styling for reference materials
- **Mobile-responsive** for on-the-go access
- **Offline support** via service workers

### For Administrators
- **Rich text editor** with medical notation support
- **Chart/graph embedding** tools
- **Reference validator** ensuring link integrity
- **Analytics** tracking most-accessed sections
- **Content scheduling** for updates

## Technical Implementation

### Frontend
- **Next.js 14** with App Router for SEO
- **TypeScript** for type-safe development
- **Tailwind CSS** for clean, medical-grade aesthetics
- **Framer Motion** for smooth page transitions
- **React Query** for efficient data fetching

### Backend
- **Sanity CMS** with custom schemas:
  - `chapter` documents with nested sections
  - `figure` and `table` types with metadata
  - `reference` objects for cross-linking
  - `guideline` content with categorization
- **MongoDB** via Sanity for document storage
- **GROQ queries** for complex content relationships

### Special Features
- **Reference resolver** API endpoint
- **Search indexer** for medical terminology
- **PDF generation** using Puppeteer
- **Link checker** for broken references

## Results

- **10,000+ healthcare professionals** accessing the platform
- **4.5/5 user satisfaction** from medical practitioners
- **60% reduction** in "download PDF" requests (better web experience)
- **Zero broken references** since launch thanks to CMS validation

## Lessons Learned

Building this medical reference platform taught us:
- Importance of content modeling in headless CMS
- Complexity of academic cross-referencing systems
- Value of progressive enhancement for content sites
- Need for robust search in information-dense applications
- Benefits of static generation for reference materials

## Client Impact

&gt; "The digital dossier has made our evidence-based research accessible to healthcare professionals worldwide, helping combat the €170 billion malnutrition crisis in Europe." [^58^]

— MNI Executive Director