"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  en: {
    // Navigation
    'smart.warehouse': 'smart warehouse',
    // Profile
    'profile.information': 'Profile Information',
    'profile.personal': 'Your personal information',
    'profile.fullName': 'Full Name',
    'profile.role': 'Role',
    'profile.department': 'Department',
    'profile.logout': 'Logout',
    'nav.suppliers': 'Suppliers',
    'nav.profile': 'Profile',
    // Products
    'products.title': 'Products',
    'products.search': 'Search products...',
    'products.verification.progress': 'Verification Progress',
    'products.verified': 'Verified',
    'products.pending': 'Pending',
    'products.all': 'All',
    'products.stock': 'Stock',
    'products.verify': 'Verify',
    'products.history': 'History',
    // Verification
    'verification.history': 'Verification History',
    'verification.new': 'New Verification',
    'verification.total.stock': 'Total Stock',
    'verification.rate': 'Verification Rate',
    'verification.status.verified': 'Verified',
    'verification.status.inProgress': 'In Progress',
    'verification.none': 'No verification history found for this product.',
    'verification.verifier': 'Verifier',
    'verification.datetime': 'Date & Time',
    'verification.condition': 'Condition',
    'verification.notes': 'Notes',
    'verification.photos': 'Photos',
    'verification.view.history': 'View History',
  },
  id: {
    // Navigation
    'smart.warehouse': 'gudang pintar',
    // Profile
    'profile.information': 'Informasi Profil',
    'profile.personal': 'Informasi pribadi Anda',
    'profile.fullName': 'Nama Lengkap',
    'profile.role': 'Jabatan',
    'profile.department': 'Departemen',
    'profile.logout': 'Keluar',
    'nav.suppliers': 'Pemasok',
    'nav.profile': 'Profil',
    // Products
    'products.title': 'Produk',
    'products.search': 'Cari produk...',
    'products.verification.progress': 'Progress Verifikasi',
    'products.verified': 'Terverifikasi',
    'products.pending': 'Menunggu',
    'products.all': 'Semua',
    'products.stock': 'Stok',
    'products.verify': 'Verifikasi',
    'products.history': 'Riwayat',
    // Verification
    'verification.history': 'Riwayat Verifikasi',
    'verification.new': 'Verifikasi Baru',
    'verification.total.stock': 'Total Stok',
    'verification.rate': 'Tingkat Verifikasi',
    'verification.status.verified': 'Terverifikasi',
    'verification.status.inProgress': 'Dalam Proses',
    'verification.none': 'Tidak ada riwayat verifikasi untuk produk ini.',
    'verification.verifier': 'Verifikator',
    'verification.datetime': 'Tanggal & Waktu',
    'verification.condition': 'Kondisi',
    'verification.notes': 'Catatan',
    'verification.photos': 'Foto',
    'verification.view.history': 'Lihat Riwayat',
  }
};

type TranslationKey = keyof typeof translations.en;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}